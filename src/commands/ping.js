const {reply_succ} = require("../helper.js");

module.exports = {
    ping_command: {
        name: "ping",
        description: "check if the bot is alive"
    },
    Ping: async (interaction) => {
        reply_succ(interaction, "bot alive", null, []);
        return 200;
    },
}