import { EpisodeDAL } from "../../domain/database/entity/Episode";
import { DataSource } from "typeorm";
import { getEnvironmentVariable } from "../../utils/getEnvironmentVariable";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: getEnvironmentVariable("POSTGRES_HOST"),
    port: 5432,
    username: getEnvironmentVariable("POSTGRES_USER"),
    password: getEnvironmentVariable("POSTGRES_PASSWORD"),
    database: getEnvironmentVariable("POSTGRES_DB"),
    synchronize: true,
    logging: false,
    entities: [EpisodeDAL],
    subscribers: [],
    migrations: [],
});

export const EpisodeRepository = AppDataSource.getRepository(EpisodeDAL);
