import { Episode } from "../../domain/bot/episode";
import { EpisodeDAL } from "./entity/Episode";
import { EpisodeRepository } from "./dataSource";

export const getLastEpisode = async (): Promise<Episode> => {
	let lastEpisode = await EpisodeRepository.createQueryBuilder("lastEpisode")
		.orderBy("id", "DESC")
		.limit(1)
		.getOne();

	// If there's no episode on the database, add the first one
	if (lastEpisode === null) {
		lastEpisode = new EpisodeDAL();
		lastEpisode.id = 1;
		lastEpisode.notified = false;
		lastEpisode.url = "";
		lastEpisode.title = "";

		await EpisodeRepository.save(lastEpisode);
	}

	return {
		id: lastEpisode.id,
		notified: lastEpisode.notified,
		url: lastEpisode.url,
		title: lastEpisode.title,
		season: lastEpisode.season,
	};
};

export const saveEpisode = async (data: Episode): Promise<void> => {
	const episode = new EpisodeDAL();
	episode.id = data.id;
	episode.notified = data.notified;
	episode.url = data.url;
	episode.title = data.title;
	await EpisodeRepository.save(episode);
};
