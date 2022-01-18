import { Telegraf } from "telegraf";

const CHAT_ID = process.env.CHAT_ID as string;

export const sendMessage = async (bot: Telegraf, message: string) => bot.telegram.sendMessage(CHAT_ID, message);