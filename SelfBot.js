const Discord = require("discord.js");
const fs = require("fs");
const clt = new Discord.Client({disableEveryone:true});
var bot, last, falseReg, nul, rnd, snd, sav, rel, rep;
// falseReg = /^(false|null|""|''|0|off|no|[]|{}|`)$`/gi; (what is this?)
falseReg = /^(false|null|""|''|0|off|no|[]|{}|`)$/gi;
nul = function nul() {}//nul
rnd = function rnd(frm,to,rd) {
	if (!frm) {
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
/*snd = function snd(chan,data) {
	return clt.channels.get(chan+"").send(data);
}; (why are you defining `snd` here? apparently line 87 you did so and you never use the function)*/
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
	return val.filter(function(va){return va});
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
// try to camelCase things when creating methods
Object.prototype.Ins = function() {
	let arr = [];
	for (prp in this) {
		arr.push(prp);
	}
	return arr;
};
Array.prototype.split = function() {
	return this; // what?
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
});
clt.on("message",msg=>{
	try {
		if (/``/.test(msg.content)||bot.ignore.some(val=>val==(msg.guild||msg.channel).id||val==msg.channel.id||val==msg.author.id)) return
		let out;
		// last = msg;
		/*const snd = function snd(chan,data) {
			return clt.channels.find("id",chan+"").send(data.replace(/\$HERE/g,last.channel).replace(/\$ME/g,last.author));
		};*/
		msg.channel.reactspam = bot.reacts.some(val=>val==msg.channel.id);
		if (msg.author.id==clt.user.id) {
			if (/\{.*?\}/gmi.test(msg.content)) {
				msg.edit(msg.content.replace(/\{shru?g?\}/gmi,"¯\\_(ツ)_/¯").replace(/\{lenn?y?\}/gmi,"(͡° ͜ʖ ͡°)").replace(/\{eval (.+?)\}/gmi,(mat,p)=>eval(p)));
			}
		}
		if (out=bot.commands.ins().filter(com=>{return new RegExp("^!!"+com,"i").test(msg.content)})[0]) {
			if (bot.commands[out].public||msg.author.id==clt.user.id) {
				if (eval("("+(bot.commands[out].code||nul)+")(msg)")) {
					return;
				}
			}
		}
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
	} catch (a) {
		console.warn(`${a.lineNumber}, ${a.name}: ${a.message}`);
	}
});
clt.on("messageReactionAdd",(emj,usr)=>{
	if (bot.ignore.some(val=>val==(emj.message.guild||emj.message.channel).id||val==emj.message.channel.id||val==usr.id)) return
	if (bot.vote.some(val=>val==(emj.message.guild||emj.message.channel).id||val==emj.message.channel.id||val==usr.id)) {
		emj.message.react(emj.emoji);
	}
});
clt.on("messageReactionRemove",(emj,usr)=>{
	if (bot.ignore.some(val=>val==(emj.message.guild||emj.message.channel).id||val==emj.message.channel.id||val==usr.id)) return
	if (emj.users.array().length<=1) {
		emj.remove(clt.user);
	}
});
clt.on("guildMemberAdd",mmb=>{
	if (bot.ignore.some(val=>val==mmb.guild.id||val==mmb.user.id)) return
	var wl = null;
	if (Object.keys(bot.welcome).some(wlc=>mmb.guild.id==(wl=wlc))) {
		mmb.guild.defaultChannel.send(bot.welcome[wl].replace(/\$USER/g,mmb));
	}
});
clt.on("messageUpdate",(old,msg)=>{
	if (bot.ignore.some(val=>val==(msg.guild||msg.channel).id||val==msg.channel.id||val==msg.author.id)) return
	if (msg.channel.reactspam&&!(msg.author.id==clt.user.id&&/```/.test(msg.content))) {
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
