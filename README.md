# Shaman King Episode Bot

This is a simple Telegram bot that polls a website for new [Shaman King 2021](https://en.wikipedia.org/wiki/Shaman_King_\(2021_TV_series\)) episodes. 

Every time a raw and/or subbed episode is available, it sends a message with the information regarding the episode and its url.

![Shaman King bot messages](/assets/images/messages.png "Shaman King bot messages")

## Disclaimer

> This bot only polls the website, I don't have any responsibility regarding the website or the upload of the episodes.

## Installation
 To run the bot, you need:
 
 ### Step 1 - Create the bot and retrieve the token
 - Create a Telegram bot as explained in the official [documentation](https://core.telegram.org/bots#6-botfather).
 
 
 - Save the token provided by the @BotFather
 
 ### Step 2 - Get chat ID
- Add bot to the group
- Get the list of updates for your BOT

```sh
https://api.telegram.org/bot<YourBOTToken>/getUpdates
```

- Get the chatId value from the response
> {"update_id":8393,"message":{"message_id":3,"from":{"id":7474,"first_name":"AAA"},"chat":{"id":<group_ID>,"title":""},"date":25497,"new_chat_participant":{"id":71,"first_name":"NAME","username":"YOUR_BOT_NAME"}}}
 
 
### Step 3 - Create the .env file
On the root of the project, create a .env with

```
BOT_TOKEN=<YOUR TOKEN>
CHAT_ID=<YOUR CHAT ID>
```

### Step 4 - Run the bot locally

> ```npm run dev``` or ``yarn dev``


## Build
The transpiled files are created inside the dist folder. This name is defined on tsconfig.json file and to renamed it you need to change the compilerOptions.outDir property.

#### Build code
> ```npm run build``` or ``yarn build``

## License 

[MIT](https://github.com/PedroS11/aws-s3-tools/blob/main/LICENSE.md) 