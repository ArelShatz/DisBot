//defines general helper functions for all scripts to use
const {EmbedBuilder} = require("discord.js");

const ERR_COLOR = 0xED210E;     //red
const SUCC_COLOR = 0x0099FF;    //blue

module.exports = {
    //replies with a successful message
    reply_succ: (interaction, title, description, fields) => {
        interaction.reply({
            embeds: [new EmbedBuilder()
                        .setColor(SUCC_COLOR)
                        .setTitle(title)
                        .setDescription(description)
                        .addFields(
                            fields,
                        )
                        .setTimestamp()]
        });
    },

    //replies with an error message (that only the sender can see)
    reply_err: (interaction, title, description) => {
        interaction.reply({
            ephemeral: true,
            embeds: [new EmbedBuilder()
                        .setColor(ERR_COLOR)
                        .setTitle(title)
                        .setDescription(description)
                        .setTimestamp()]
        });
    }
}