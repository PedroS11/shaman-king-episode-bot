import { getLastEpisode, insertEpisode } from "../../db";
import { Episode } from "../../domain/bot/episode";
import { createEpisodeUrl } from "../../utils/createEpisodeUrl";

export const getPollingEpisode = async (): Promise<Episode> => {
    let lastEpisode: Episode | undefined = await getLastEpisode();

    if (lastEpisode === undefined) {
        lastEpisode = {
            episode: 1,
            subbedSent: false,
            rawSent: false,
            url: createEpisodeUrl(1),
        };

        await insertEpisode(lastEpisode);
    }

    return lastEpisode;
};
