const {reply_succ, reply_err} = require("../helper.js");
const {ping_command} = require("./ping.js");
const {ynet_command} = require("./ynet.js");
const {jarvis_command} = require("./jarvis.js");

help_command = {
    name: "help",
    description: "lists all commands with all possible options",
    options: [{
        name: "command",
        description: "get help on a specific command",
        type: 3
    }]
};

module.exports = {
    help_command: help_command,
    Help: async (interaction, command) => {
        if (!command){
            reply_succ(interaction, "command names:", null, [{name: `/${help_command.name}`, value: help_command.description}, {name: `/${ping_command.name}`, value: ping_command.description}, {name: `/${ynet_command.name}`, value: ynet_command.description}, {name: `/${jarvis_command.name}`, value: `${jarvis_command.description}`}]);
        }
    
        else if (command === "help"){
            reply_succ(interaction, `${help_command.name} command:`, help_command.description, [{name: "command", value: "get help on a specific command"}]);
        }
    
        else if (command === "ping"){
            reply_succ(interaction, `${ping_command.name} command:`, ping_command.description, null);
        }
    
        else if (command === "ynet"){
            reply_succ(interaction, `${ynet_command.name} command:`, ynet_command.description, [{name: "category", value: "choose a ynet category to display, available categories are:\nnews1\nnews2\nopinions\nconsumption\nsports\nculture\ninvolvment\nhealth\ntech1\ntech2\ntech_reviews\ngames\ncars\ntourism\nadults\nfood\njudism\nfinance\nscience\nrelations"}]);
        }
    
        else if (command === "jarvis"){
            reply_succ(interaction, `${ynet_command.name} command:`, ynet_command.description, [{name: "action", value: "choose an action, available actions are:\nstart - make jarvis join the asker's voice chat\nstop - make jarvis leave the voice chat"}]);
        }
    
        else{
            reply_err(interaction, "invalid command", `${command} is not a valid command, type /help to see all commands`);
            return 400;
        }
    },
}