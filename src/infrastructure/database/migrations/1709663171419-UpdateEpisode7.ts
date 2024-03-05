import { MigrationInterface } from "typeorm";
import { EpisodeRepository } from "../dataSource";

export class UpdateEpisode71709663171419 implements MigrationInterface {
	public async up(): Promise<void> {
		const episode = await EpisodeRepository.findOneBy({
			id: 7,
		});

		if (episode) {
			episode.url =
				"https://aniwave.to/watch/shaman-king-2021-zoku-hen.4qj6x/ep-7";
			episode.title = "Oni, Rumbling";
			episode.notified = true;

			await EpisodeRepository.save(episode);
		}
	}

	public async down(): Promise<void> {}
}
