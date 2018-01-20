try {
auto = "strict";
require("./node_modules/nodemodule/nodemodule.js");
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
//ADD TOKEN(S) HERE
tkn.forEach((tkn,ind)=>{
    let sav = function sav(src) {
        return fs.writeFile(src?src:save,JSON.stringify(bot,null,2),()=>{});
    }//sav
    let rel = function rel(src) {
        return bot = JSON.parse(fs.readFileSync(src?src:save));
    }//rel
    let href = function href(src,dsc) {
        if (src) {
            if (!bot.hooks.some(val=>val.id==src.id)) {
                bot.hooks.push({id:src.id,token:src.token,desc:dsc});
                sav();
                return hooks = bot.hooks.map(hk=>{return new Discord.WebhookClient(hk.id,hk.token,{disableEveryone:true,apiRequestMethod:"sequential",messageCacheLifetime:!ind?100:50,messageSweepInterval:50,sync:true})});
            }
        } else {
            return hooks = bot.hooks.map(hk=>{return new Discord.WebhookClient(hk.id,hk.token,{disableEveryone:true,apiRequestMethod:"sequential",messageCacheLifetime:!ind?100:50,messageSweepInterval:50,sync:true})});
        }
    }//href
    const clt = new Discord.Client({disableEveryone:true,apiRequestMethod:"burst",messageCacheLifetime:!ind?100:50,messageSweepInterval:50}), save = "Bot"+(ind?ind+1:'')+".json";
    with (clt) {
        var bot, last, cons = "", limit = !ind?800:300, stop = false, inter = [], hooks = [];
    }
    clt.on('ready',()=>{
        console.log(`Logged in as ${clt.user.tag}!`);
        try {
            rel();
        } catch(e) {
            fs.writeFileSync("status.txt",clt.user.presence.status);
            fs.writeFileSync("eval.txt",true);
            fs.writeFileSync(save,JSON.stringify({prefix:"!!",status:clt.user.presence.Ins(),reacts:[],ignore:[],vote:[],allow:[],banwords:[],notes:[],intervals:[],hooks:[],replace:{},welcome:{},goodbye:{},commands:{}},null,2));
            console.info("Data files created...");
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
            let out, chn = msg.channel, gld = msg.guild;
            last = msg;
            const snd = function snd(chan,data) {
                return clt.channels.find("id",chan+"").send(data.replace(/\$HERE/g,last.channel).replace(/\$ME/g,last.author));
            };
            msg.channel.reactspam = bot.reacts.has(msg.channel.id+"");
            msg.channel.votespam = bot.vote.has(msg.channel.id+"");
            msg.bot = msg.author.id==clt.user.id;
            if (msg.bot) {
                if(/\{.+?\}/gmi.test(msg.content)) {
                    let init = msg.content;
                    bot.replace.ins().filter(val=>{if(new RegExp(val,"gmi").test(msg.content)){return true}else{return false}}).forEach(val=>{
                        eval(bot.replace[val]);
                    });
                    if (init!=msg.content) msg.edit(msg.content);
                }
            }
            if (typeof msg.content!="string") return
            if (msg.channel.reactspam&&msg.channel.allow&&!(msg.author.id==clt.user.id&&msg.content.includes("```"))) {
                bot.reactwords.ins().forEach(val=>{
                    if (new RegExp(val,"gi").test(msg.content)) {
                        msg.react(bot.reactwords[val].rnd());
                    }
                });
            }
            if (!msg.bot&&!msg.channel.allow&&msg.content.startsWith(bot.prefix)) {
                console.info(`${msg.author.tag} tried to use '${msg.content}' of '${clt.user.tag}' in ${(msg.guild||msg.channel).name+(msg.guild.name?' : '+msg.channel.name:'')} at ${new Date()}`);
            }
            if ((!msg.bot&&!msg.channel.allow)||!msg.content.startsWith(bot.prefix)) return
            bot.banwords.forEach(val=>{
                if (new RegExp("\b"+val+"\b","gmi").test(msg.content)) {
                    msg.delete();
                    if (!msg.bot) return
                }
            });
            if (out=bot.commands.ins().filter(com=>{return new RegExp("^"+bot.prefix+com,"i").test(msg.content)})[0]) {
                if (eval("("+(bot.commands[out]||nul)+")(msg,msg.content,msg.channel,msg.author,msg.guild)")) {
                    return;
                }
            }
        } catch (a) {
            console.warn(cons+=`${clt.user.tag}: ${msg.content}, ${a.name}: ${a.message}`);
            cons += "\n";
        }
    });
    if (!ind) {
    clt.on("messageReactionAdd",(emj,usr)=>{
        if (bot.ignore.some(val=>val==(emj.message.guild||emj.message.channel).id||val==emj.message.channel.id||val==usr.id)||!bot.allow.has((emj.message.guild||emj.message.channel).id+"")||(emj.message.guild||{memberCount:1}).memberCount>limit||os.freemem()/1024/1024<10) return
        if ((bot.vote.some(val=>val==(emj.message.guild||emj.message.channel).id||val==emj.message.channel.id||val==usr.id))&&emj.users.array()[0].id!=clt.user.id) {
            emj.message.react(emj.emoji);
        }
    });
    clt.on("messageReactionRemove",(emj,usr)=>{
        if (bot.ignore.some(val=>val==(emj.message.guild||emj.message.channel).id||val==emj.message.channel.id||val==usr.id)||!bot.allow.has((emj.message.guild||emj.message.channel).id+"")||(emj.message.guild||{memberCount:1}).memberCount>limit||os.freemem()/1024/1024<10) return
        if (emj.users.array().length<=1) {
            emj.remove(clt.user);
        }
    });
    clt.on("guildMemberAdd",mmb=>{
        try {
            if (!bot.ignore.some(val=>val==mmb.guild.id||val==mmb.user.id)&&bot.allow.has(mmb.guild.id+"")&&(mmb.guild||{memberCount:1}).memberCount<=limit&&os.freemem()/1024/1024>=10) {
                mmb.guild.channels.array().forEach(chn=>{
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
            if (!bot.ignore.some(val=>val==mmb.guild.id||val==mmb.user.id)&&bot.allow.has(mmb.guild.id+"")&&(mmb.guild||{memberCount:1}).memberCount<=limit&&os.freemem()/1024/1024>=10) {
                mmb.guild.channels.array().forEach(chn=>{
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
        if (msg.author.id==clt.user.id) {
            if(/\{.+?\}/gmi.test(msg.content)) {
                let init = msg.content;
                bot.replace.ins().filter(val=>{if(new RegExp(val,"gmi").test(msg.content)){return true}else{return false}}).forEach(val=>{
                    eval(bot.replace[val]);
                });
                if (init!=msg.content) msg.edit(msg.content);
            }
        }
        if (bot.ignore.some(val=>val==(msg.guild||msg.channel).id||val==msg.channel.id||val==msg.author.id)||!bot.allow.has(msg.channel.id+"")||(old.guild||{memberCount:1}).memberCount>limit||os.freemem()/1024/1024<10) return
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
        clt.login(clt.token);
    });
    }
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
} catch(a) {console.error(a)}
