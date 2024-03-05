import axios from "axios";
import { load } from "cheerio";
import { WIKIPEDIA_URL } from "../../config";

export const getEpisodeTitle = async (
	episodeNumber: number,
): Promise<string> => {
	const defaultTitle = `Episode ${episodeNumber}`;
	const response = await axios(WIKIPEDIA_URL);
	const page = load(response.data);
	const table = page(".wikitable.plainrowheaders.wikiepisodetable tr");

	const episodeRow = table[episodeNumber];
	const parsedTitle: string = // @ts-ignore
		episodeRow?.children?.[1]?.children?.[0]?.data?.replaceAll('"', "");

	return parsedTitle ?? defaultTitle;
};
