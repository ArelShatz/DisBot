require("dotenv").config();
const Discord = require("discord.js");
const {addSpeechEvent} = require("discord-speech-recognition");
const Parser = require('rss-parser');
const parser = new Parser();

const client = new Discord.Client({intents: [Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.GuildMessages]});
const colors = [0x05ED11, 0x0EE39F, 0x0099FF, 0x0707F0, 0x9806C4, 0xE30BC3, 0xED210E, 0xED9C05, 0xF5F116, 0xFFFFFF];
const ERR_COLOR = 0xED210E;
const SUCC_COLOR = 0x0099FF;
const categories = {
    news1: ["http://www.ynet.co.il/Integration/StoryRss2.xml", 0],
    news2: ["http://www.ynet.co.il/Integration/StoryRss1854.xml", 0],
    opinions: ["http://www.ynet.co.il/Integration/StoryRss194.xml", 0],
    consumption: ["http://www.ynet.co.il/Integration/StoryRss5363.xml", 0],
    sports: ["http://www.ynet.co.il/Integration/StoryRss3.xml", 0],
    culture: ["http://www.ynet.co.il/Integration/StoryRss538.xml", 0],
    involvment: ["http://www.ynet.co.il/Integration/StoryRss3262.xml", 0],
    health: ["http://www.ynet.co.il/Integration/StoryRss1208.xml", 0],
    tech1: ["http://www.ynet.co.il/Integration/StoryRss544.xml", 0],
    tech2: ["http://www.ynet.co.il/Integration/StoryRss545.xml", 0],
    tech_reviews: ["http://www.ynet.co.il/Integration/StoryRss2424.xml", 0],
    games: ["http://www.ynet.co.il/Integration/StoryRss571.xml", 0],
    cars: ["http://www.ynet.co.il/Integration/StoryRss550.xml", 0],
    tourism: ["http://www.ynet.co.il/Integration/StoryRss598.xml", 0],
    adults: ["http://www.ynet.co.il/Integration/StoryRss3052.xml", 0],
    food: ["http://www.ynet.co.il/Integration/StoryRss975.xml", 0],
    judism: ["http://www.ynet.co.il/Integration/StoryRss4403.xml", 0],
    finance: ["http://www.ynet.co.il/Integration/StoryRss6.xml", 0],
    science: ["http://www.ynet.co.il/Integration/StoryRss2142.xml", 0],
    relations: ["http://www.ynet.co.il/Integration/StoryRss3925.xml", 0]
}
const re = new RegExp('<meta name="twitter:description" content="*"/>');
let feed;
addSpeechEvent(client);

function reply_succ(interaction, title, description, fields){
    interaction.reply({
        embeds: [new Discord.EmbedBuilder()
                    .setColor(SUCC_COLOR)
                    .setTitle(title)
                    .setDescription(description)
                    .addFields(
                        fields,
                    )
                    .setTimestamp()]
    });
}

function reply_err(interaction, title, description){
    interaction.reply({
        ephemeral: true,
        embeds: [new Discord.EmbedBuilder()
                    .setColor(ERR_COLOR)
                    .setTitle(title)
                    .setDescription(description)
                    .setTimestamp()]
    });
}

//bot functions
function Help(interaction, command){
    if (!command){
        reply_succ(interaction, "command names:", null, [{name: "/help", value: "lists all commands with all possible options"}, {name: "/ping", value: "check if the bot is alive"}, {name: "/ynet", value: "fetch the current ynet feed"}]);
    }

    else if (command === "help"){
        reply_succ(interaction, "help command:", "lists all commands with all possible options", [{name: "command", value: "get help on a specific command"}]);
    }

    else if (command === "ping"){
        reply_succ(interaction, "ping command:", "check if the bot is alive", null);
    }

    else if (command === "ynet"){
        reply_succ(interaction, "ynet command:", "fetch the current ynet feed", [{name: "category", value: "choose a ynet category to display, available categories are:\nnews1\nnews2\nopinions\nconsumption\nsports\nculture\ninvolvment\nhealth\ntech1\ntech2\ntech_reviews\ngames\ncars\ntourism\nadults\nfood\njudism\nfinance\nscience\nrelations"}]);
    }

    else{
        reply_err(interaction, "invalid command", `${command} is not a valid command, type /help to see all commands`);
    }
}

function Ping(interaction){
    reply_succ("bot alive", null, null);
    return 200;
}

async function display_ynet(interaction, category){
    let rss;
    if (!category){
        category = "news1";
    }

    rss = categories[category][0];
    if (!rss){
        reply_err(interaction, "invalid category", `${category} is not a valid category, type /help ynet to get all possible categories`);
        return 400;
    }

    feed = await parser.parseURL(rss);
    let current_ind = categories[category][1]

    let embeds = [];
    for (let _=0; _ < 3; _++){
        article = feed.items[current_ind % 30];
        const ynet_embed_pattern = new Discord.EmbedBuilder()
                    .setColor(colors[current_ind % colors.length])
                    .setAuthor({name: 'ynet', iconURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Ynet_website_logo.svg/1200px-Ynet_website_logo.svg.png', url: 'https://www.ynet.co.il'})
                    .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Ynet_website_logo.svg/1200px-Ynet_website_logo.svg.png')
                    .setTitle(article.title)
                    .setTimestamp()
                    .setURL(article.link);

        embeds.push(ynet_embed_pattern);
        current_ind = current_ind + 1;
        categories[category][1] = current_ind;
    }

    interaction.reply({
        embeds: embeds,
    });
}

//event listener for built-in events
client.on("ready", async (client) => {
    client.user.setActivity("Building Intelligence");
    const serverID = process.env.SERVER_ID;
    const server = client.guilds.cache.get(serverID);

    let cmd;
    cmd = client.application.commands;

    /*if (server){
        cmd = server.commands;
    }
    else{
        cmd = client.application.commands;
    }*/

    cmd.create({
        name: "help",
        description: "lists all commands with all possible options",
        options: [{
            name: "command",
            description: "get help on a specific command",
            type: 3
        }]
    });

    cmd.create({
        name: "ping",
        description: "check if the bot is alive"
    });

    cmd.create({
        name: "ynet",
        description: "fetch the current ynet feed",
        options: [{
            name: "catregory",
            description: "choose a ynet category to display",
            type: 3
        }]
    });

    cmd.create({
        name: "jarvis",
        description: "summon Jarvis into your voice channel and talk to him",
        options: [{
            name: "action",
            description: "choose an action, type /help jarvis to get all possible actions",
            type: 3
        }]
    });
});


client.on("message", async (msg) => {
    if (msg.author.bot){
        return;
    }
});


//event listener for custom commmands
client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()){
        return;
    }

    const {commandName, options} = interaction;
    let status = 418;

    if (commandName === "help"){
        const command = options.getString("command");
        status = Help(interaction, command);
    }

    else if (commandName === "ping"){
        status = Ping(interaction);
    }

    else if (commandName === "ynet"){
        const category = options.getString("catregory");
        status = display_ynet(interaction, category);
    }

    if (status >= 500){
        interaction.reply({
            content: 'bot fault status ${status}',
            ephemeral: true
        });
    }
});


client.on("speech", (msg) => {
    if (!msg.content) return;
  
    msg.author.send(msg.content);
  });

client.login(process.env.BOT_TOKEN);