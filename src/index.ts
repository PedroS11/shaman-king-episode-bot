import "dotenv/config";
import { pollEpisode } from "./infrastructure/bot/service";

// cron.schedule("*/30 * * * 4-7", async () => {
//     // send the message here
//     await pollEpisode();
//page('#toload')[0].children[1].children[1].children[0]
// });

(async () => {
    await pollEpisode();
})();
