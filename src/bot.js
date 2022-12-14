//the main bot file - sets up the client, defines all global constants and defines all events
require("dotenv").config();
const Discord = require("discord.js");
const DiscordTTS = require("discord-tts");
const {AudioPlayer, createAudioResource, StreamType, entersState, VoiceConnectionStatus} = require("@discordjs/voice");
const {addSpeechEvent} = require("discord-speech-recognition");
const {EventEmitter} = require("node:events");

const client = new Discord.Client({intents: [Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.GuildMessages, Discord.GatewayIntentBits.GuildVoiceStates]});
const re = new RegExp('<meta name="twitter:description" content="*"/>');
let voiceConnection;
let audioPlayer = new AudioPlayer();
addSpeechEvent(client);
//process.setMaxListeners(0);
emitter = new EventEmitter();
emitter.setMaxListeners(0);

//command imports
const {help_command, Help} = require("./commands/help.js");
const {ping_command, Ping} = require("./commands/ping.js");
const {ynet_command, DisplayYnet} = require("./commands/ynet.js");
const {jarvis_command, Jarvis} = require("./commands/jarvis.js");

//jarvis speech-command imports
const {Time, Date} = require("./jarvis_commands/datetime.js");
const {Hello} = require("./jarvis_commands/hello.js");


//event listener for when the client is ready
client.on("ready", async (client) => {
    client.user.setActivity("Building Intelligence");
    ///const serverID = process.env.SERVER_ID;
    //const server = client.guilds.cache.get(serverID);

    let cmd = client.application.commands;

    /*if (server){
        cmd = server.commands;
    }
    else{
        cmd = client.application.commands;
    }*/

    cmd.create(help_command);
    cmd.create(ping_command);
    cmd.create(ynet_command);
    cmd.create(jarvis_command);
});


//event listener for custom commmands
client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    const {commandName, options} = interaction;
    let status = 418;

    switch(commandName){
        case "help":
            const command = options.getString("command");
            status = Help(interaction, command);
            break;

        case "ping":
            status = Ping(interaction);
            break;

        case "ynet":
            const category = options.getString("catregory");
            status = DisplayYnet(interaction, category);
            break;
            
        case "jarvis":
            const action = options.getString("action");
            voiceConnection = await Jarvis(interaction, action);
            break;
    }

    if (status >= 500){
        interaction.reply({
            content: `bot fault status ${status}`,
            ephemeral: true
        });
    }
});


//speech event listener
client.on("speech", async (msg) => {
    //if (msg.content != "hello") return;
    if (!msg.content) return;
    text = msg.content.toLowerCase();
    let returnText;

    if (text.includes("time")){
        returnText = Time();
    }
    else if (text.includes("date")){
        returnText = Date();
    }
    else if (text.includes("hello")){
        returnText = Hello();
    }
    else return;

    const stream = DiscordTTS.getVoiceStream(returnText);
    const audioResource = createAudioResource(stream, {inputType: StreamType.Arbitrary, inlineVolume: true});
    
    if (voiceConnection.status === VoiceConnectionStatus.Connected){
        voiceConnection.subscribe(audioPlayer);
        audioPlayer.play(audioResource);
    }
});

client.login(process.env.BOT_TOKEN);