const Discord = require("discord.js");
const clt = new Discord.Client();
clt.removeAllListeners();
clt.on('ready',()=>{
	console.log("Logged in as "+clt.user.tag+"!");
});
clt.on("message",msg=>{
	if (msg.author.tag==clt.user.tag) {
		if (msg.content=="kill") {
            	msg.channel.send("*Bot shutdown...*").then(clt.user.destroy).then(process.exit).catch(process.exit);
        } else if (/^!!sd /gmi.test(msg.content)) {
           	msg.channel.send(msg.content.replace(/^!!sd /gi,"")).then(msg=>setTimeout(msg=>msg.delete(),2500,msg));
        	msg.delete();
        } else if (/^eval /i.test(msg.content)) {
        	try {
                	msg.channel.send(eval(msg.content.replace(/^eval /i, "")));
           	} catch(e) {
                	msg.channel.send("```js\n" + `${e.name}: ${e.message}` + "\n```");
        	}
        } else if (/^!!rp \d{1,3} /gi.test(msg.content)) {
        	var rep = msg.content.match(/\d{1,3}/)[0];
        	var dt = msg.content.replace(/^!!rp .*? /i,"");
        	msg.delete();
        	for (var stp = 0; stp < rep; stp++) {
                	msg.channel.send(dt);
        	}
        } else if (/^!!dl \d{1,3}/gi.test(msg.content)) {
        	var dt = msg.content.replace(/^!!dl /i,"");
		try {
			msg.channel.bulkDelete(Number(dt));
			msg.delete();
		} catch (e) {
			console.log(`${e.name}: ${e.message}`);
		}
	}
    }
	if (/(^| |\W)gay($| |\W)/gi.test(msg.content)) {
        	msg.react("🏳️‍🌈");
	}
	if (/^ping$/i.test(msg.content)) {
        	msg.reply("Pong! "+clt.ping);
	} else if (/^!!rg .+?/i.test(msg.content)) {
        	msg.reply(msg.content.replace(/^!!rg /i,"").split("").map(val=>{return ":regional_indicator_"+val.toLowerCase()+":"}).join(""));
		msg.delete();
	} else if (/ountvvck/gi.test(msg.content)) {
		msg.delete();
	}
});
clt.on("messageReactionAdd",(emj,usr)=>{
	if (!/(u|o)w(u|o)/gi.test(emj.message.guild.name)) {
		emj.message.react(emj.emoji);
	}
});
