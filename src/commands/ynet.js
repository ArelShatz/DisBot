const {EmbedBuilder} = require("discord.js");
const {reply_succ, reply_err} = require("../helper.js");
const Parser = require('rss-parser');
const axios = require("axios");
const { arch } = require("os");
const parser = new Parser();

const descRegex = /<meta\sname="description"(.*?)\/>/g;
const htmlEncodingFilter = /&(lt|gt|quot);/g;
const colors = [0x05ED11, 0x0EE39F, 0x0099FF, 0x0707F0, 0x9806C4, 0xE30BC3, 0xED210E, 0xED9C05, 0xF5F116, 0xFFFFFF];

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

async function getArticleDesc(url){
	const res = await axios.get(url);
	html = res.data;
	const ans = html.match(descRegex);
	let description = ans[0];
    description = description.replace(htmlEncodingFilter, function (m, p) { 
        switch (p) {
            case 'lt':
              return '<';
            case 'gt':
              return '>';
            case 'quot':
              return '\'';
        }
    });

	return description.slice(34, -3);
}

module.exports = {
    ynet_command: {
        name: "ynet",
        description: "fetch the current ynet feed",
        options: [{
            name: "catregory",
            description: "choose a ynet category to display, type /help ynet to get all possible categories",
            type: 3
        }]
    },
    DisplayYnet: async (interaction, category) => {
        if (!category){
            category = "news1";
        }
    
        let rss = categories[category][0];
        if (!rss){
            reply_err(interaction, "invalid category", `${category} is not a valid category, type /help ynet to get all possible categories`);
            return 400;
        }
    
        let feed = await parser.parseURL(rss);
        let current_ind = categories[category][1]
    
        let temp_ind = current_ind;
        let descPromises = [];
        for (let _=0; _ < 3; _++){
            article = feed.items[temp_ind % 30];
            const promise = getArticleDesc(article.link);
            descPromises.push(promise);
            temp_ind++;
        }

        const descriptions = await Promise.all(descPromises);

        let embeds = [];
        for (desc of descriptions){
            article = feed.items[current_ind % 30];
            const ynet_embed_pattern = new EmbedBuilder()
                        .setColor(colors[current_ind % colors.length])
                        .setAuthor({name: 'ynet', iconURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Ynet_website_logo.svg/1200px-Ynet_website_logo.svg.png', url: 'https://www.ynet.co.il'})
                        .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Ynet_website_logo.svg/1200px-Ynet_website_logo.svg.png')
                        .setTitle(article.title)
                        .setDescription(desc)
                        .setTimestamp()
                        .setURL(article.link);
    
            embeds.push(ynet_embed_pattern);
            current_ind++;
            categories[category][1] = current_ind;
        }
    
        interaction.reply({
            embeds: embeds,
        });
    },
}