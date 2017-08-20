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
		}
	}
	if (/(^| )gay( |$)/gi.test(msg.content)) {
		msg.react(":gay_pride_flag:").catch(()=>{msg.react("gay_pride_flag")});
	} else if (/^ping$/i.test(msg.content)) {
		msg.reply("Pong! "+clt.ping);
	}
});
clt.on("messageReactionAdd",(emj,usr)=>{
	emj.message.react(emj.emoji);
});
