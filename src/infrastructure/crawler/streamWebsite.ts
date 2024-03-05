import axios from "axios";
import { Cheerio, CheerioAPI, Element, load } from "cheerio";
import { EpisodeCrawled } from "../../domain/crawler";
import { createEpisodeUrl } from "../../utils/createEpisodeUrl";
import { getEpisodeTitle } from "./wikipedia";

const getPage = async (url: string): Promise<CheerioAPI> => {
	const response = await axios(url);
	return load(response.data.result);
};

const parsePage = async (page: CheerioAPI): Promise<EpisodeCrawled> => {
	const episodeAnchor: Cheerio<Element> = page(".ep-range > li:last-child > a");

	const episodeNumber: number = Number.parseInt(
		episodeAnchor.attr("data-num") ?? "",
	);

	if (!Number.isInteger(episodeNumber)) {
		throw new Error("Error crawling last episode from page");
	}

	const episodeTitle = await getEpisodeTitle(episodeNumber);

	return {
		nr: episodeNumber,
		title: episodeTitle,
		url: createEpisodeUrl(episodeNumber),
	};
};

export const getLastReleasedEpisode = async (
	url: string,
): Promise<EpisodeCrawled> => {
	const page: CheerioAPI = await getPage(url);
	return parsePage(page);
};
