//const rp = require('request-promise');
require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config/config.json');
const cmds = require('./commands/commands.js');
const cmds_admin = require('./commands/commands_admin.js');
const prompt = require('prompt');
const colors = require('colors'); 
const express = require("express");
const app = express();
const stripIndent = require('strip-indent');
const os = require('os');
const { Client, Util } = require('discord.js');
let cooldown = new Set();
let cdseconds = 5;

app.set('port', (process.env.PORT || Math.floor(Math.random() * Math.floor(5000))))

app.listen(app.get('port'), function(){
    console.log(`Le bot fonctionne sur le port : ${app.get('port')} `);
})

client.commands = new Discord.Collection();
client.on('warn', console.warn);

client.on('error', console.error);

client.on('disconnect', () => console.log('Je viens de me déconnecter, en m\'assurant que vous savez, je vais me reconnecter maintenant'));

client.on('reconnecting', () => console.log('Je reconnecte maintenant !'));

client.on('ready', () => {
  client.user.setPresence({ game: { name: "En développement By Alexandre78R", type : "STREAMING", url: "https://www.twitch.tv/go_bros"}});
  client.user.setStatus('offline'); // online (vert) idle (absant) offline (offline)
  console.log(`${client.user.tag} est connecté !`);
 });

client.login("");

client.on('guildMemberAdd', member => {
  member.guild.channels.find("name", "🎉bienvenue").send(`Hey ${member.user}, bienvenue sur le serveur de ${member.guild.name} :hugging: !`)
  member.createDM().then(channel => {
  return channel.send(` 
    Hey ${member.user},

Bienvenue sur le serveur de ${member.guild.name}:tada::hugging:!
Pour accéder à la totalité du serveur merci de lire le règlement qui se trouve dans la section " :scroll:règlement  " et de mentionner avec la réaction : :100:.
Pour voir les autres catégorie de jeux allez dans la section " :necktie:addrole " pour récupérer les rôles des jeux.

Cordialement, 

L'équipe du discord de ${member.guild.name}.`)

  }).catch(console.error);
  });

client.on('message', msg => {
    if (msg.author.bot || msg.channel.type != 'text')
        return;

    if (!msg.content.startsWith(config.prefix))
        return;

    let cmd = msg.content.split(/\s+/)[0].slice(config.prefix.length).toLowerCase();
    getCmdFunction(cmd)(msg);
});

client.on("channelCreate", channel => { 
    let channelCreateEmbed = new Discord.RichEmbed()
    .setDescription("Log Canal créer :")
    .setColor("#15f153")
    .addField("Nom du canal :", `${channel.name}`)
    .setTimestamp();
    let createChannel = channel.guild.channels.find(`name`, "📝log-serveur");
    createChannel.send(channelCreateEmbed);
});


client.on("channelDelete", channel => { 
    let channelDeleteEmbed = new Discord.RichEmbed()
    .setDescription("Log Canal supprimée :")
    .setColor("#15f153")
    .addField("Nom du canal :", `${channel.name}`)
    .setTimestamp();
    let deleteChannel = channel.guild.channels.find(`name`, "📝log-serveur");
    deleteChannel.send(channelDeleteEmbed);
});

client.on("emojiCreate", emoji => { 
    let emojiCreateEmbed = new Discord.RichEmbed()
    .setDescription("Log Emoji créer :")
    .setColor("#15f153")
    .addField("Nom de l'Emoji :", `${emoji.name}`)
    .setTimestamp();
    let createEmoji = emoji.guild.channels.find(`name`, "📝log-serveur");
    createEmoji.send(emojiCreateEmbed);
});

client.on("emojiDelete", emoji => { 
    let emojiDeleteEmbed = new Discord.RichEmbed()
    .setDescription("Log Emoji supprimée :")
    .setColor("#15f153")
    .addField("Nom de l'Emoji :", `${emoji.name}`)
    .setTimestamp();
    let deleteEmoji = emoji.guild.channels.find(`name`, "📝log-serveur");
    deleteEmoji.send(emojiDeleteEmbed);
});

client.on("messageDelete", message => { 
    try{
    let messageDeleteEmbed = new Discord.RichEmbed()
    .setDescription("Log Message supprimée :")
    .setColor("#15f153")
    .addField("Message  par :", `${message.author}`)
    .addField("Contenant du message :", `${message.content}`)
    .setTimestamp();
    let deleteMessage = message.guild.channels.find(`name`, "📝log-serveur");
    deleteMessage.send(messageDeleteEmbed);
    } catch (e) {
    let errorMessageDeleteEmbed = new Discord.RichEmbed() 
    .setDescription("Log Rôle Créer :")
    .setColor("#15f153")
    .addField("Message :", `Impssible de récupérée à cause de la commande clean !`)
    .setTimestamp();
    let errorMessageDeletechannel = message.guild.channels.find(`name`, "📝log-serveur");
    errorMessageDeletechannel.send(errorMessageDeleteEmbed);
  }
});


function getCmdFunction(cmd) {
    const COMMANDS = {
        'aide': cmds.aide,
        'aide_modo': cmds_admin.aide_modo,
        'clean': cmds_admin.clean,
        'kick': cmds_admin.kick,
        'ban': cmds_admin.ban,
        'reportmembre': cmds.reportmembre,
        'reportbug': cmds.reportbug,
        'serverinfo': cmds.serverinfo,
        'jeux': cmds.jeux,
        'mascotte': cmds.mascotte,
        'reactaddrole': cmds_admin.reactaddrole,
        'cmdsaidee': cmds.cmdsaidee,
        'aide_cmd': cmds.aide_cmd,
        'addrole': cmds_admin.addrole,
        'delrole': cmds_admin.delrole,
    }
    return COMMANDS[cmd] ? COMMANDS[cmd] : () => {};
}