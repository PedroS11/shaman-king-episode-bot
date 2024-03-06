import axios from "axios";
import { Telegram } from "telegraf";
import { updateEpisode } from "../database/service";
import { Episode } from "../../domain/bot/episode";
import { getLastReleasedEpisode } from "../crawler/streamWebsite";
import { sendMessage } from "../telegram/helpers";
import { getBot, getPollingEpisode } from "./helpers";
import { EpisodeCrawled } from "../../domain/crawler";
import { Logger } from "../../utils/logger";
import { SHAMAN_KING_FLOWERS_API } from "../../config";

const bot: Telegram = getBot();

export const pollEpisode = async () => {
	Logger.info("---------Started polling execution---------");

	const pollingEpisode: Episode = await getPollingEpisode();

	Logger.info(pollingEpisode, "Episode to poll");

	try {
		const lastReleasedEpisode: EpisodeCrawled = await getLastReleasedEpisode(
			SHAMAN_KING_FLOWERS_API,
		);

		Logger.info(lastReleasedEpisode, "Last available episode ");

		// If the new episode is available
		if (lastReleasedEpisode.nr === pollingEpisode.id) {
			await sendMessage(
				bot,
				`The episode ${pollingEpisode.id} "${lastReleasedEpisode.title}" is now available on ${lastReleasedEpisode.url}`,
			);

			pollingEpisode.url = lastReleasedEpisode.url;
			pollingEpisode.notified = true;
			pollingEpisode.title = lastReleasedEpisode.title;
			await updateEpisode(pollingEpisode);
		}

		Logger.info(
			pollingEpisode,
			`Poll finished for episode ${pollingEpisode.id}`,
		);
		Logger.info("-------------------------------------------");
	} catch (e) {
		if (axios.isAxiosError(e)) {
			if (e.response?.status === 404) {
				Logger.error(`Page ${SHAMAN_KING_FLOWERS_API} not found`);
				return;
			}
		}

		Logger.error(`Execution error, message ${e.message}`);
		await sendMessage(bot, `Execution error, message ${e.message}`);
	}
};
