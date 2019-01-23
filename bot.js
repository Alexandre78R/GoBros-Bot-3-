//const rp = require('request-promise');
require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config/config.json');
const cmds = require('./commands/commands.js');
const prompt = require('prompt');
const colors = require('colors'); 
const express = require("express");
const app = express();
const { Client, Util } = require('discord.js');
const { TOKEN, PREFIX, GOOGLE_API_KEY } = require('./config/config');
let cooldown = new Set();
let cdseconds = 5;

app.set('port', (process.env.PORT || 5000))

app.listen(app.get('port'), function(){
    console.log(`Le bot fonctionne sur le port : ${app.get('port')} `);
})

client.commands = new Discord.Collection();
client.on('warn', console.warn);

client.on('error', console.error);

client.on('disconnect', () => console.log('Je viens de me déconnecter, en m\'assurant que vous savez, je vais me reconnecter maintenant'));

client.on('reconnecting', () => console.log('Je reconnecte maintenant !'));

client.on('ready', () => {
  client.user.setPresence({ game: { name: "Je serais disponible demain.", type : "STREAMING", url: "https://www.twitch.tv/go_bros"}});
  client.user.setStatus('offline'); // online (vert) idle (absant) offline (offline)
  console.log(`${client.user.tag} est connecté !`);
 });

client.login("Ahahahah");


client.on('message', msg => {
    if (msg.author.bot || msg.channel.type != 'text')
        return;

    if (!msg.content.startsWith(config.prefix))
        return;

    let cmd = msg.content.split(/\s+/)[0].slice(config.prefix.length).toLowerCase();
    getCmdFunction(cmd)(msg);
}); 

function getCmdFunction(cmd) {
    const COMMANDS = {
        'aide': cmds.aide,
        'clean': cmds.clean,
        'kick': cmds.kick,
        'ban': cmds.ban,
        'reportmembre': cmds.reportmembre,
        'reportbug': cmds.reportbug,
        'serverinfo': cmds.serverinfo,
        'reportprive': cmds.reportprive,
    }
    return COMMANDS[cmd] ? COMMANDS[cmd] : () => {};
}