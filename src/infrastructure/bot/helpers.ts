import { getLastEpisode, insertEpisode } from "../dabtabase/db";
import { Episode } from "../../domain/bot/episode";

export const getPollingEpisode = async (): Promise<Episode> => {
    let lastEpisode: Episode | undefined = await getLastEpisode();

    if (lastEpisode === undefined) {
        lastEpisode = {
            episode: 1,
            notified: false,
            url: "",
        };

        await insertEpisode(lastEpisode);
    }

    return lastEpisode;
};
