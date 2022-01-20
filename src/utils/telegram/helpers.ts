import { Telegraf } from "telegraf";
import { getEnvironmentVariable } from "../getEnvironmentVariable";

const CHAT_ID = getEnvironmentVariable("CHAT_ID");

export const sendMessage = async (bot: Telegraf, message: string) => bot.telegram.sendMessage(CHAT_ID, message);