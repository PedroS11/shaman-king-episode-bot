import { Episode } from "./domain/database/tables";
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

export const getLastEpisode = async (): Promise<Episode | undefined> => {
    const db = await open({
        filename: './data/database.db',
        driver: sqlite3.Database
    });

    const row = await db.get<Episode>('SELECT * FROM Episode ORDER BY episode DESC LIMIT 1');
    await db.close();

    return row;
};

export const insertEpisode = async (episode: number, url: string, sent: boolean): Promise<void> => {
    const db = await open({
        filename: './data/database.db',
        driver: sqlite3.Database
    });

    await db.run("INSERT INTO Episode VALUES ($episode, $url, $sent)", {
        $episode: episode,
        $url: url,
        $sent: Number(sent)
    });

    await db.close();
};