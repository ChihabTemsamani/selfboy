const Discord = require("discord.js");
const fs = require("fs");
const clt = new Discord.Client({disableEveryone:true});
var bot, stt, last;
function rnd(frm,to,rd) {
	if (frm===undefined) {
		return "#"+Math.round(Math.random()*16777215).toString(16);
	} else {
		to = to===undefined?frm:to;
		frm = frm==to?0:frm;
		var tmp = [Math.min(frm,to),Math.max(frm,to)];
		frm = tmp[0];
		to = tmp[1];
		return !rd?Math.round(Math.random()*(to-frm)+frm):(Math.random()*(to-frm)+frm);
	}
}//rnd
Math.rnd = rnd;
Number.prototype.rnd = function(frm,rd) {
	rnd(frm,this,rd);
};
Array.prototype.rnd = function(rd) {
	var ind = rnd(0,this.length-1);
	if (rd) {
		return ind;
	}
	return this[ind];
};
Object.prototype.ins = function() {
	return Object.keys(this);
};
Array.prototype.rmv = String.prototype.rmv = function(elm) {
	var arr = this.split("");
	arr.splice(typeof elm=="number"?elm:this.indexOf(elm),1);
	if (this instanceof String) {
		return arr.join("");
	}
	return arr;
};
const snd = function snd(serv,chan,data) {
	return clt.guilds.find("id",serv).channels.find("id",chan).send(data.replace(/\$HERE/g,last.channel).replace(/\$ME/g,last.author));
};
clt.on('ready',()=>{
	console.log(`Logged in as ${clt.user.tag}!`);
	bot = JSON.parse(fs.readFileSync("Bot.json"));
});
clt.on("message",msg=>{
	try {
		let out;
		if (/``/.test(msg.content)) return
		if (msg.author.id==clt.user.id) {
			if (/\{.*?\}/gmi.test(msg.content)) {
				msg.edit(msg.content.replace(/\{shru?g?\}/gmi,"¯\\_(ツ)_/¯").replace(/\{lenn?y?\}/gmi,"(͡° ͜ʖ ͡°)"));
			}
			if (/^!!kill/i.test(msg.content)) {
				if (/^!!killrest$/i.test(msg.content)) {
					msg.channel.send("*Bot restarting...*").then(()=>clt.login(tkn)).catch(process.exit);
				} else {
					msg.channel.send("*Bot shutdown...*").then(clt.destroy()).then(process.exit).catch(process.exit);
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
				msg.delete();
			} else if (/^!!reac(t|c)$/i.test(msg.content)&&msg.guild) {
				msg.guild.reactspam = msg.guild.reactspam?false:true;
				if (!/t/i.test(msg.content)) msg.delete(100)
			} else if (/^!!bots?$/i.test(msg.content)) {
				last = msg;
				eval(bot.command.replace(/\$SERV/g,last.guild.id+"").replace(/\$CHAN/g,last.channel.id+"").replace(/\$AUTH/g,last.author.id+""));
				msg.delete();
			} else if (/^!!commadd !!.+? .+?$/i.test(msg.content)) {
				bot.customCommands[msg.content.split(" ")[1]] = msg.content.split(" ").slice(2).join(" ");
				fs.writeFile("Bot.json",JSON.stringify(bot));
				msg.delete();
			} else if (out=bot.customCommands[(msg.content.match(/^.+?(?=( |$))/i)||[undefined])[0]]) {
				eval(out);
			} else if (/^!!commrem !!.+?$/i.test(msg.content)) {
				delete bot.customCommands[msg.content.split(" ").slice(1)];
				fs.writeFile("Bot.json",JSON.stringify(bot));
				msg.delete();
			} else if (/^!!novote$/i.test(msg.content)) {
				bot.novote.push(msg.guild.id);
				fs.writeFile("Bot.json",JSON.stringify(bot));
				msg.delete();
			} else if (/^!!vote$/i.test(msg.content)) {
				bot.novote.rmv(msg.guild.id+"");
				fs.writeFile("Bot.json",JSON.stringify(bot));
				msg.delete();
			}
		}
		if (msg.guild) {
			if (msg.guild.reactspam&&!(msg.author.id==clt.user.id&&msg.content.includes("```"))) {
				if (/\bgays?\b/i.test(msg.content)) {
					msg.react("🏳️‍🌈");
				}
				if (/fu?c?k/i.test(msg.content)) {
					msg.react(["241616161861664778","337759336120057860"].rnd());
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
			msg.reply("```\n!!ping --> command execution delay\n!!pings --> uptime pings\n!!rg text --> converts your speech to emojis\n!!hlp --> shows this screen\n!!sd text --> sends message and deletes after 0.25 seconds\n!!rp [number] text --> repeats text 'number' times\n!!id [mention(s)] --> user's/channel's id\n!!chid --> channel's id\n!!servid --> server's id\n!!shrug --> ¯\\_(ツ)_/¯\n!!lenny --> (͡° ͜ʖ ͡°)\n!!up --> bot uptime\n!!reacting --> check if reaction upvoting is enabled.\n\nbot automatically upvotes reactions...\nDM @ValentinHacker#5509 for disable...\n\n```<https://github.com/ValentinHacker/Vale>");
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
			msg.mentions.users.forEach(usr=>{
				tmp.push(`${usr} : <\\@${usr.id}>`);
			});
			msg.mentions.channels.forEach(chn=>{
				tmp.push(`${chn} : <\\#${chn.id}>`);
			});
			(msg.content.match(/:.+?:/g)||[]).forEach(emj=>{
				emj = "<"+emj+clt.emojis.find("name",emj.replace(/:/g,"")).id+">";
				tmp.push(`${emj} : \`${emj}\``);
			})
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
		} else if (/^!!react(ing)?$/i.test(msg.content)) {
			msg.reply("[Bot] : "+(msg.guild.reactspam?"I react":"I don't react"));
		}
	} catch (a) {
		msg.react("❌");
		msg.channel.send("```js\n" + `${a.lineNumber}, ${a.name}: ${a.message}` + "```");
	}
});
clt.on("messageReactionAdd",(emj,usr)=>{
	if (usr.id!=clt.user.id&&!emj.message.guild) {
		emj.message.react(emj.emoji);
		return;
	}
	try {
		if (!bot.novote.some(val=>val==emj.message.guild.id)) {
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
clt.on("guildMemberAdd",mmb=>{
	var wl = null;
	if (Object.keys(bot.welcome).some(wlc=>mmb.guild.id==(wl=wlc))) {
		mmb.guild.defaultChannel.send(bot.welcome[wl].replace(/\$USER/g,mmb));
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
