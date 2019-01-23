
const config = require('../config/config.json');
const commandHelp = require('./help.js');
const nameconsole = require('../utils/generate').name();
const aideconsole = require('../utils/generate').aide();
const kickconsole = require('../utils/generate').kick();
const banconsole = require('../utils/generate').ban();
const reportmconsole = require('../utils/generate').reportm();
const reportbconsole = require('../utils/generate').reportb();
const serverconsole = require('../utils/generate').server();
//const rp = require('request-promise');
const stripIndent = require('strip-indent');
const os = require('os');
const Discord = require("discord.js");


module.exports = {
    'aide': aide,
    'clean': clean,
    'kick': kick,
    'ban': ban,
    'reportmembre': reportmembre,
    'reportbug': reportbug,
    'serverinfo': serverinfo,
    'reportprive': reportprive,
} 

function aide (message) {

 if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

       if (message.length == 1){
           if (message[0].charAt(0) == config.prefix) 
               message[0] = message[0].slice(1);

      }
    let aideembed = new Discord.RichEmbed()
    .setColor("#15f153")
    //.setThumbnail(sicon)
    .addField("aide", "Voir les commandes du bot.")
    .addField("reportmembre", "Report d'un membre du serveur // EX : !reportmembre @nom_de_la_personne_a_signaler message.")
    .addField("reportbug", "Report un bug sur le discord ou sur le bot // EX : !reportbug @votrenom message.")
    .addField("serverinfo", "Indique les informations du serveur.")

    message.channel.send(aideembed);

    return;

} 

function aide_modo (message) {

 if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

       if (message.length == 1){
           if (message[0].charAt(0) == config.prefix) 
               message[0] = message[0].slice(1);

      }
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Impossible de trouver l'utilisateur !");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Impossible");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Cette personne ne peut pas être kick !");

    let aideembed = new Discord.RichEmbed()
    .setColor("#15f153")
    //.setThumbnail(sicon)
    .addField("aide", "Voir les commandes du bot.")
    .addField("reportmembre", "Report d'un membre du serveur // EX : !reportmembre @nom_de_la_personne_a_signaler message.")
    .addField("reportbug", "Report un bug sur le discord ou sur le bot // EX : !reportbug @votrenom message.")
    .addField("serverinfo", "Indique les informations du serveur.")

    message.channel.send(aideembed);

    return;

} 
/*
function aide(msg) {
    let args = msg.content.split(/\s+/).slice(1);

    let helpStr;
    if (args.length == 1) { 
        if (args[0].charAt(0) == config.prefix) 
            args[0] = args[0].slice(1);
        helpStr = commandHelp[args[0]];
    }

    if (helpStr) 
        msg.channel.send(helpStr, {
            'code': 'css'
        });
    else 
        msg.channel.send(stripIndent(
            `
            [Menu des commandes du bot]

               !aide                  : Voir les commandes du bot
               !reportmembre          : Report d'un membre du serveur // EX : !reportmembre @nom_de_la_personne_a_signaler message
               !reportbug             : Report un bug sur le discord ou sur le bot // EX : !reportbug @votrenom message
               !serverinfo            : Indique les informations du serveur.

            `
        ), {
            'code': 'css'
        });
} 
*/

function clean(message) {
       if (message.length == 1){
           if (message[0].charAt(0) == config.prefix) 
               message[0] = message[0].slice(1);

      }    
       if (!message.channel.permissionsFor(message.author).hasPermission("MANAGE_MESSAGES")) {
        message.channel.sendMessage("Désolé, vous n'avez pas la permission d'exécuter la commande \""+message.content+"\"");
        console.log("Désolé, vous n'avez pas la permission d'exécuter la commande \""+message.content+"\"");
        return;
      }

      if (message.channel.type == 'text') {
        message.channel.fetchMessages()
          .then(messages => {
            message.channel.bulkDelete(messages);
            messagesDeleted = messages.array().length;

            message.channel.sendMessage("Suppression des messages réussie. Nombre total de messages supprimés: "+messagesDeleted);
            console.log('Suppression des messages réussie. Nombre total de messages supprimés '+messagesDeleted)
          })
          .catch(err => {
            console.log('Erreur lors de la suppression en bloc');
            console.log(err);
          });
      }
    };

function kick(message) { // !reportbug @membre-a-kick raison

 if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

       if (message.length == 1){
           if (message[0].charAt(0) == config.prefix) 
               message[0] = message[0].slice(1);

      }   

    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Impossible de trouver l'utilisateur !");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Impossible");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Cette personne ne peut pas être kick !");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("Info du Kick :")
    .setColor("#e56b00")
    .addField("Membre kick :", `${kUser}> ID : ${kUser.id}`)
    .addField("Kick par :", `<@${message.author.id}> ID : ${message.author.id}`)
    .addField("Canal :", message.channel)
    .addField("Kick :", message.createdAt)
    .addField("Raison :", kReason);

    let kickChannel = message.guild.channels.find(`name`, "📝historique-sanction");
    if(!kickChannel) return message.channel.send("Impossible de trouver le canal 📝historique-sanction.");

    message.delete().catch(O_o=>{});
    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);

    return;
  }

function ban(message) { // !ban @membre-a-ban raison

 if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

       if (message.length == 1){
           if (message[0].charAt(0) == config.prefix) 
               message[0] = message[0].slice(1);

      }   

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Impossible de trouver l'utilisateur !");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("Impossible");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Cette personne ne peut pas être ban !");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("Info du Ban :")
    .setColor("#bc0000")
    .addField("Membre Banni :", `${bUser}> ID : ${bUser.id}`)
    .addField("Banni par :", `<@${message.author.id}> ID : ${message.author.id}`)
    .addField("Canal :", message.channel)
    .addField("Ban le :", message.createdAt)
    .addField("Raison :", bReason);

    let incidentchannel = message.guild.channels.find(`name`, "📝historique-sanction");
    if(!incidentchannel) return message.channel.send("Impossible de trouver le canal 📝historique-sanction.");

    message.delete().catch(O_o=>{});
    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);


    return;
}

function reportmembre (message) { // !reportmembre @membre-a-report citer-la-raison

 if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

       if (message.length == 1){
           if (message[0].charAt(0) == config.prefix) 
               message[0] = message[0].slice(1);

      }  

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Impossible de trouver l'utilisateur !");
    let rreason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Info Report du Membre :")
    .setColor("#15f153")
    .addField("Membre report :", `${rUser}< ID : ${rUser.id}`)
    .addField("Report par :", `<@${message.author}> ID : ${message.author.id}`)
    .addField("Canal :", message.channel)
    .addField("Report le :", message.createdAt)
    .addField("Raison :", rreason);

    let reportschannel = message.guild.channels.find(`name`, "📝report-membre");
    if(!reportschannel) return message.channel.send("Couldn't find reports 📝report-membre.");


    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

    return;
  }

function reportbug (message) { // !reportbug @membre-qui-report citer-le-bug
  
 if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

       if (message.length == 1){
           if (message[0].charAt(0) == config.prefix) 
               message[0] = message[0].slice(1);

      }  

    let reponsebfembed = new Discord.RichEmbed()
    .setDescription("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Vous n’avez pas mis de message en expliquant le bug.", "👮Merci de refaire la commande avec un message.")
    message.delete().catch(O_o=>{});

    let rreason = message.guild.members.get([1]) || args.join(" ").slice(22);
    if(!rreason) return message.channel.send(reponsebfembed) || message.delete(3600).catch(O_o=>{}); 

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Info Report du Bug :")
    .setColor("#15f153")
    .addField("Report par :", `<@${message.author}> ID : ${message.author.id}`)
    .addField("Canal :", message.channel)
    .addField("Report le :", message.createdAt)
    .addField("Raison :", rreason);

    let reportschannel = message.guild.channels.find(`name`, "📝report-bug");
    if(!reportschannel) return message.channel.send("Couldn't find reports 📝report-bug.");

    let reponsebvembed = new Discord.RichEmbed()
    .setDescription("Réponse de la commande :")
    .setColor("#15f153")
    .addField(":white_check_mark: Merci d'avoir report le bug.", "👮Ce report sera vérifié par l'équipe du discord.");
    message.channel.send(reponsebvembed);

    message.delete().catch(O_o=>{});    
    reportschannel.send(reportEmbed);
    return;
}

function serverinfo (message) {

 if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

       if (message.length == 1){
           if (message[0].charAt(0) == config.prefix) 
               message[0] = message[0].slice(1);

      }

    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Infos du Serveur")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Nom du Serveur :", message.guild.name)
    .addField("Serveur créer le :", message.guild.createdAt)
    .addField("Tu a rejoins le serveur le :", message.member.joinedAt)
    .addField("Nombre de personne sur le serveur :", message.guild.memberCount)
    .addField("Nombre de rôle sur le serveur :", message.guild.roles.size)
    .addField("Localisation du serveur :", message.guild.region)
    .addField("Propriétaire du serveur : ", message.guild.owner);

    message.channel.send(serverembed);

    return;
}


 function reportprive (message) { // !reportprive @membre-qui-report citer-le-bug
  
 if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

       if (message.length == 1){
           if (message[0].charAt(0) == config.prefix) 
               message[0] = message[0].slice(1);

      }  

    let rreason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Info Report du Bug :")
    .setColor("#15f153")
    .addField("Report par :", `<@${message.author}> ID : ${message.author.id}`)
    .addField("Canal :", message.channel)
    .addField("Temps :", message.createdAt)
    .addField("Raison :", rreason);

    message.createDM().then(channel => {
    channel.send(reportEmbed)
    }).catch(console.error);

    message.delete().catch(O_o=>{});

    return;
}


