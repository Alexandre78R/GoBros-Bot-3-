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
 
  try{
  
    let channelCreateEmbed = new Discord.RichEmbed()
    .setTitle("Log Canal créer :")
    .setColor("#15f153")
    .addField("Nom du canal :", `${channel.name}`)
    .setTimestamp();
   
    let createChannel = channel.guild.channels.find(`name`, "📝log-serveur");
    createChannel.send(channelCreateEmbed);
 
  }catch (e){
   
    let errorChannelCreateEmbed = new Discord.RichEmbed()
    .setTitle("Log Canal créer :")
    .setColor("#15f153")
    .addField("Nom du canal :", `Impossible de récupérer cette information.`)
    .setTimestamp();
   
    let erreurCreateChannel = channel.guild.channels.find(`name`, "📝log-serveur");
    erreurCreateChannel.send(errorChannelCreateEmbed);
    
    }
}); 


client.on("channelDelete", channel => { 
  
    try {
   
    let channelDeleteEmbed = new Discord.RichEmbed()
    .setTitle("Log canal supprimée :")
    .setColor("#15f153")
    .addField("Nom du canal :", `${channel.name}`)
    .setTimestamp();
    
    let deleteChannel = channel.guild.channels.find(`name`, "📝log-serveur");
    deleteChannel.send(channelDeleteEmbed);
 
    }catch (e){
   
    let errorChannelDeleteEmbed = new Discord.RichEmbed()
    .setTitle("Log canal supprimée :")
    .setColor("#15f153")
    .addField("Nom du canal :", `Impossible de récupérer cette information.`)
    .setTimestamp();
    
    let erreurDeleteChannel = channel.guild.channels.find(`name`, "📝log-serveur");
    erreurDeleteChannel.send(errorChannelDeleteEmbed);
    
    }
});

client.on("emojiCreate", emoji => { 
    
    try{
   
    let emojiCreateEmbed = new Discord.RichEmbed()
    .setTitle("Log emoji créer :")
    .setColor("#15f153")
    .addField("Nom de l'Emoji :", `${emoji.name}`)
    .setTimestamp();
    
    let createEmoji = emoji.guild.channels.find(`name`, "📝log-serveur");
    createEmoji.send(emojiCreateEmbed);
   
    }catch (e){
    
    let errorEmojiCreateEmbed = new Discord.RichEmbed()
    .setTitle("Log emoji créer :")
    .setColor("#15f153")
    .addField("Nom de l'Emoji :", `Impossible de récupérer cette information.`)
    .setTimestamp();
   
    let errorCreateEmoji = emoji.guild.channels.find(`name`, "📝log-serveur");
    errorCreateEmoji.send(errorEmojiCreateEmbed);
   
    }
});

client.on("emojiDelete", emoji => { 

    try{

    let emojiDeleteEmbed = new Discord.RichEmbed()
    .setTitle("Log emoji supprimée :")
    .setColor("#15f153")
    .addField("Nom de l'Emoji :", `${emoji.name}`)
    .setTimestamp();
    let deleteEmoji = emoji.guild.channels.find(`name`, "📝log-serveur");
    deleteEmoji.send(emojiDeleteEmbed);

    }catch (e){

    let errorEmojiDeleteEmbed = new Discord.RichEmbed()
    .setTitle("Log emoji supprimée :")
    .setColor("#15f153")
    .addField("Nom de l'Emoji :", `Impossible de récupérer cette information.`)
    .setTimestamp();
    
    let errorDeleteEmoji = emoji.guild.channels.find(`name`, "📝log-serveur");
    errorDeleteEmoji.send(errorEmojiDeleteEmbed);

    }
});

client.on("roleCreate", role => { 

    try{

    let roleCreateEmbed = new Discord.RichEmbed()
    .setTitle("Log rôle créer :")
    .setColor("#15f153")
    .addField("Nom du rôle :", `${role.name}`, true)
    .addField("ID du rôle :", `${role.id}`, true)
    .addField("Coleur du rôle :", `${role.color}`,true)
    .addField("Position du rôle :", `${role.calculatedPosition}`, true)
    .addField("Permissions du rôle :", `${role.permissions}`, true)
    .addField("Rôle memtionabble :", `${role.mentionable}`, true)
    .setTimestamp();
    let deleteRole = role.guild.channels.find(`name`, "📝log-serveur");
    deleteRole.send(roleCreateEmbed);

    }catch (e){

    let errorRoleCreateEmbed = new Discord.RichEmbed()
    .setTitle("Log rôle créer :")
    .setColor("#15f153")
    .addField("Nom du Rôle :", `Impossible de récupérer cette information.`)
    .setTimestamp();
    
    let errorCreateRole = role.guild.channels.find(`name`, "📝log-serveur");
    errorCreateRole.send(errorRoleCreateEmbed);

    }
});

client.on("roleDelete", role => { 

    try{

    let roleDeleteEmbed = new Discord.RichEmbed()
    .setTitle("Log rôle supprimée :")
    .setColor("#15f153")
    .addField("Nom du rôle :", `${role.name}`)
    .setTimestamp();
    let deleteRole = role.guild.channels.find(`name`, "📝log-serveur");
    deleteRole.send(roleDeleteEmbed);

    }catch (e){

    let errorRoleDeleteEmbed = new Discord.RichEmbed()
    .setTitle("Log rôle supprimée :")
    .setColor("#15f153")
    .addField("Nom du Rôle :", `Impossible de récupérer cette information.`)
    .setTimestamp();
    
    let errorDeleteRole = role.guild.channels.find(`name`, "📝log-serveur");
    errorDeleteRole.send(errorRoleDeleteEmbed);

    }
});

client.on("messageDelete", message => { 
    try{

    let messageDeleteEmbed = new Discord.RichEmbed()
    .setTitle("Log Message supprimée :")
    .setColor("#15f153")
    .addField("Message  par :", `${message.author}`)
    .addField("Contenant du message :", `${message.content}`)
    .setTimestamp();

    let deleteMessage = message.guild.channels.find(`name`, "📝log-serveur");
    deleteMessage.send(messageDeleteEmbed);

    } catch (e) {

    let errorMessageDeleteEmbed = new Discord.RichEmbed() 
    .setTitle("Log Message supprimée :")
    .setColor("#15f153")
    .addField("Message :", `Impossible de récupérée à cause de la commande clean ou la structure du message !`)
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