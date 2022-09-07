const {reply_succ, reply_err} = require("../helper.js");
const {joinVoiceChannel} = require("@discordjs/voice");

module.exports = {
    jarvis_command: {
        name: "jarvis",
        description: "summon Jarvis into your voice channel and talk to him",
        options: [{
            name: "action",
            description: "choose an action, type /help jarvis to get all possible actions",
            type: 3
        }]
    },
    Jarvis: async (interaction, action) => {
        if (!action){
            action = "start";
        }
    
        if (action === "start"){
            const channelId = interaction.member.voice.channelId;;
    
            if (!channelId){
                reply_err(interaction, "invalid requirement", "you are not in a voice chat, enter one and then call jarvis");
                return 400;
            }
            voiceConnection = joinVoiceChannel({
                channelId: channelId,
                guildId: interaction.guildId,
                adapterCreator: interaction.guild.voiceAdapterCreator,
                selfDeaf: false
            });
            return voiceConnection;
    
            //interaction.reply({
            //    content: "Jarvis online"
            //});
        }
    
        else if (action === "stop"){
            if (!voiceConnection){
                reply_err(interaction, "invalid action", "jarvis is not connected to a voice channel");
                return 400;
            }
            voiceConnection.destroy();
        }
    
        else{
            reply_err(interaction, "invalid action", `${action} is not a valid action, type /help jarvis to get all possible actions`);
            return 400;
        }
    },
}