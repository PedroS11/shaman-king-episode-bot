require("dotenv").config();
import axios, { AxiosError } from "axios";
import cheerio from 'cheerio';
import { Telegraf } from "telegraf";
import { sendMessage } from "./utils/telegram/helpers";

// @ts-ignore
const bot = new Telegraf(process.env.BOT_TOKEN);

let lastRow = {
    episodeNumber: 39,
    url: "http://watchshamanking.com/shaman-king-2021-episode-39-subbed",
    notificationSent: false
}

bot.launch();

const url: string = "http://watchshamanking.com/shaman-king-2021-episode-39-subbed";

(async () => {

    // Ir à BD, buscar o último elemento e ver se é menor que 52

    // Se não tiver enviado notificacao, fazer polling para saber se já existe com legendas

    // SE já tiver, poll do próximo

    if(lastRow.notificationSent)


    try {
        const response = await axios(url);
        const html = response.data;
        const $ = cheerio.load(html);

        const item = $('.entry-content p').text()

        console.log(item)
        //								<div class="entry-content" itemprop="text">
    } catch (e) {
        if (e?.response) {
            const error: AxiosError = e;
            if(error?.response?.status === 404) {
                console.log("Episódio não disponível")
                return
            }
        }

        await sendMessage(bot,`Error calling ${url}, message ${e.message}`);
    }

})()
