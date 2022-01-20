import { getEnvironmentVariable } from "./utils/getEnvironmentVariable";

require("dotenv").config();
import { Episode } from "./domain/bot/episode";
import axios, { AxiosError } from "axios";
import cheerio from 'cheerio';
import { Telegraf } from "telegraf";
import { sendMessage } from "./utils/telegram/helpers";
import { getLastEpisode, insertEpisode, updateEpisodeNotification } from "./db";
import { createEpisodeUrl } from "./utils/createEpisodeUrl";
import cron from 'node-cron';

const pollEpisode = async () => {
    console.log("---------Started polling execution---------")
    const lastEpisode: Episode = await getLastEpisode() as Episode;
    let pollingEpisode: Episode = lastEpisode;

    // Move to the next episode
    if (lastEpisode.rawSent && lastEpisode.subbedSent) {
        const newEpisodeNr: number = lastEpisode.episode + 1;

        if(newEpisodeNr >= 53) {
            await sendMessage(bot, `The anime is complete, delete the bot`);
            return;
        }

        pollingEpisode = {
            episode: newEpisodeNr,
            subbedSent: false,
            rawSent: false,
            url: createEpisodeUrl(newEpisodeNr)
        };

        await insertEpisode(pollingEpisode);
    }

    console.log("Episode to poll", pollingEpisode);

    try {
        const response = await axios(pollingEpisode.url);
        const html = response.data;
        const $ = cheerio.load(html);

        if (!pollingEpisode.rawSent) {
            await sendMessage(bot, `The raw episode ${pollingEpisode.episode} is now available on ${pollingEpisode.url}`);

            pollingEpisode.rawSent = true;
            await updateEpisodeNotification(pollingEpisode);
        }


        const item: string = $('.entry-content').text();
        const isSubbed: boolean = !item.includes("will be out when this countdown reaches 0:");

        if(isSubbed && !pollingEpisode.subbedSent) {
            await sendMessage(bot, `The subbed episode ${pollingEpisode.episode} is now available on ${pollingEpisode.url}`);

            pollingEpisode.subbedSent = true;
            await updateEpisodeNotification(pollingEpisode);
        }
        console.log(`Poll finished for episode ${pollingEpisode.episode}`, pollingEpisode);
        console.log("-------------------------------------------")


    } catch (e) {
        if (e?.response) {
            const error: AxiosError = e;
            if (error?.response?.status === 404) {
                console.log(`Episode ${pollingEpisode.episode} not found`);
                return
            }
        }

        await sendMessage(bot, `Error calling ${pollingEpisode.url}, message ${e.message}`);
    }
}
// @ts-ignore
const bot = new Telegraf(getEnvironmentVariable("BOT_TOKEN"));

bot.launch();

cron.schedule('*/30 * * * 4-7', async () => {
    // send the message here
    await pollEpisode();
});