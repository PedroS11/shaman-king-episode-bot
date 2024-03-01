import { MigrationInterface, QueryRunner } from "typeorm";
import { EpisodeDAL } from "../entity/Episode";

const currentEpisodes = [
	{
		id: 1,
		url: "https://aniwatch.to/watch/shaman-king-flowers-18826?ep=114982",
		notified: true,
		title: "Asakura VS Asakura Branch",
	},
	{
		id: 2,
		url: "https://aniwatch.to/watch/shaman-king-flowers-18826?ep=116935",
		notified: true,
		title: "West Tokyo Sound Effect Festival",
	},
	{
		id: 3,
		url: "https://aniwatch.to/watch/shaman-king-flowers-18826?ep=118969",
		notified: true,
		title: "The Prodigal Shaman Returns",
	},
	{
		id: 4,
		url: "https://aniwatch.to/watch/shaman-king-flowers-18826?ep=119569",
		notified: true,
		title: "Sense of Loss",
	},
	{
		id: 5,
		url: "https://aniwatch.to/watch/shaman-king-flowers-18826?ep=119977",
		notified: true,
		title: "Episode 5",
	},
	{
		id: 6,
		url: "https://aniwatch.to/watch/shaman-king-flowers-18826?ep=120505",
		notified: true,
		title: "Episode 6",
	},
];
export class Seeding1709257375084 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await Promise.all(
			currentEpisodes.map((data) => {
				const episode = new EpisodeDAL();
				episode.id = data.id;
				episode.url = data.url;
				episode.title = data.title;
				episode.notified = data.notified;

				return queryRunner.manager.save(episode);
			}),
		);
	}

	public async down(): Promise<void> {}
}
