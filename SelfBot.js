const Discord = require("discord.js");
const fs = require("fs");
const clt = new Discord.Client({disableEveryone:true});
var bot, last;
allow = false; //this converts selfbot to userbot, use wisely
falseReg = /^(false|null|""|''|0|off|no|[]|{}|``|)$/gi;
nul = function nul() {}//nul
rnd = function rnd(frm,to,rd) {
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
snd = function snd(chan,data) {
	return clt.channels.find("id",chan+"").send(data);
};
sav = function sav() {
	fs.writeFileSync("Bot.json",JSON.stringify(bot));
}//sav
rel = function rel() {
	bot = JSON.parse(fs.readFileSync("Bot.json"));
}//rel
rep = function rep(cnt,com,ini) {
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
alt = function alt(bool) {
	return !Boolean(bool);
}//alt
Object.prototype.alt = function() {
	return alt(this);
};
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
Object.prototype.Ins = function() {
	let arr = [];
	for (prp in this) {
		arr.push(prp);
	}
	return arr;
};
Array.prototype.split = function() {
	return this;
};
Array.prototype.rmv = String.prototype.rmv = function(elm) {
	var arr = this.split("");
	if (typeof elm!="number"&&this.indexOf(elm)<0) {
		return this;
	}
	arr.splice(typeof elm=="number"?elm:this.indexOf(elm),1);
	if (this instanceof String) {
		return arr.join("");
	}
	return arr;
};
clt.on('ready',()=>{
	console.log(`Logged in as ${clt.user.tag}!`);
	bot = JSON.parse(fs.readFileSync("Bot.json"));
	clt.user.setPresence(bot.status);
	setInterval(()=>{let tmp=fs.readFileSync("status.txt").toString();if(tmp!=bot.status.status){bot.status.status=tmp;clt.user.setPresence(bot.status)}},5000);
});
clt.on("message",msg=>{
	try {
		if (/``/.test(msg.content)||bot.ignore.some(val=>val==(msg.guild||msg.channel).id||val==msg.channel.id||val==msg.author.id)) return
		if (msg.guild) {
			if (msg.guild.memberCount>=2000) return
		}
		let out;
		last = msg;
		const snd = function snd(chan,data) {
			return clt.channels.find("id",chan+"").send(data.replace(/\$HERE/g,last.channel).replace(/\$ME/g,last.author));
		};
		msg.channel.reactspam = bot.reacts.some(val=>val==msg.channel.id);
		msg.channel.votespam = bot.vote.some(val=>val==msg.channel.id);
		if (msg.author.id==clt.user.id) {
			if(/\{.+?\}/gmi.test(msg.content)) {
				let init = msg.content;
				bot.replace.ins().filter(val=>{if(new RegExp(val,"gmi").test(msg.content)){return true}else{return false}}).forEach(val=>{
					eval(bot.replace[val]);
				});
				if (init!=msg.content) msg.edit(msg.content);
			}
		}
		if (msg.channel.reactspam&&allow&&!(msg.author.id==clt.user.id&&msg.content.includes("```"))) {
			bot.reactwords.ins().forEach(val=>{
				if (new RegExp(val,"gi").test(msg.content)) {
					msg.react(bot.reactwords[val].rnd());
				}
			});
		}
		if ((msg.author.id!=clt.user.id&&!allow)||!msg.content.startsWith(bot.prefix)) return
		bot.banwords.forEach(val=>{
			if (new RegExp(val,"gi").test(msg.content)) {
				msg.delete();
				if(clt.user.id!=msg.author.id)return
			}
		});
		if (out=bot.commands.ins().filter(com=>{return new RegExp("^!!"+com,"i").test(msg.content)})[0]) {
			if (eval("("+(bot.commands[out]||nul)+")(msg)")) {
				return;
			}
		}
	} catch (a) {
		console.warn(`${a.lineNumber}, ${a.name}: ${a.message}`);
	}
});
clt.on("messageReactionAdd",(emj,usr)=>{
	if (bot.ignore.some(val=>val==(emj.message.guild||emj.message.channel).id||val==emj.message.channel.id||val==usr.id)||!allow) return
	if (bot.vote.some(val=>val==(emj.message.guild||emj.message.channel).id||val==emj.message.channel.id||val==usr.id)) {
		emj.message.react(emj.emoji);
	}
});
clt.on("messageReactionRemove",(emj,usr)=>{
	if (bot.ignore.some(val=>val==(emj.message.guild||emj.message.channel).id||val==emj.message.channel.id||val==usr.id)||!allow) return
	if (emj.users.array().length<=1) {
		emj.remove(clt.user);
	}
});
clt.on("guildMemberAdd",mmb=>{
	try {
		if (!bot.ignore.some(val=>val==mmb.guild.id||val==mmb.user.id)&&allow) {
			mmb.guild.channels.array().forEach(chn=>{
				if (chn.id in bot.welcome) {
					chn.send(bot.welcome[chn.id].replace(/\$USER/g,mmb).replace(/\$GUILD/g,mmb.guild.name));
				}
			});
		}
	} catch (a) {
		console.warn(`${a.lineNumber}, ${a.name}: ${a.message}`);
	}
});
clt.on("guildMemberRemove",mmb=>{
	try {
		if (!bot.ignore.some(val=>val==mmb.guild.id||val==mmb.user.id)&&allow) {
			mmb.guild.channels.array().forEach(chn=>{
				if (chn.id in bot.goodbye) {
					chn.send(bot.goodbye[chn.id].replace(/\$USER/g,mmb.user.username).replace(/\$GUILD/g,mmb.guild.name));
				}
			});
		}
	} catch (a) {
		console.warn(`${a.lineNumber}, ${a.name}: ${a.message}`);
	}
});
clt.on("messageUpdate",(old,msg)=>{
	if (bot.ignore.some(val=>val==(msg.guild||msg.channel).id||val==msg.channel.id||val==msg.author.id)||!allow) return
	if (msg.channel.reactspam&&!(msg.author.id==clt.user.id&&msg.content.includes("```"))) {
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
