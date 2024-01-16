import axios from "axios";
import { Cheerio, CheerioAPI, Element, load } from "cheerio";
import { EpisodeCrawled } from "../../domain/crawler";
import { createEpisodeUrl } from "../../utils/createEpisodeUrl";

export const getPage = async (url: string): Promise<CheerioAPI> => {
    const response = await axios(url);
    return load(response.data.html);
};

export const parsePage = (page: CheerioAPI): EpisodeCrawled => {
    const episodeAnchor: Cheerio<Element> = page(".ss-list > a:last-child");

    const episodePath: string = episodeAnchor.attr("href")?.trim() ?? "";
    const episodeNumber: number = episodeAnchor.data("number") as number;
    const episodeTitle: string = episodeAnchor.children(".ssli-detail").children(".ep-name").text() ?? "";

    if (!episodePath || !Number.isInteger(episodeNumber) || !episodeTitle) {
        throw new Error("Error crawling last episode from page");
    }

    return {
        nr: episodeNumber,
        title: episodeTitle,
        url: createEpisodeUrl(episodePath),
    };
};

export const getLastReleasedEpisode = async (url: string): Promise<EpisodeCrawled> => {
    const page: CheerioAPI = await getPage(url);
    return parsePage(page);
};
