import "dotenv/config";
import { pollEpisode } from "./infrastructure/bot/service";
import { AppDataSource } from "./infrastructure/database/dataSource";
import { getEnvironmentVariable } from "./utils/getEnvironmentVariable";

const cronPattern: string = getEnvironmentVariable("CRON_PATTERN");

// scheduleJob(cronPattern, async () => {
//     if (!AppDataSource.isInitialized) {
//         await AppDataSource.initialize();
//     }
//
//     await pollEpisode();
// });

(async () => {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }
    await pollEpisode();
})();
