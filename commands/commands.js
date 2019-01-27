
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
const OverwatchAPI = require('./overwatch.js');


module.exports = {
    'aide': aide,
    'aide_modo': aide_modo,
    'clean': clean,
    'kick': kick,
    'ban': ban,
    'reportmembre': reportmembre,
    'reportbug': reportbug,
    'serverinfo': serverinfo,
    'jeux': jeux,
    'mascotte': mascotte,
    'overwatch': overwatch,
    'reactaddrole': reactaddrole,
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
    .addField("!aide", "Voir les commandes du bot.")
    .addField("!reportmembre", "Report d'un membre du serveur // EX : !reportmembre @nom_de_la_personne_a_signaler message.")
    .addField("!reportbug", "Report un bug sur le discord ou sur le bot // EX : !reportbug @votrepseudo message.")
    .addField("!serverinfo", "Indique les informations du serveur.")
    .addField("!jeux", "Report un bug sur le discord ou sur le bot // EX : !jeux @votrepseudo [message avec le nom du jeux, quel type de jeux etc...]")
    .addField("!mascotte", "Pour avoir le rôle 'Apprenti Mascotte' ou le retirer.")

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

      let cleanPerm = new Discord.RichEmbed()
      .setDescription("Réponse de la commande :")
      .setColor("#bc0000")
      .addField(":x: Tu n'as pas le droit de sutilisé cette commande.", "👮 Bien essayer en tous cas.")
      message.delete().catch(O_o=>{});

      if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(aide_modoPerm);

    let aideembed = new Discord.RichEmbed()
    .setColor("#15f153")
    //.setThumbnail(sicon)
    .addField("!clean", "Suprime des messages en grande quantité.")
    .addField("!kick", "Kick un utilisateur // EX : !kick @nom_de_la_personne_a_kick raison.")
    .addField("!ban", "Ban un utilisateur // EX : !ban @nom_de_la_personne_a_ban raison.")

    message.channel.send(aideembed);

    return;

} 

function clean (message) {
       if (message.length == 1){
           if (message[0].charAt(0) == config.prefix) 
               message[0] = message[0].slice(1);

      }    
          let cleanPerm = new Discord.RichEmbed()
          .setDescription("Réponse de la commande :")
          .setColor("#bc0000")
          .addField(":x: Tu n'as pas le droit de suprimer des messages !", "👮 Bien essayer en tous cas.")
          message.delete().catch(O_o=>{});

       if (!message.channel.permissionsFor(message.author).hasPermission("MANAGE_MESSAGES")) {
        message.channel.sendMessage(cleanPerm);
        console.log("Désolé, vous n'avez pas la permission d'exécuter la commande \""+message.content+"\"");
        return;
      }

      if (message.channel.type == 'text') {
        message.channel.fetchMessages()
          .then(messages => {
            message.channel.bulkDelete(messages);
            messagesDeleted = messages.array().length;

            let messageyes = new Discord.RichEmbed()
            .setDescription("Réponse de la commande :")
            .setColor("#15f153")
            .addField(":white_check_mark: Suppression des messages réussie. Nombre total de messages supprimés:", +messagesDeleted)
            //.addField(":white_check_mark: Suppression des messages réussie. Nombre total de messages supprimés:" +messagesDeleted "!", ${message.author})
            message.delete().catch(O_o=>{});


            message.channel.sendMessage(messageyes);
            console.log('Suppression des messages réussie. Nombre total de messages supprimés '+messagesDeleted)
          })
          .catch(err => {
            console.log('Erreur lors de la suppression en bloc');
            console.log(err);
          });
      }
    };

function kick (message) { // !reportbug @membre-a-kick raison

 if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

       if (message.length == 1){
           if (message[0].charAt(0) == config.prefix) 
               message[0] = message[0].slice(1);

      } 

    let kickPerm = new Discord.RichEmbed()
    .setDescription("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Tu n'as pas le droit de kick !", "👮 Bien essayer en tous cas.")
    message.delete().catch(O_o=>{});


    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(kickPerm);  

    let errMention = new Discord.RichEmbed()
    .setDescription("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Merci de mentionné un pseudo !", "👮Merci de refaire la commande avec une mention de un pseudo.")
    message.delete().catch(O_o=>{});

    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send(errMention);

    let kickErrorMessage = new Discord.RichEmbed()
    .setDescription("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Vous n’avez pas mis de message en expliquant le kick.", "👮Merci de refaire la commande avec un message.")
    message.delete().catch(O_o=>{});

    let kReason = message.guild.members.get([1]) || args.join(" ").slice(22);
    if(!kReason) return message.channel.send(kickErrorMessage) || message.delete(3600).catch(O_o=>{}); 

    let kickError = new Discord.RichEmbed()
    .setDescription("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Cette personne ne peut pas être kick !", "👮Merci de vérifié le profil.")
    message.delete().catch(O_o=>{});

    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(kickError);

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("Info du Kick :")
    .setColor("#e56b00")
    .addField("Membre kick :", `${kUser}> ID : ${kUser.id}`)
    .addField("Kick par :", `<@${message.author.id}> ID : ${message.author.id}`)
    .addField("Canal :", message.channel)
    .addField("Kick :", message.createdAt)
    .addField("Raison :", kReason);

    let kickCanalErro = new Discord.RichEmbed()
    .setDescription("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Je ne trouve pas le canal d'envoi.", "👮Merci de contacter un Administrateur.")
    message.delete().catch(O_o=>{});

    let kickChannel = message.guild.channels.find(`name`, "📝historique-sanction");
    if(!kickChannel) return message.channel.send(kickCanalErro);

    let kickValid = new Discord.RichEmbed()
    .setDescription("Réponse de la commande :")
    .setColor("#15f153")
    .addField(":white_check_mark: L'utilisateur a été kick !", "👮Ce kick a été sauvegarder.");
    message.channel.send(kickValid);

    message.delete().catch(O_o=>{});
    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);

    return;
  }

function ban (message) { // !ban @membre-a-ban raison

 if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

       if (message.length == 1){
           if (message[0].charAt(0) == config.prefix) 
               message[0] = message[0].slice(1);

      }   
    let banPerm = new Discord.RichEmbed()
    .setDescription("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Tu n'as pas le droit de ban !", "👮 Bien essayer en tous cas.")
    message.delete().catch(O_o=>{});

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(banPerm);  

    let errMention = new Discord.RichEmbed()
    .setDescription("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Merci de mentionné un pseudo !", "👮Merci de refaire la commande avec une mention de un pseudo.")
    message.delete().catch(O_o=>{});

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send(errMention);

    let banErrorMessage = new Discord.RichEmbed()
    .setDescription("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Vous n’avez pas mis de message en expliquant le ban.", "👮Merci de refaire la commande avec un message.")
    message.delete().catch(O_o=>{});

    let bReason = message.guild.members.get([1]) || args.join(" ").slice(22);
    if(!bReason) return message.channel.send(banErrorMessage) || message.delete(3600).catch(O_o=>{});

    let banError = new Discord.RichEmbed()
    .setDescription("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Cette personne ne peut pas être ban !", "👮Merci de vérifié le profil.")
    message.delete().catch(O_o=>{});

    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(banError);


    let banEmbed = new Discord.RichEmbed()
    .setDescription("Info du Ban :")
    .setColor("#bc0000")
    .addField("Membre Banni :", `${bUser}> ID : ${bUser.id}`)
    .addField("Banni par :", `<@${message.author.id}> ID : ${message.author.id}`)
    .addField("Canal :", message.channel)
    .addField("Ban le :", message.createdAt)
    .addField("Raison :", bReason);

    let banCanalErro = new Discord.RichEmbed()
    .setDescription("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Je ne trouve pas le canal d'envoi.", "👮Merci de contacter un Administrateur.")
    message.delete().catch(O_o=>{});

    let incidentchannel = message.guild.channels.find(`name`, "📝historique-sanction");
    if(!incidentchannel) return message.channel.send(banCanalErro);

    let banValid = new Discord.RichEmbed()
    .setDescription("Réponse de la commande :")
    .setColor("#15f153")
    .addField(":white_check_mark: L'utilisateur a été banni !", "👮Ce bannisement a été sauvegarder.");
    message.channel.send(banValid);

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

    let errmention = new Discord.RichEmbed()
    .setDescription("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Merci de mentionné un pseudo !", "👮Merci de refaire la commande avec une mention de un pseudo.")
    message.delete().catch(O_o=>{});

    let mention = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));;
    if(!mention) return message.channel.send(errmention);

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

    let canalerror = new Discord.RichEmbed()
    .setDescription("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Je ne trouve pas le canal d'envoi.", "👮Merci de contacter un Administrateur.")
    message.delete().catch(O_o=>{});

    let reportschannel = message.guild.channels.find(`name`, "📝report-bug");
    if(!reportschannel) return message.channel.send(canalerror);

    let reponsebvembed = new Discord.RichEmbed()
    .setDescription("Réponse de la commande :")
    .setColor("#15f153")
    .addField(":white_check_mark: Merci d'avoir report ce membre.", "👮Ce report sera vérifié par l'équipe du discord.");
    message.channel.send(reponsebvembed);

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

    let errmention = new Discord.RichEmbed()
    .setDescription("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Merci de mentionné votre pseudo !", "👮Merci de refaire la commande avec une mention de votre pseudo.")
    message.delete().catch(O_o=>{});

    let mention = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));;
    if(!mention) return message.channel.send(errmention);

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

    let canalerror = new Discord.RichEmbed()
    .setDescription("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Je ne trouve pas le canal d'envoi.", "👮Merci de contacter un Administrateur.")
    message.delete().catch(O_o=>{});

    let reportschannel = message.guild.channels.find(`name`, "📝report-bug");
    if(!reportschannel) return message.channel.send(canalerror);

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

function jeux (message) { // !reportbug @membre-qui-report citer-le-bug
  
 if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(0);

       if (message.length == 1){
           if (message[0].charAt(0) == config.prefix) 
               message[0] = message[0].slice(1);

      } 

    let errmention = new Discord.RichEmbed()
    .setDescription("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Merci de mentionné votre pseudo !", "👮Merci de refaire la commande avec une mention de votre pseudo.")
    message.delete().catch(O_o=>{});

    let mention = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));;
    if(!mention) return message.channel.send(errmention);

    let reponsebfembed = new Discord.RichEmbed()
    .setDescription("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Vous n’avez pas mis de nom de jeu.", "👮Merci de refaire la commande avec un nom de jeu.")
    message.delete().catch(O_o=>{});

    let rreason = message.guild.members.get([0]) || args.join(" ").slice(22);
    if(!rreason) return message.channel.send(reponsebfembed) || message.delete(3600).catch(O_o=>{}); 

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Info Report du Bug :")
    .setColor("#15f153")
    .addField("Jeux proposée :", `<@${message.author}>`)
    .addField("Canal :", message.channel)
    .addField("Jeux proposée le  :", message.createdAt)
    .addField("Jeux :", rreason);

    let canalerror = new Discord.RichEmbed()
    .setDescription("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Je ne trouve pas le canal d'envoi.", "👮Merci de contacter un Administrateur.")
    message.delete().catch(O_o=>{});

    let reportschannel = message.guild.channels.find(`name`, "📢liste-de-jeu");
    if(!reportschannel) return message.channel.send(canalerror);

    let reponsebvembed = new Discord.RichEmbed()
    .setDescription("Réponse de la commande :")
    .setColor("#15f153")
    .addField(":white_check_mark: Merci d'avoir proposée ce jeu.", "👮Votre proposition sera afficher dans le canal #📢liste-de-jeu.");
    message.channel.send(reponsebvembed);

    message.delete().catch(O_o=>{});    
    reportschannel.send(reportEmbed);
    return;
}

function mascotte (msg) {
    let roleID = "534813925787828224";
    let role = msg.guild.roles.get(roleID);

    if (msg.length == 1) { 
        if (msg[0].charAt(0) == config.prefix) 
            msg[0] = msg[0].slice(1);
    }

    let roledel = new Discord.RichEmbed()
    .setDescription("Réponse de la commande :")
    .setColor("#15f153")
    .addField(":white_check_mark: Ton rôle a été retiré.", "👮Pour le récupérer, re taper là même commande.");

    if(msg.member.roles.get(roleID)) {
    msg.member.removeRole(role)
    msg.reply(roledel)
    }
    else {
    let roleadd = new Discord.RichEmbed()
    .setDescription("Réponse de la commande :")
    .setColor("#15f153")
    .addField(":white_check_mark: Hey, je m'appelle AtomikAlex et je suis là ' Mascotte ' du serveur. Mais vue que je suis gentil je vais t'assigné un titre spécial.", "👮Pour le retirer, re taper là même commande. ");
    msg.member.addRole(role)
    msg.reply(roleadd)
  }
}

function overwatch(msg) {
       if (msg.length == 1){
           if (msg[0].charAt(0) == config.prefix) 
               msg[0] = msg[0].slice(1);

 }
    if (msg.content.indexOf('#') > -1) {
      OverwatchAPI(msg.content, (err, data) => {
        if (err) {
          msg.reply("An error occured :(");
          return console.error(err + ': ' + data);
        }

        msg.reply(data);
        console.log('!overwtach');
      });
    } else {
        const helpText = '\n Ce bot récupérera vos statistiques Overwatch \n Entrez "!overwatch" et votre Battle.net Battle.net pour recevoir vos stats \n Ex: !overwatch Utilisateur#1234 \n\n Options par défaut: Région: us, Plate-forme: pc \n Pour modifier ces options, ajoutez votre message avec les options suivantes\n\n Plate-forme: Platform=[Platform] \n Options: pc, xbl, psn \n\n Région: region=[region] \n Options: us, eu, kr, cn, global \n\n\n Une requête complète pourrait ressembler à ceci:!overwatch Utilisateur#1234 platform = pc region = eu';
        msg.reply(helpText);
    }
  }

function reactaddrole (message){

}
