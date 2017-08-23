const Discord = require("discord.js");
const clt = new Discord.Client();
clt.removeAllListeners();
clt.on('ready',()=>{
	console.log(`Logged in as ${clt.user.tag}!`);
});
clt.on("message",msg=>{
	try {
		if (/```/.test(msg.content)) return;
		if (msg.author.id==clt.user.id) {
			if (/^!!kill/i.test(msg.content)) {
				if (/^!!killrest$/i.test(msg.content)) {
					msg.channel.send("*Bot restarting...*").then(clt.destroy).then(()=>clt.login(tkn)).catch(process.exit);
				} else {
					msg.channel.send("*Bot shutdown...*").then(clt.user.destroy).then(process.exit).catch(process.exit);
				}
			} else if (/^!!sd /gmi.test(msg.content)) {
				msg.channel.send(msg.content.replace(/^!!sd /i,"")).then(msg=>msg.delete(2500));
				msg.delete();
				return;
			} else if (/^!!eval /i.test(msg.content)) {
				msg.channel.send("```js\n"+eval(msg.content.replace(/^!!eval /i, ""))+"```");
				msg.react("✅");
			} else if (/^!!rp \d{1,3} /i.test(msg.content)) {
				let rep = Number(msg.content.split(" ")[1]||1), dt = msg.content.split(" ")[2]||"null";
				msg.delete();
				for (var stp = 0; stp < rep; stp++) {
					msg.channel.send(dt);
				}
				return;
			} else if (/^!!rg .+?/i.test(msg.content)) {
				msg.channel.send(msg.content.replace(/^!!rg /i,"").split("").map(val=>{var vl=val.toLowerCase();if("abcdefghijklmnopqrstuvwxyz".indexOf(vl)>=0){return ":regional_indicator_"+vl+":";}else if(/\d/.test(val)){return ":"+["zero","one","two","three","four","five","six","seven","eight","nine"][Number(val)]+":"}else if(vl={"?":"question","!":"exclamation"}[val]){return ":"+vl+":";}else{return val;}}).join(""));
				msg.delete();
				return;
			} else if (/^!!afk .*?/i.test(msg.content)) {
				let md = false;
				clt.user.setAFK(md=msg.content.replace(/^!!afk /i,"")==="true");
				msg.reply(" you are "+(md?"":"not ")+"'away from keyboard'");
			} else if (/^!!game .*?/i.test(msg.content)) {
				const gm = msg.content.replace(/^!!game /i, "");
				clt.user.setPresence({game: {name: gm, type: 0}});
				msg.delete();
			}
		}
		if (/(^| |\W)gay($| |\W)/gi.test(msg.content)&&!/((u|o)w(u|o))|New Game/gi.test(msg.guild.name)&&!(/#5509$/.test(msg.author.tag)&&msg.content.includes("```"))) {
        		msg.react("🏳️‍🌈");
		}
		if (/(\W| |^)ountv?v?c?k?($| |\W)/gi.test(msg.content)) {
			msg.delete();
			return;
		}
		if (/^!!ping$/i.test(msg.content)) {
        		msg.reply("Pong! "+clt.ping);
		} else if (/^!!rg .+?/i.test(msg.content)) {
        		msg.reply(msg.content.replace(/^!!rg /i,"").split("").map(val=>{var vl=val.toLowerCase();if("abcdefghijklmnopqrstuvwxyz".indexOf(vl)>=0){return ":regional_indicator_"+vl+":";}else if(/\d/.test(val)){return ":"+["zero","one","two","three","four","five","six","seven","eight","nine"][Number(val)]+":"}else if(vl={"?":"question","!":"exclamation","*":"asterisk","#":"hash","-":"heavy_minus_sign","+":"heavy_plus_sign","/":"heavy_division_sign","$":"heavy_doller_sign"}[val]){return ":"+vl+":";}else{return val;}}).join(""));
			msg.delete();
		} else if (/^!!he?lp/i.test(msg.content)) {
			msg.reply("```\n!!ping\n!!rg text --> converts your speech to emojis\n!!hlp\n!!sd text --> sends message and deletes after 0.25 seconds\n!!rp number text --> repeats text 'number' times.\nbot automatically reacts with :gay_pride_flag: when message contains the word 'gay' and upvotes reactions...\nDM @ValentinHacker#5509 for disable...```");
		} else if (/^!!sd /gmi.test(msg.content)) {
         	  	msg.reply(msg.content.replace(/^!!sd /i,"")).then(msg=>setTimeout(msg=>msg.delete(),2500,msg));
      	  		msg.delete();
      		} else if (/^!!rp \d{1,2} /i.test(msg.content)) {
        		let rep = Number(msg.content.split(" ")[1]||1), dt = msg.content.split(" ")[2]||"null";
        		msg.delete();
        		for (var stp = 0; stp < rep; stp++) {
                		msg.reply(dt);
        		}
        	} else if (/^!!id$/i.test(msg.content)) {
			msg.reply("<\\@"+msg.author.id+">");
		}
	} catch (a) {
		msg.react("❌");
		msg.channel.send("```js\n" + `${a.lineNumber} : ${a.name}: ${a.message}` + "\n```");
	}
});
clt.on("messageReactionAdd",(emj,usr)=>{
	if (usr.id!=clt.user.id&&!emj.message.guild) {
		emj.message.react(emj.emoji);
		return;
	}
	if (!/((u|o)w(u|o))|New Game/gi.test(emj.message.guild.name)) {
		emj.message.react(emj.emoji);
	}
});
clt.on("messageReactionRemove",(emj,usr)=>{
	if (emj.users.array().length<=1) {
		emj.remove(clt.user);
	}
});
clt.on("guildMemberAdd",member=>{
	if (member.guild.id=="269278777089982475") {
		member.guild.defaultChannel.send(`[Bot]: ${member}, Welcome! ^_^`);
	}
});
