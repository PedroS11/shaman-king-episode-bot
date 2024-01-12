import "dotenv/config";
import { pollEpisode } from "./infrastructure/bot/service";
import { schedule } from "node-cron";

schedule("0 */6 * * *", async () => {
    // send the message here
    await pollEpisode();
});

// (async () => {
//     await pollEpisode();
// })();
