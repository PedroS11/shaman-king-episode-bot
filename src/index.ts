import "dotenv/config";
import { scheduleJob } from "node-schedule";
import { AppDataSource } from "./infrastructure/database/dataSource";
import { pollEpisode } from "./infrastructure/bot/service";

scheduleJob("0 */6 * * *", async () => {
    await AppDataSource.initialize();

    await pollEpisode();
});

// (async () => {
//     await AppDataSource.initialize();
//     await pollEpisode();
// })();
