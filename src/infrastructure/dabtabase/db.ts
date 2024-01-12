import { EpisodeDAL } from "../../domain/database/tables";
import { Episode } from "../../domain/bot/episode";
import { Pool } from "pg";
import { getEnvironmentVariable } from "../../utils/getEnvironmentVariable";

const pool = new Pool({
    password: getEnvironmentVariable("POSTGRES_PASSWORD"),
    user: getEnvironmentVariable("POSTGRES_USER"),
    host: getEnvironmentVariable("POSTGRES_HOST"),
    database: getEnvironmentVariable("POSTGRES_DB"),
    port: 5432,
    max: 20, // Maximum number of clients in the pool
    idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
});

export const getLastEpisode = async (): Promise<Episode | undefined> => {
    const { rowCount, rows } = await pool.query<EpisodeDAL>("SELECT * FROM Episode ORDER BY episode DESC LIMIT 1");

    if (rowCount === 0) {
        return;
    }

    return {
        episode: rows[0].episode,
        notified: Boolean(rows[0].notified),
        url: rows[0].url,
    };
};

export const insertEpisode = async (data: Episode): Promise<void> => {
    await pool.query("INSERT INTO Episode VALUES ($1, $2, $3)", [data.episode, data.url, Number(data.notified)]);
};

export const updateEpisode = async (data: Episode): Promise<void> => {
    await pool.query("UPDATE Episode SET notified = $1, url = $2 WHERE episode = $3", [
        Number(data.notified),
        data.url,
        data.episode,
    ]);
};
