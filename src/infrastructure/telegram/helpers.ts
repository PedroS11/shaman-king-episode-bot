import { Telegram } from "telegraf";
import { getEnvironmentVariable } from "../../utils/getEnvironmentVariable";

const CHAT_ID = getEnvironmentVariable("CHAT_ID");

export const sendMessage = async (bot: Telegram, message: string) => bot.sendMessage(CHAT_ID, message);
