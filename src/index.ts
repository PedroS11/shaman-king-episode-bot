import "dotenv/config";
import { scheduleJob } from "node-schedule";
import { pollEpisode } from "./infrastructure/bot/service";
import { AppDataSource } from "./infrastructure/database/dataSource";
import { getEnvironmentVariable } from "./utils/getEnvironmentVariable";

const cronPattern: string = getEnvironmentVariable("CRON_PATTERN");

scheduleJob(cronPattern, async () => {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }

    await pollEpisode();
});

// (async () => {
//     await AppDataSource.initialize();
//     await pollEpisode();
// })();
