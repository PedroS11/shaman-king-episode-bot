import { AxiosError } from "axios";
import { Telegram } from "telegraf";
import { insertEpisode, updateEpisode } from "../dabtabase/db";
import { Episode } from "../../domain/bot/episode";
import { getEnvironmentVariable } from "../../utils/getEnvironmentVariable";
import { getLastAvailableEpisode } from "../crawler/helpers";
import { sendMessage } from "../telegram/helpers";
import { getPollingEpisode } from "./helpers";
import { EpisodeCrawled } from "../../domain/crawler";
import { createEpisodeUrl } from "../../utils/createEpisodeUrl";
import { Logger } from "../../utils/logger";

const SHAMAN_KING_FLOWERS_API = "https://aniwatch.to/ajax/v2/episode/list/18826";
const MAX_NUMBER_OF_EPISODES = 13;

const bot = new Telegram(getEnvironmentVariable("BOT_TOKEN"));

export const pollEpisode = async () => {
    Logger.info("---------Started polling execution---------");
    let pollingEpisode: Episode = await getPollingEpisode();

    // Move to the next episode if the last one was already notified
    if (pollingEpisode.notified) {
        const newEpisodeNr: number = pollingEpisode.episode + 1;

        if (newEpisodeNr > MAX_NUMBER_OF_EPISODES) {
            await sendMessage(bot, `The anime is complete, delete the bot`);
            return;
        }

        pollingEpisode = {
            episode: newEpisodeNr,
            notified: false,
            url: "",
        };

        await insertEpisode(pollingEpisode);
    }

    Logger.info(pollingEpisode, "Episode to poll");

    try {
        const lastAvailableEpisode: EpisodeCrawled = await getLastAvailableEpisode(SHAMAN_KING_FLOWERS_API);

        Logger.info(lastAvailableEpisode, `Last avaialble episode `);

        if (!lastAvailableEpisode.title) {
            throw new Error("Error crawling last episode from page");
        }

        // If the new episode is available
        if (lastAvailableEpisode.nr === pollingEpisode.episode) {
            pollingEpisode.url = createEpisodeUrl(lastAvailableEpisode.url);
            pollingEpisode.notified = true;

            await sendMessage(
                bot,
                `The episode ${pollingEpisode.episode} "${lastAvailableEpisode.title}" is now available on ${pollingEpisode.url}`,
            );
            await updateEpisode(pollingEpisode);
        }

        Logger.info(pollingEpisode, `Poll finished for episode ${pollingEpisode.episode}`);
        Logger.info("-------------------------------------------");
    } catch (e) {
        if (e?.response) {
            const error: AxiosError = e;
            if (error.response?.status === 404) {
                Logger.error(`Page ${SHAMAN_KING_FLOWERS_API} not found`);
                return;
            }
        }
        await sendMessage(bot, `Error calling ${SHAMAN_KING_FLOWERS_API}, message ${e.message}`);
    }
};
