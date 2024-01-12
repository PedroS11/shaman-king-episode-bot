import "dotenv/config";
import { pollEpisode } from "./infrastructure/bot/service";

// cron.schedule("0 */2 * * *", async () => {
//     // send the message here
//     await pollEpisode();
// });

(async () => {
    await pollEpisode();
})();
