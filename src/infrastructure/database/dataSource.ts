import "dotenv/config";
import { EpisodeDAL } from "./entity/Episode";
import { DataSource } from "typeorm";
import { getEnvironmentVariable } from "../../utils/getEnvironmentVariable";

const basePath = process.env.NODE_ENV === "production" ? "dist" : "src";

export const AppDataSource = new DataSource({
	type: "postgres",
	host: getEnvironmentVariable("POSTGRES_HOST"),
	port: 5432,
	username: getEnvironmentVariable("POSTGRES_USER"),
	password: getEnvironmentVariable("POSTGRES_PASSWORD"),
	database: getEnvironmentVariable("POSTGRES_DB"),
	synchronize: false,
	logging: false,
	migrationsRun: true,
	subscribers: [],
	migrations: [basePath + "/infrastructure/database/migrations/*{.ts,.js}"],
	entities: [basePath + "/infrastructure/database/entity/*{.ts,.js}"],
});

export const EpisodeRepository = AppDataSource.getRepository(EpisodeDAL);
