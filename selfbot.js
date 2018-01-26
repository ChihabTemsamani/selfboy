try {
auto = "strict";
require("./nodemodule/nodemodule.js");
const Discord = require("discord.js");
const fs = require("fs");
const request = require("request");
const http = require("http");
const cheerio = require("cheerio");
const jimp = require("jimp");
const jsdom = require("jsdom");
const os = require("os");
snd = function snd(chan,data) {
	return clt.channels.find("id",chan+"").send(data);
};
var bots = [];
tkn = [];
tkn.each((tkn,ind)=>{
	let sav = function sav(src) {
		return fs.writeFileSync(src?src:save,JSON.stringify(bot,null,2));
	}//sav
	let rel = function rel(src) {
		return bot = JSON.parse(fs.readFileSync(src?src:save));
	}//rel
	let href = function href(src,dsc) {
		if (src) {
			if (!bot.hooks.some(val=>val.id==src.id)) {
				bot.hooks.push({id:src.id,token:src.token,desc:dsc});
				sav();
				return hooks = bot.hooks.map(hk=>{return new Discord.WebhookClient(hk.id,hk.token,{disableEveryone:true,apiRequestMethod:"sequential",messageCacheLifetime:!ind?500:250,messageSweepInterval:50,sync:true})});
			}
		} else {
			return hooks = bot.hooks.map(hk=>{return new Discord.WebhookClient(hk.id,hk.token,{disableEveryone:true,apiRequestMethod:"sequential",messageCacheLifetime:!ind?500:250,messageSweepInterval:50,sync:true})});
		}
	}//href
	const clt = new Discord.Client({disableEveryone:true,apiRequestMethod:"burst",messageCacheLifetime:!ind?500:250,messageSweepInterval:50}), save = "Bot"+(ind+1)+".json";
	with (clt) {
		var bot, last, cons = "", limit = !ind?5000:2500, stop = false, inter = [], hooks = [];
	}
	clt.on('ready',()=>{
		console.log(`Logged in as ${clt.user.tag}!`);
		try {
			rel();
		} catch(e) {
			fs.writeFileSync("status.txt",clt.user.presence.status);
			fs.writeFileSync("eval.txt",true);
			rel("Prototype.json");
			bot.prefix = "!".repeat(ind);
			sav();
			console.info("Bot"+(ind+1)+" created...");
		}
		clt.user.setPresence(bot.status);
		stats = setInterval(stat=()=>{let tmp=fs.readFileSync("status.txt").toString();if(tmp!=bot.status.status){bot.status.status=tmp;clt.user.setPresence(bot.status)}},5000);
		hooks = bot.hooks.map(hk=>{return new Discord.WebhookClient(hk.id,hk.token,{disableEveryone:true,apiRequestMethod:"sequential",messageCacheLifetime:!ind?100:50,messageSweepInterval:50,sync:true})});
	});
	clt.on("message",async msg=>{
		try {
			if (/```/.test(msg.content)||(bot.ignore.some(val=>val==(msg.guild||msg.channel).id||val==msg.channel.id||val==msg.author.id)&&msg.content!=`${bot.prefix}unignore`)||(clt.stop&&msg.content!=bot.prefix+"start")||os.freemem()/1024/1024<5||process.memoryUsage().heapUsed>process.memoryUsage().heapTotal/1.1) return
			if (msg.guild) {
				if (msg.guild.memberCount>limit) return
			} else {
				msg.guild = {};
			}
			let out;
			last = msg;
			const snd = function snd(chan,data) {
				return clt.channels.find("id",chan+"").send(data.replace(/\$HERE/g,last.channel).replace(/\$ME/g,last.author));
			};
			const user = clt.user;
			msg.channel.reactspam = bot.reacts.includes(msg.channel.id);
			msg.channel.votespam = bot.vote.includes(msg.channel.id);
			msg.channel.allow = bot.allow.includes(msg.channel.id)
			msg.bot = msg.author.id==user.id;
			try {
				var com = msg.content.split(" ")[0].replace(bot.prefix,""),
				comm = msg.content.split(" ").slice(1).join(" "),
				comm2 = [(msg.content.split(" ")[1]||" ").replace(/\\s/gmi," "),msg.content.split(" ").slice(2).join(" ")];
			} catch(ignore) {}
			try {
				var mnts = msg.mentions.users.array(),
				chns = msg.mentions.channels.array(),
				rlss = msg.mentions.roles.array(),
				emjs = (msg.content.match(/:.+?:/g)||[]).map(emj=>clt.emojis.find("name",emj.replace(/:/g,""))),
				cnt = msg.content,
				chn = msg.channel,
				aut = msg.author,
				gld = msg.guild||{};
			} catch (ignore) {}
			if (msg.bot) {
				if(/\{.+?\}/gmi.test(cnt)) {
					let init = msg.content;
					bot.replace.names().filter(val=>{if(new RegExp(val,"gmi").test(cnt)){return true}else{return false}}).each(val=>{
						eval(bot.replace[val]);
					});
					if (init!=msg.content) msg.edit(cnt);
				}
			}
			if (typeof cnt!="string") return
			if (chn.reactspam&&chn.allow&&!(msg.bot&&cnt.contains("```"))) {
				bot.reactwords.names().each(val=>{
					if (new RegExp(val,"gi").test(cnt)) {
						msg.react(bot.reactwords[val].rnd());
					}
				});
			}
			if (!msg.bot&&!chn.allow&&cnt.starts(bot.prefix)) {
				console.info(`${aut.tag} tried to use '${cnt}' of '${user.tag}' in ${(gld.name?gld:chn).name+(gld.name?' : '+chn.name:'')} at ${new Date()}`);
			}
			bot.banwords.each(val=>{
				if (new RegExp("\b"+val+"\b","gmi").test(cnt)) {
					msg.delete();
					if (!msg.bot) return
				}
			});
			if ((!msg.bot&&!chn.allow)||!cnt.starts(bot.prefix)) return
			if (out=bot.commands.names().filter(com=>{return new RegExp("^"+bot.prefix+com,"i").test(cnt)})[0]) {
				if (eval("("+(bot.commands[out]||nul)+")(msg,cnt,chn,aut,gld)")) {
					return;
				}
			}
		} catch (a) {
			console.warn(cons+=`${user.tag}: ${cnt}, ${a.name}: ${a.message}`);
			cons += "\n";
		}
	});
	clt.on("messageReactionAdd",(emj,usr)=>{
		if (bot.ignore.some(val=>val==(emj.message.guild||emj.message.channel).id||val==emj.message.channel.id||val==usr.id)||!bot.allow.includes((emj.message.guild||emj.message.channel).id+"")||(emj.message.guild||{memberCount:1}).memberCount>limit||os.freemem()/1024/1024<10) return
		if ((bot.vote.some(val=>val==(emj.message.guild||emj.message.channel).id||val==emj.message.channel.id||val==usr.id))&&emj.users.array()[0].id!=clt.user.id) {
			emj.message.react(emj.emoji);
		}
	});
	clt.on("messageReactionRemove",(emj,usr)=>{
		if (bot.ignore.some(val=>val==(emj.message.guild||emj.message.channel).id||val==emj.message.channel.id||val==usr.id)||!bot.allow.includes((emj.message.guild||emj.message.channel).id+"")||(emj.message.guild||{memberCount:1}).memberCount>limit||os.freemem()/1024/1024<10) return
		if (emj.users.array().length<=1) {
			emj.remove(clt.user);
		}
	});
	clt.on("guildMemberAdd",mmb=>{
		try {
			if (!bot.ignore.some(val=>val==mmb.guild.id||val==mmb.user.id)&&bot.allow.includes(mmb.guild.id+"")&&(mmb.guild||{memberCount:1}).memberCount<=limit&&os.freemem()/1024/1024>=10) {
				mmb.guild.channels.array().each(chn=>{
					if (chn.id in bot.welcome) {
						chn.send(bot.welcome[chn.id].replace(/\$USER/g,mmb).replace(/\$GUILD/g,mmb.guild.name));
					}
				});
			}
		} catch (a) {
			console.warn(`${clt.user.tag}, ${a.name}: ${a.message}`);
		}
	});
	clt.on("guildMemberRemove",mmb=>{
		try {
			if (!bot.ignore.some(val=>val==mmb.guild.id||val==mmb.user.id)&&bot.allow.includes(mmb.guild.id+"")&&(mmb.guild||{memberCount:1}).memberCount<=limit&&os.freemem()/1024/1024>=10) {
				mmb.guild.channels.array().each(chn=>{
					if (chn.id in bot.goodbye) {
						chn.send(bot.goodbye[chn.id].replace(/\$USER/g,mmb.user.username).replace(/\$GUILD/g,mmb.guild.name));
					}
				});
			}
		} catch (a) {
			console.warn(`${clt.user.tag}, ${a.name}: ${a.message}`);
		}
	});
	clt.on("messageUpdate",(old,msg)=>{
		if (!msg.content.includes) return
		if (msg.author.id==clt.user.id) {
			if(/\{.+?\}/gmi.test(msg.content)) {
				let init = msg.content;
				bot.replace.ins().filter(val=>{if(new RegExp(val,"gmi").test(msg.content)){return true}else{return false}}).each(val=>{
					eval(bot.replace[val]);
				});
				if (init!=msg.content) msg.edit(msg.content);
			}
		}
		if (bot.ignore.some(val=>val==(msg.guild||msg.channel).id||val==msg.channel.id||val==msg.author.id)||!bot.allow.includes(msg.channel.id+"")||(old.guild||{memberCount:1}).memberCount>limit||os.freemem()/1024/1024<10) return
		if (msg.channel.reactspam&&!(msg.author.id==clt.user.id&&msg.content.includes("```"))) {
			bot.reactwords.ins().each(val=>{
				if (new RegExp(val,"gi").test(msg.content)) {
					msg.react(bot.reactwords[val].rnd());
				}
			});
		}
		bot.banwords.each(val=>{
			if (new RegExp(val,"gi").test(msg.content)) {
				msg.delete();
				return;
			}
		});
	});
	clt.on("guildMemberUpdate",(old,nw)=>{
		if (bot.ignore.some(val=>val==(old.guild||old.user).id||val==old.user.id)||!bot.allow.includes(old.guild.id+"")||(old.guild||{memberCount:1}).memberCount>limit||os.freemem()/1024/1024<10) return
		if (old.user.id==clt.user.id&&old.nickname!=nw.nickname) {
			nw.setNickname(old.nickname);
		}
	});
	clt.on("disconnect",evt=>{
		clt.login(clt.token);
	});
	clt.on("error",err=>{
		console.warn(cons+=`${clt.user.tag}, ${err.name}: ${err.message}`);
		clt.destroy().then(()=>clt.login(clt.token));
	});
	clt.login(tkn);
	bots.push(clt);
});
async function get(url) {
	return new Promise((rsl,rej)=> {
		http.get(url,res=> {
			const {statusCode} = res;
			const contentType = res.headers["content-type"];
			let error;
			if (statusCode!=200) {
    			error = new Error(`Request Failed.\nStatus Code: ${statusCode}`);
			}
			if (error) {
    			console.warn(error.message);
    			res.resume();
    			rej("\n"+error);
    			return;
			}
			res.setEncoding('utf8');
			let dat = '';
			res.on('data',chn=>{dat += chn;});
			res.on('end',()=> {
   	 		rsl(dat);
			});
		}).on('error',e=> {
			console.error(`${clt.user.tag}, Got error: ${e.message}`);
			rej(e);
		});
	});
}//get
async function img(txt) {
	return new Promise((rsl,rjc)=>{
		new jimp(txt.length*20,(txt.split(" ").length||1)*30+60,0xFFFFFFFF,(err,img)=>{
			jimp.loadFont(jimp.FONT_SANS_32_BLACK).then(font=>{
				img.print(font,5,30,txt,txt.length*15,(err,img)=>{
					img.write(`./${txt}.png`,(err,img)=>{
						rsl(img);
					});
				});
			});
		});
	});
}//img
async function web(url,fun,opt) {
	return jsdom.JSDOM.fromURL(url,opt).then(fun);
}//web
async function download(url,dest="") {
  var file = fs.createWriteStream(dest);
  return new Promise((rsl,rjc)=>{
	  var request = http.get(url, function(response) {
 	   response.pipe(file);
  	  file.on('finish', function() {
    	  file.close(()=>rsl(file));
  	  });
	  });
  });
}
} catch(a) {console.error(a)}
