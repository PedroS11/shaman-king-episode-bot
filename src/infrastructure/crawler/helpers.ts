import axios from "axios";
import { CheerioAPI, load } from "cheerio";
import { EpisodeCrawled } from "../../domain/crawler";

export const getPage = async (url: string): Promise<CheerioAPI> => {
    const response = await axios(url);
    return load(response.data.html);
};

export const parsePage = (page: CheerioAPI): EpisodeCrawled => {
    const episodeAnchor = page(".ss-list > a:last-child");
    return {
        nr: episodeAnchor.data("number") as number,
        title: episodeAnchor.children(".ssli-detail").children(".ep-name").text() ?? "",
        url: episodeAnchor.attr("href")?.trim() ?? "",
    };
};

export const getLastAvailableEpisode = async (url: string): Promise<EpisodeCrawled> => {
    const page: CheerioAPI = await getPage(url);
    return parsePage(page);
};
