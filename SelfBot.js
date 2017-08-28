const Discord = require("discord.js");
const fs = require("fs");
const clt = new Discord.Client({disableEveryone:true});
var bot, last;
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
function rep(cnt,com,ini) {
	var val = [];
	for (var stp = (ini?ini:0); stp < cnt+(ini?ini:0); stp++) {
		if (typeof com=="string") {
			val.push(eval(com.replace(/@(?!\\(?!\\))/gmi,stp).replace(/\\(?!\\(?!\\))/gmi,"")));
		} else {
			val.push(com(stp));
		}
	}
	return val.filter(function(va){return va!==undefined;});
}//rep
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
String.prototype.rnd = function() {
	return this.toString();
};
Object.prototype.ins = function() {
	return Object.keys(this);
};
Array.prototype.split = function() {
	return this;
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
					msg.channel.send("*Bot shutdown...*").then(()=>clt.destroy()).then(process.exit).catch(process.exit);
				}
			} else if (/^!!sd /gmi.test(msg.content)) {
				msg.channel.send(msg.content.replace(/^!!sd /i,"")).then(msg=>msg.delete(2500).catch(function(){})).catch(function(){});
				msg.delete();
				return;
			} else if (/^!!eval /i.test(msg.content)) {
				msg.channel.send("```js\n"+eval(msg.content.replace(/^!!eval /i, ""))+"```");
				msg.react('✅');
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
				clt.user.setAFK(bot.status.afk=!/^(false|undefined|null|0|""|'')$/.test(msg.content.replace(/^!!afk /i,"")));
				clt.user.setPresence(bot.status);
				msg.reply(`you are ${bot.status.afk?"":"not "}away from keyboard`);
			} else if (/^!!game .*?/i.test(msg.content)) {
				clt.user.setGame(bot.status.game.name=msg.content.replace(/^!!game /i, ""));
				clt.user.setPresence(bot.status);
				msg.delete();
			} else if (/^!!reac(t|c)?$/i.test(msg.content)&&msg.guild) {
				msg.guild.reactspam = msg.guild.reactspam?false:true;
				if (!/t/i.test(msg.content)) msg.delete(100)
			} else if (/^!!bots?$/i.test(msg.content)) {
				last = msg;
				eval(bot.command.replace(/\$SERV/g,(last.guild||{id:0}).id+"").replace(/\$CHAN/g,(last.channel.id||"0")+"").replace(/\$AUTH/g,last.author.id+""));
				msg.delete();
			} else if (/^!!commadd !!.+? .+?$/i.test(msg.content)) {
				bot.customCommands[msg.content.split(" ")[1]] = msg.content.split(" ").slice(2).join(" ");
				fs.writeFile("Bot.json",JSON.stringify(bot));
				msg.delete();
			} else if (/^!!comadds$/i.test(msg.content)) {
				msg.channel.send("```js\n"+bot.customCommands.ins().join(", ")+"```");
				return;
			} else if (out=bot.customCommands[(msg.content.match(/^.+?(?=( |$))/i)||[undefined])[0]]) {
				eval(out.code);
			} else if (/^!!commrem !!.+?$/i.test(msg.content)) {
				delete bot.customCommands[msg.content.split(" ").slice(1)];
				fs.writeFile("Bot.json",JSON.stringify(bot));
				msg.delete();
			} else if (/^!!novote$/i.test(msg.content)) {
				if (!bot.novote.some(cnt=>msg.guild.id==cnt)) {
					bot.novote.push(msg.guild.id*1);
				}
				fs.writeFile("Bot.json",JSON.stringify(bot));
				msg.delete();
			} else if (/^!!vote$/i.test(msg.content)) {
				bot.novote.rmv(msg.guild.id+"");
				fs.writeFile("Bot.json",JSON.stringify(bot));
				msg.delete();
			} else if (/^!!(purge?|prune?) \d{1,3}$/i.test(msg.content)) {
				msg.channel.fetchMessages({limit:Number(msg.content.split(" ")[1]||1)+1}).then(Msg=>Msg.array().forEach(msg=>msg.delete()));
			} else if (/^!!rel(oad)?$/i.test(msg.content)) {
				bot = JSON.parse(fs.readFileSync("Bot.json"));
				msg.delete();
			} else if (/^!!save?$/i.test(msg.content)) {
				fs.writeFile("Bot.json",JSON.stringify(bot));
				msg.delete();
			} else if (/^!!banword .+?$/i.test(msg.content)) {
				let wrd = msg.content.split(" ").slice(1).join(" ");
				if (!bot.banwords.some(cnt=>wrd==cnt)) {
					bot.banwords.push(wrd);
					fs.writeFile("Bot.json",JSON.stringify(bot));
					msg.delete();
				}
			} else if (/^!!react(ion|word) .+? .+?$/i.test(msg.content)) {
				let wrd = msg.content.split(" ").slice(2).join(" ");
				let rea = msg.content.split(" ")[1];
				if (!bot.reactwords.ins().some(cnt=>wrd==cnt)) {
					bot.reactwords[wrd] = rea;
					fs.writeFile("Bot.json",JSON.stringify(bot));
					msg.delete();
				}
			}
		}
		if (msg.guild) {
			if (msg.guild.reactspam&&!(msg.author.id==clt.user.id&&msg.content.includes("```"))) {
				bot.reactwords.ins().forEach(val=>{
					if (new RegExp(val,"gi").test(msg.content)) {
						msg.react(bot.reactwords[val].rnd());
					}
				});
			}
		} else {
			bot.reactwords.ins().forEach(val=>{
				if (new RegExp(val,"gi").test(msg.content)) {
					msg.react(bot.reactwords[val].rnd());
				}
			});
		}
		bot.banwords.forEach(val=>{
			if (new RegExp(val,"gi").test(msg.content)) {
				msg.delete();
				return;
			}
		});
		if (/^!!ping$/i.test(msg.content)) {
			msg.reply(`Pong! ${clt.ping}ms`);
		} else if (/^!!pings$/i.test(msg.content)) {
			msg.reply(`Pongs! ${clt.pings.toString()}`);
		} else if (/^!!rg .+?/i.test(msg.content)) {
			msg.reply(msg.content.replace(/^!!rg /i,"").split("").map(val=>{
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
			msg.reply("```\n!!ping --> command execution delay\n!!pings --> uptime pings\n!!rg text --> converts your speech to emojis\n!!hlp --> shows this screen\n!!sd text --> sends message and deletes after 0.25 seconds\n!!rp [number] text --> repeats text 'number' times\n!!id [mention(s)] --> user's/channel's id\n!!chid --> channel's id\n!!servid --> server's id\n!!shrug --> ¯\\_(ツ)_/¯\n!!lenny --> (͡° ͜ʖ ͡°)\n!!up --> bot uptime\n!!reacting --> check if reaction upvoting is enabled\n!!comadds --> check custom public commands.\n\nbot automatically upvotes reactions...\nDM @ValentinHacker#5509 for disable...\n\n```<https://github.com/ValentinHacker/Vale>");
		} else if (/^!!sd /gmi.test(msg.content)) {
			msg.reply(msg.content.replace(/^!!sd /i,"")).then(msg=>msg.delete(2500));
			msg.delete();
		} else if (/^!!rp \d{1,2} /i.test(msg.content)) {
			let rep = (msg.content.split(" ")[1]||1) * 1
			let dt = msg.content.split(" ").slice(2).join(" ");
			if (!dt) return
			msg.delete();
			for (var stp = 0; stp < rep; stp++) {
				msg.reply(dt);
			}
			return;
		} else if (/^!!rp .+/i.test(msg.content)) {
			msg.reply(msg.content.split(" ").slice(1).join(" "));
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
				emj = clt.emojis.find("name",emj.replace(/:/g,""))||emj;
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
		} else if (/^!!react(ing?)?$/i.test(msg.content)) {
			msg.reply("[Bot] : "+(msg.guild.reactspam?"I react! ^_^":"I'm not reacting! >.<"));
		} else if (out=bot.customCommands[(msg.content.match(/^.+?(?=( |$))/i)||[undefined])[0]]) {
			if (out.public) {
				eval(out.code);
			}
		} else if (/^!!comadds$/i.test(msg.content)) {
			msg.reply("```js\n"+(Object.keys(bot.customCommands).filter(com=>bot.customCommands[com].public).join(", "))+"```");
		}
	} catch (a) {
		msg.react('❌');
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
clt.on("messageUpdate",(old,msg)=>{
	if (msg.guild) {
		if (msg.guild.reactspam&&!(msg.author.id==clt.user.id&&msg.content.includes("```"))) {
			bot.reactwords.ins().forEach(val=>{
				if (new RegExp(val,"gi").test(msg.content)) {
					msg.react(bot.reactwords[val].rnd());
				}
			});
		}
	} else {
		bot.reactwords.ins().forEach(val=>{
			if (new RegExp(val,"gi").test(msg.content)) {
				msg.react(bot.reactwords[val].rnd());
			}
		});
	}
	bot.banwords.forEach(val=>{
		if (new RegExp(val,"gi").test(msg.content)) {
			msg.delete();
			return;
		}
	});
});
clt.on("disconnect",evt=>{
	clt.login(tkn);
});
tkn = null;
clt.login(tkn);
