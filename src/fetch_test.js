const { CommandInteractionOptionResolver } = require('discord.js');

const axios = require("axios");
const re = new RegExp('<meta\sproperty(.*?)/>');

async function f(){
	axios.get("https://www.ynet.co.il/digital/gaming/article/sjw5mhb1i").then((res)=>{	
		html = res.data;
		const ans = html.match(re);
		console.log(ans);
   	});
}

f()