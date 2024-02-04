import { getLastEpisode, saveEpisode } from "../database/service";
import { Episode } from "../../domain/bot/episode";
import { getEnvironmentVariable } from "../../utils/getEnvironmentVariable";
import { Telegram } from "telegraf";
import { MAX_NUMBER_OF_EPISODES } from "../../config";

const bot = new Telegram(getEnvironmentVariable("BOT_TOKEN"));

export const getPollingEpisode = async (): Promise<Episode> => {
	let lastEpisode: Episode = await getLastEpisode();

	// Move to the next episode if the last one was already notified
	if (lastEpisode.notified) {
		const newId: number = lastEpisode.id + 1;

		if (newId > MAX_NUMBER_OF_EPISODES) {
			throw new Error(`The anime is complete, delete the bot`);
		}

		lastEpisode = {
			id: newId,
			notified: false,
			url: "",
			title: "",
			season: 1,
		};

		await saveEpisode(lastEpisode);
	}

	return lastEpisode;
};

export const getBot = (): Telegram => bot;
