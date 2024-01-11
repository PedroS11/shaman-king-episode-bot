import { EpisodeDAL } from "./domain/database/tables";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { Episode } from "./domain/bot/episode";

export const getLastEpisode = async (): Promise<Episode | undefined> => {
    const db = await open({
        filename: "./data/database.db",
        driver: sqlite3.Database,
    });

    const row = await db.get<EpisodeDAL>("SELECT * FROM Episode ORDER BY episode DESC LIMIT 1");
    await db.close();

    if (!row) {
        return;
    }

    return {
        episode: row.episode,
        rawSent: Boolean(row.rawSent),
        subbedSent: Boolean(row.subbedSent),
        url: row.url,
    };
};

export const insertEpisode = async (data: Episode): Promise<void> => {
    const db = await open({
        filename: "./data/database.db",
        driver: sqlite3.Database,
    });

    await db.run("INSERT INTO Episode VALUES ($episode, $url, $rawSent, $subbedSent)", {
        $episode: data.episode,
        $url: data.url,
        $rawSent: Number(data.rawSent),
        $subbedSent: Number(data.subbedSent),
    });

    await db.close();
};

export const updateEpisodeNotification = async (data: Episode): Promise<void> => {
    const db = await open({
        filename: "./data/database.db",
        driver: sqlite3.Database,
    });

    await db.run("UPDATE Episode SET rawSent = $rawSent, subbedSent = $subbedSent WHERE episode = $episode", {
        $episode: data.episode,
        $rawSent: Number(data.rawSent),
        $subbedSent: Number(data.subbedSent),
    });

    await db.close();
};
