import axios from "axios";
import { CheerioAPI, load } from "cheerio";

export const getPage = async (url: string): Promise<CheerioAPI> => {
    const response = await axios(url);
    return load(response.data.html);
};

export const parsePage = (page: CheerioAPI): string => {
    return page(".episodes > li:last-child").text().trim();
};

export const getLastAvailableEpisode = async (url: string): Promise<string> => {
    const page: CheerioAPI = await getPage(url);
    return parsePage(page);
};
