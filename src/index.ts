import "dotenv/config";
import { pollEpisode } from "./infrastructure/bot/service";
import { AppDataSource } from "./infrastructure/dabtabase/dataSource";

// schedule("0 */6 * * *", async () => {
//     // send the message here
//     await pollEpisode();
// });

(async () => {
    await AppDataSource.initialize();
    await pollEpisode();
})();
