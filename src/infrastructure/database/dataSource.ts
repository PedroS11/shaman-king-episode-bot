import "dotenv/config";
import { EpisodeDAL } from "./entity/Episode";
import { DataSource } from "typeorm";
import { getEnvironmentVariable } from "../../utils/getEnvironmentVariable";

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
    entities: [EpisodeDAL],
    subscribers: [],
    migrations: ["src/infrastructure/database/migrations/*.ts"],
});

export const EpisodeRepository = AppDataSource.getRepository(EpisodeDAL);
