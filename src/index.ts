import "dotenv/config";
import { pollEpisode } from "./infrastructure/bot/service";
import { AppDataSource } from "./infrastructure/database/dataSource";

// schedule("0 */6 * * *", async () => {
//     await AppDataSource.initialize();

//     await pollEpisode();
// });

(async () => {
    await AppDataSource.initialize();
    await pollEpisode();
})();
