const { CommandInteractionOptionResolver } = require('discord.js');

const axios = require("axios");
const re = /<meta\sname="description"(.*?)\/>/g;

async function f(){
	axios.get("https://www.ynet.co.il/digital/gaming/article/sjw5mhb1i").then((res)=>{	
		html = res.data;
		const ans = html.match(re);
		let description = ans[0];
		description = description.slice(34, -3);
		console.log(description);
   	});
}

f();