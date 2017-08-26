const Discord = require("discord.js");
const fs = require("fs");
const clt = new Discord.Client({disableEveryone:true});
var bot, stt;
clt.on('ready',()=>{
	console.log(`Logged in as ${clt.user.tag}!`);
	bot = JSON.parse(fs.readFileSync("Bot.json"));
});
clt.on("message",msg=>{
	try {
		if (/```/.test(msg.content)) return
		if (msg.author.id==clt.user.id) {
			if (/\{.*?\}/gmi.test(msg.content)) {
				msg.edit(msg.content.replace(/\{shru?g?\}/gmi,"¯\\_(ツ)_/¯").replace(/\{lenn?y?\}/gmi,"(͡° ͜ʖ ͡°)"));
			}
			if (/^!!kill/i.test(msg.content)) {
				if (/^!!killrest$/i.test(msg.content)) {
					msg.channel.send("*Bot restarting...*").then(()=>clt.login(tkn)).catch(process.exit);
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
			} else if (/^!!rp \d{1,3} /i.test(msg.content)) {
				let rep = (msg.content.split(" ")[1]||1) * 1
				let dt = msg.content.split(" ").slice(2).join(" ");
				msg.delete();
				if (!dt) return
				for (var stp = 0; stp < rep; stp++) {
					msg.channel.send(dt);
				}
				return;
			} else if (/^!!rp .+/i.test(msg.content)) {
				msg.channel.send(msg.content.split(" ").slice(1).join(" "));
				msg.delete();
				return;
			} else if (/^!!rg .+?/i.test(msg.content)) {
				msg.channel.send(msg.content.replace(/^!!rg /i,"").split("").map(val=>{
					var vl = val.toLowerCase();
					if (/[a-z]/.test(vl)) {
						return `:regional_indicator_${vl}:`;
					} else if (/\d/.test(val)) {
						return `:${["zero","one","two","three","four","five","six","seven","eight","nine"][Number(vl)]}:`;
					} else if (vl={"?":"question","!":"exclamation","*":"asterisk","#":"hash","-":"heavy_minus_sign","+":"heavy_plus_sign","/":"heavy_division_sign","$":"heavy_dollar_sign"}[val]) {
						return `:${vl}:`;
					} else {
						return val.replace(/ /,"  ");
					}
				}).join(""));
				msg.delete();
				return;
			} else if (/^!!afk .*?/i.test(msg.content)) {
				clt.user.setAFK(stt.afk=!/^(false|undefined|null|0|""|'')$/.test(msg.content.replace(/^!!afk /i,"")));
				clt.user.setPresence(stt);
				msg.reply(`you are ${stt.afk?"":"not "}away from keyboard`);
			} else if (/^!!game .*?/i.test(msg.content)) {
				clt.user.setGame(stt.game.name=msg.content.replace(/^!!game /i, ""));
				clt.user.setPresence(stt);
				msg.delete(100);
			} else if (/^!!react$/i.test(msg.content)&&msg.guild) {
				msg.guild.reactspam = msg.guild.reactspam?false:true;
				msg.delete(100);
			}
		}
		if (msg.guild) {
			if (msg.guild.reactspam&&!(msg.author.id==clt.user.id&&msg.content.includes("```"))) {
				if (/\bgay\b/i.test(msg.content)) {
					msg.react("🏳️‍🌈");
				}
				if (/fu?c?k/i.test(msg.content)) {
					msg.react("241616161861664778");
				}
			}
		}
		if (/(^| |\b)ounck?t?e?r?v?v?y?n?t?c?k?( |\b|$)/i.test(msg.content)) {
			msg.delete();
			return;
		}
		if (/^!!ping$/i.test(msg.content)) {
			msg.reply(`Pong! ${clt.ping}`);
		} else if (/^!!pings$/i.test(msg.content)) {
			msg.reply(`Pongs! ${clt.pings.toString()}`);
		} else if (/^!!rg .+?/i.test(msg.content)) {
			msg.channel.send(msg.content.replace(/^!!rg /i,"").split("").map(val=>{
				var vl = val.toLowerCase();
				if (/[a-z]/.test(vl)) {
					return `:regional_indicator_${vl}:`;
				} else if (/\d/.test(val)) {
					return `:${["zero","one","two","three","four","five","six","seven","eight","nine"][Number(vl)]}:`;
				} else if (vl={"?":"question","!":"exclamation","*":"asterisk","#":"hash","-":"heavy_minus_sign","+":"heavy_plus_sign","/":"heavy_division_sign","$":"heavy_dollar_sign"}[val]) {
					return `:${vl}:`;
				} else {
					return val.replace(/ /,"  ");
				}
			}).join(""));
			msg.delete();
			return;
		} else if (/^!!he?lp/i.test(msg.content)) {
			msg.reply("```\n!!ping --> command execution delay\n!!pings --> uptime pings\n!!rg text --> converts your speech to emojis\n!!hlp --> shows this screen\n!!sd text --> sends message and deletes after 0.25 seconds\n!!rp [number] text --> repeats text 'number' times\n!!id [mention(s)] --> user's/channel's id\n!!chid --> channel's id\n!!servid --> server's id\n!!shrug --> ¯\\_(ツ)_/¯\n!!lenny --> (͡° ͜ʖ ͡°).\n\nbot automatically upvotes reactions...\nDM @ValentinHacker#5509 for disable...\n\n```<https://github.com/ValentinHacker/Vale>");
		} else if (/^!!sd /gmi.test(msg.content)) {
			msg.reply(msg.content.replace(/^!!sd /i,"")).then(msg=>msg.delete(2500));
			msg.delete();
		} else if (/^!!rp \d{1,2} /i.test(msg.content)) {
			let rep = (msg.content.split(" ")[1]||1) * 1
			let dt = msg.content.split(" ").slice(2).join(" ");
			if (!dt) return
			msg.delete();
			for (var stp = 0; stp < rep; stp++) {
				msg.channel.send(dt);
			}
			return;
		} else if (/^!!rp .+/i.test(msg.content)) {
			msg.channel.send(msg.content.split(" ").slice(1).join(" "));
			msg.delete();
			return;
		} else if (/^!!id$/i.test(msg.content)) {
			msg.reply(`<\\@${msg.author.id}>`);
		} else if (/^!!id /i.test(msg.content)) {
			var tmp = [];
			msg.mentions.users.forEach(function(usr) {
				tmp.push(`${usr} : <\\@${usr.id}>`);
			});
			msg.mentions.channels.forEach(function(chn) {
				tmp.push(`${chn} : <\\#${chn.id}>`);
			});
			msg.reply(tmp.join("\t"));
		} else if (/^!!chid$/i.test(msg.content)) {
			msg.reply(`<\\#${msg.channel.id}>`);
		} else if (/^!!chid /i.test(msg.content)) {
			var tmp = [];
			msg.mentions.channels.forEach(function(chn) {
				tmp.push(`${chn} : <\\#${chn.id}>`);
			});
			msg.reply(tmp.join("\t"));
		} else if (/^!!servid$/i.test(msg.content)) {
			msg.reply(`<\\#${msg.guild.id}>`);
		} else if (/^!!shrug$/i.test(msg.content)) {
			msg.reply("¯\\_(ツ)_/¯");
		} else if (/^!!lenny$/i.test(msg.content)) {
			msg.reply("(͡° ͜ʖ ͡°)");
		} else if (/^!!up(time)?$/i.test(msg.content)) {
			msg.reply(clt.uptime);
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
	try {
		if (!/^(262268073363505164|223517176005394432|117006615147708417)$/gi.test(emj.message.guild.id)) {
			emj.message.react(emj.emoji);
		}
	} catch (e) {
		return;
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
clt.on("messageUpdate",(old,nw)=>{
	if (/(^| |\b)ounck?t?e?r?v?v?y?n?t?c?k?( |\b|$)/i.test(nw.content)) {
		nw.delete();
	}
});
clt.on("disconnect",evt=>{
	clt.login(tkn);
});
stt = {game:{name:"",type:0},type:0,afk:false};
clt.login(tkn);
