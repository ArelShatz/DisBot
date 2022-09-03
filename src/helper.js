const {EmbedBuilder} = require("discord.js");

const ERR_COLOR = 0xED210E;
const SUCC_COLOR = 0x0099FF;

module.exports = {
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