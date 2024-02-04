import { AxiosError } from "axios";
import { Telegram } from "telegraf";
import { saveEpisode } from "../database/service";
import { Episode } from "../../domain/bot/episode";
import { getLastReleasedEpisode } from "../crawler/helpers";
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

		Logger.info(lastReleasedEpisode, "Last avaialble episode ");

		// If the new episode is available
		if (lastReleasedEpisode.nr === pollingEpisode.id) {
			await sendMessage(
				bot,
				`The episode ${pollingEpisode.id} "${lastReleasedEpisode.title}" is now available on ${lastReleasedEpisode.url}`,
			);

			pollingEpisode.url = lastReleasedEpisode.url;
			pollingEpisode.notified = true;
			pollingEpisode.title = lastReleasedEpisode.title;
			await saveEpisode(pollingEpisode);
		}

		Logger.info(
			pollingEpisode,
			`Poll finished for episode ${pollingEpisode.id}`,
		);
		Logger.info("-------------------------------------------");
	} catch (e) {
		if (e?.response) {
			const error: AxiosError = e;
			if (error.response?.status === 404) {
				Logger.error(`Page ${SHAMAN_KING_FLOWERS_API} not found`);
				return;
			}
		}
		await sendMessage(
			bot,
			`Error calling ${SHAMAN_KING_FLOWERS_API}, message ${e.message}`,
		);
	}
};
