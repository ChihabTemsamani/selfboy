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
					msg.channel.send("*Bot restarting...*").then(clt.user.destroy).then(()=>clt.login(tkn)).catch(process.exit);
				} else {
					msg.channel.send("*Bot shutdown...*").then(clt.destroy).catch(process.exit);
				}
			} else if (/^!!sd /gmi.test(msg.content)) {
				msg.channel.send(msg.content.replace(/^!!sd /i,"")).then(msg=>msg.delete(2500));
				msg.delete();
				return;
			} else if (/^!!eval /i.test(msg.content)) {
				msg.channel.send("```js\n"+eval(msg.content.replace(/^!!eval /i, ""))+"```");
				msg.react("✅");
			} else if (/^!!rp (\d{1,3}|.*) /i.test(msg.content)) {
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
				clt.user.setAFK(stt.afk=!/^(false|undefined|null|0|""|'')$/.test(msg.content.replace(/^!!afk /i,"")));
				clt.user.setPresence(stt);
				msg.reply(" you are "+(stt.afk?"":"not ")+"'away from keyboard'");
			} else if (/^!!game .*?/i.test(msg.content)) {
				clt.user.setGame(stt.game.name=msg.content.replace(/^!!game /i, ""));
				clt.user.setPresence(stt);
				msg.delete(100);
			}
		}
		if (/(^| |\W)gay($| |\W)/gi.test(msg.content)&&!/^(262268073363505164|223517176005394432|117006615147708417)$/gi.test(msg.guild.id)&&!(msg.author.id==clt.user.id&&msg.content.includes("```"))) {
        		msg.react("🏳️‍🌈");
		}
		if (/(\W| |^)ountv?v?c?k?($| |\W)/gi.test(msg.content)) {
			msg.delete();
			return;
		}
		if (/^!!ping$/i.test(msg.content)) {
        		msg.reply("Pong! "+clt.ping);
		} else if (/^!!rg .+?/i.test(msg.content)) {
        		msg.reply(msg.content.replace(/^!!rg /i,"").split("").map(val=>{var vl=val.toLowerCase();if("abcdefghijklmnopqrstuvwxyz".indexOf(vl)>=0){return ":regional_indicator_"+vl+":";}else if(/\d/.test(val)){return ":"+["zero","one","two","three","four","five","six","seven","eight","nine"][Number(val)]+":"}else if(vl={"?":"question","!":"exclamation","*":"asterisk","#":"hash","-":"heavy_minus_sign","+":"heavy_plus_sign","/":"heavy_division_sign","$":"heavy_dollar_sign"}[val]){return ":"+vl+":";}else{return val;}}).join(""));
			msg.delete();
		} else if (/^!!he?lp/i.test(msg.content)) {
			msg.reply("```\n!!ping\n!!rg text --> converts your speech to emojis\n!!hlp\n!!sd text --> sends message and deletes after 0.25 seconds\n!!rp number text --> repeats text 'number' times\n!!id --> user's id.\n\nbot automatically reacts with :gay_pride_flag: when message contains the word 'gay' and upvotes reactions...\nDM @ValentinHacker#5509 for disable...\n\n```<https://github.com/ValentinHacker/Vale>");
		} else if (/^!!sd /gmi.test(msg.content)) {
         	  	msg.reply(msg.content.replace(/^!!sd /i,"")).then(msg=>setTimeout(msg=>msg.delete(),2500,msg));
      	  		msg.delete();
      		} else if (/^!!rp (\d{1,2}|.*) /i.test(msg.content)) {
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
	if (!/^(262268073363505164|223517176005394432|117006615147708417)$/gi.test(emj.message.guild.id)) {
		emj.message.react(emj.emoji);
	}
});
clt.on("messageReactionRemove",(emj,usr)=>{
	if (emj.users.array().length<=1) {
		emj.remove(clt.user);
	}
});
clt.on("guildMemberAdd",member=>{
	if (member.guild.id==269278777089982475) {
		member.guild.defaultChannel.send(`[Bot]: ${member}, Welcome! ^_^`);
	}
});
stt = {game:{name:"",type:0},type:0,afk:false};
