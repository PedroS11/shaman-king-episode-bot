import axios from "axios";
import { CheerioAPI, load } from "cheerio";

export const getPage = async (url: string): Promise<CheerioAPI> => {
    const response = await axios(url);
    const html = response.data;
    return load(html);
};

export const parsePage = (page: CheerioAPI): string => {
    return page("#episode_related > li:last-child .name")
        .text()
        .replace(/\s{2,}/g, " ");
};

export const getLastAvailableEpisode = async (url: string): Promise<string> => {
    const page: CheerioAPI = await getPage(url);
    return parsePage(page);
};
