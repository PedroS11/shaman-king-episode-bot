import "dotenv/config";
import { pollEpisode } from "./infrastructure/bot/service";
import { AppDataSource } from "./infrastructure/dabtabase/dataSource";
import { schedule } from "node-cron";

schedule("0 */6 * * *", async () => {
    await AppDataSource.initialize();

    await pollEpisode();
});

// (async () => {
//     await AppDataSource.initialize();
//     await pollEpisode();
// })();
