import { AxiosError } from "axios";
import { Telegram } from "telegraf";
import { insertEpisode, updateEpisodeNotification } from "../../db";
import { Episode } from "../../domain/bot/episode";
import { getEnvironmentVariable } from "../../utils/getEnvironmentVariable";
import { getLastAvailableEpisode } from "../crawler/helpers";
import { sendMessage } from "../telegram/helpers";
import { getPollingEpisode } from "./helpers";

const SHAMAN_KING_FLOWERS_API = "https://ww2.9animes.org/ajax/film/servers?id=shaman-king-flowers";
const SHAMAN_KING_FLOWERS_URL = "https://9animetv.to/watch/shaman-king-flowers-18826";
const MAX_NUMBER_OF_EPISODES = 13;

const bot = new Telegram(getEnvironmentVariable("BOT_TOKEN"));

export const pollEpisode = async () => {
    console.log("---------Started polling execution---------");
    let pollingEpisode: Episode = await getPollingEpisode();

    // Move to the next episode if the last one was already notified
    if (pollingEpisode.rawSent && pollingEpisode.subbedSent) {
        const newEpisodeNr: number = pollingEpisode.episode + 1;

        if (newEpisodeNr > MAX_NUMBER_OF_EPISODES) {
            await sendMessage(bot, `The anime is complete, delete the bot`);
            return;
        }

        pollingEpisode = {
            episode: newEpisodeNr,
            subbedSent: false,
            rawSent: false,
            url: SHAMAN_KING_FLOWERS_URL,
        };

        await insertEpisode(pollingEpisode);
    }

    console.log("Episode to poll", pollingEpisode);

    try {
        const lastAvailableEpisode: string = await getLastAvailableEpisode(SHAMAN_KING_FLOWERS_API);

        if (!lastAvailableEpisode) {
            return;
        }

        // If the new episode is available
        if (lastAvailableEpisode === pollingEpisode.episode.toString()) {
            await sendMessage(
                bot,
                `The episode ${pollingEpisode.episode} is now available on ${SHAMAN_KING_FLOWERS_URL}`,
            );

            pollingEpisode.rawSent = true;
            pollingEpisode.subbedSent = true;
            await updateEpisodeNotification(pollingEpisode);
        }

        console.log(`Poll finished for episode ${pollingEpisode.episode}`, pollingEpisode);
        console.log("-------------------------------------------");
    } catch (e) {
        if (e?.response) {
            const error: AxiosError = e;
            if (error.response?.status === 404) {
                console.log(`Page ${SHAMAN_KING_FLOWERS_API} not found`);
                return;
            }
        }
        await sendMessage(bot, `Error calling ${SHAMAN_KING_FLOWERS_API}, message ${e.message}`);
    }
};
