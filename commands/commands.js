const config = require('../config/config.json');
const nameconsole = require('../utils/generate').name();
const cmdsconsole = require('../utils/generate').cmds();
const aideconsole = require('../utils/generate').aide();
const reportmconsole = require('../utils/generate').reportm();
const reportbconsole = require('../utils/generate').reportb();
const serverconsole = require('../utils/generate').server();
const jeuxconsole = require('../utils/generate').jeux();
const mascotteconsole = require('../utils/generate').mascotte();
const cmdsaideeconsole = require('../utils/generate').cmdsaidee();
const aide_cmdconsole = require('../utils/generate').aide_cmd();
const Discord = require("discord.js");
const fortnitejs = require("fortnite");
const fortnitebdd = new fortnitejs(config.fortnite)
var giphy = require('giphy-api')({
  apiKey : config.giphy
});

module.exports = {
    'aide': aide,
    'reportmembre': reportmembre,
    'reportbug': reportbug,
    'serverinfo': serverinfo,
    'jeux': jeux,
    'mascotte': mascotte,
    'cmdsaidee': cmdsaidee,
    'aide_cmd': aide_cmd,
    'avatar' : avatar,
    'pari' : pari,
    'parihelp' : parihelp, 
    'poudlard' : poudlard,
    'fortnite' : fortnite,
    'giphy' : giphy,
 } 

//TODO Liste des commandes disponible sur le bot pour tous les membres.
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
    .addField("!reportmembre", "Report d'un membre du serveur // EX : !reportmembre message.")
    .addField("!reportbug", "Report un bug sur le discord ou sur le bot")
    .addField("!serverinfo", "Indique les informations du serveur.")
    .addField("!jeux", "Permettre de proposée vos jeux pour les streams.")
    .addField("!mascotte", "Pour avoir le rôle 'Apprenti Mascotte' ou le retirer.")
    .addField("!aide_cmd", "Permettre de vous aidez pour l'utilisation des commandes.")
    .addField("!avatar", "Permettre de voir votre photo de profils et avoir le lien.")
    .addField("!poudlard", "Permettre de vous choisir dnas une classe de Harry Potter")
    .addField("!fortnite", "Pour voir vos stats sur fortnite !")
    .addField("!gif", "Pour utilisÃ© les gifs.")
    message.channel.send(aideembed);

    return;

} 
//TODO Commande report un membre 
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
    .setTitle("Info Report du Bug :")
    .setColor("#bc0000")
    .addField(":x: Merci de mentionné un pseudo !", "👮Merci de refaire la commande avec une mention de un pseudo.")
    message.delete().catch(O_o=>{});

    let mention = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));;
    if(!mention) return message.channel.send(errmention);

    let reponsebfembed = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Vous n’avez pas mis de message en expliquant le bug.", "👮Merci de refaire la commande avec un message.")
    message.delete().catch(O_o=>{});

    let rreason = message.guild.members.get([1]) || args.join(" ").slice(22);
    if(!rreason) return message.channel.send(reponsebfembed) || message.delete(3600).catch(O_o=>{}); 

    let reportEmbed = new Discord.RichEmbed()
    .setTitle("Info Report du Bug :")
    .setColor("#15f153")
    .addField("Report par :", `<@${message.author}> ID : ${message.author.id}`)
    .addField("Canal :", message.channel)
    .addField("Report le :", message.createdAt)
    .addField("Raison :", rreason);

    let canalerror = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Je ne trouve pas le canal d'envoi.", "👮Merci de contacter un Administrateur.")
    message.delete().catch(O_o=>{});

    let reportschannel = message.guild.channels.find(`name`, "📝report-bug");
    if(!reportschannel) return message.channel.send(canalerror);

    let reponsebvembed = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#15f153")
    .addField(":white_check_mark: Merci d'avoir report ce membre.", "👮Ce report sera vérifié par l'équipe du discord.");
    message.channel.send(reponsebvembed);

    message.delete().catch(O_o=>{});    
    reportschannel.send(reportEmbed);
    return;
}
  
//TODO Commande report d'un bug sur le serveur.
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
    .setTitle("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Vous n’avez pas mis de message en expliquant le bug.", "👮Merci de refaire la commande avec un message.")
    message.delete().catch(O_o=>{});

    let rreason = message.guild.members.get([0]) || args.join(" ").slice();
    if(!rreason) return message.channel.send(reponsebfembed) || message.delete(3600).catch(O_o=>{}); 

    let reportEmbed = new Discord.RichEmbed()
    .setTitle("Info Report du Bug :")
    .setColor("#15f153")
    .addField("Report par :", `<@${message.author}> ID : ${message.author.id}`)
    .addField("Canal :", message.channel)
    .addField("Report le :", message.createdAt)
    .addField("Raison :", rreason);

    let canalerror = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Je ne trouve pas le canal d'envoi.", "👮Merci de contacter un Administrateur.")
    message.delete().catch(O_o=>{});

    let reportschannel = message.guild.channels.find(`name`, "📝report-bug");
    if(!reportschannel) return message.channel.send(canalerror);

    let reponsebvembed = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#15f153")
    .addField(":white_check_mark: Merci d'avoir report le bug.", "👮Ce report sera vérifié par l'équipe du discord.");
    message.channel.send(reponsebvembed);

    message.delete().catch(O_o=>{});    
    reportschannel.send(reportEmbed);
    return;
}
//TODO Liste d'information sur le serveur
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

    function bot(guild) {
    let botCount = 0;
    guild.members.forEach(member => { 
      if(member.user.bot) botCount++; 
    });
    return botCount;
  }

  function membre(guild) {
    let memberCount = 0;
    guild.members.forEach(member => {
      if(!member.user.bot) memberCount++; 
    });
    return memberCount;
  }
    let embed = new Discord.RichEmbed()
    .setAuthor(`${message.guild.name} - Informations`, message.guild.iconURL)
    .setColor('#15f153') 
    .addField('Propriétaire du serveur', message.guild.owner, true)
    .addField('Localisation du serveur', message.guild.region, true) 
    .addField('Nombre de canaux sur le serveur', message.guild.channels.size, true) 
    .addField('Nombre de personne sur le serveur', message.guild.memberCount) 
    .addField('Nombre de membre sur le serveur', membre(message.guild), true)
    .addField('Nombre de bot sur le serveur', bot(message.guild), true)
    .setFooter('Serveur Discord créer le :')
    .setTimestamp(`${message.guild.createdAt}`)

    message.channel.send(embed);
    return;
}
//TODO Commande pour proposer vos jeux.
function jeux (message) { // !jeux @membre-qui-report citer-le-bug
  
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
    .setTitle("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Vous n’avez pas mis de nom de jeu.", "👮Merci de refaire la commande avec un nom de jeu.")
    message.delete().catch(O_o=>{});

    let rreason = message.guild.members.get([0]) || args.join(" ").slice();
    if(!rreason) return message.channel.send(reponsebfembed) || message.delete(3600).catch(O_o=>{}); 

    let reportEmbed = new Discord.RichEmbed()
    .setTitle("Info aidée de jeux :")
    .setColor("#15f153")
    .addField("Jeux proposée :", `<@${message.author}>`)
    .addField("Canal :", message.channel)
    .addField("Jeux proposée le  :", message.createdAt)
    .addField("Jeux :", rreason);

    let canalerror = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Je ne trouve pas le canal d'envoi.", "👮Merci de contacter un Administrateur.")
    message.delete().catch(O_o=>{});

    let reportschannel = message.guild.channels.find(`name`, "📢liste-de-jeu");
    if(!reportschannel) return message.channel.send(canalerror);

    let reponsebvembed = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#15f153")
    .addField(":white_check_mark: Merci d'avoir proposée ce jeu.", "👮Votre proposition sera afficher dans le canal #📢liste-de-jeu.");
    message.channel.send(reponsebvembed);

    message.delete().catch(O_o=>{});    
    reportschannel.send(reportEmbed);
    return;
}

//TODO Commande de récupération role mascotte
function mascotte (msg) {
    let roleID = "534813925787828224";
    let role = msg.guild.roles.get(roleID);

    if (msg.length == 1) { 
        if (msg[0].charAt(0) == config.prefix) 
            msg[0] = msg[0].slice(1);
    }

    let roledel = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#15f153")
    .addField(":white_check_mark: Ton rôle a été retiré.", "👮Pour le récupérer, re taper là même commande.");

    if(msg.member.roles.get(roleID)) {
    msg.member.removeRole(role)
    msg.reply(roledel)
    }
    else {
    let roleadd = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#15f153")
    .addField(":white_check_mark: Hey, je m'appelle AtomikAlex et je suis là ' Mascotte ' du serveur. Mais vue que je suis gentil je vais t'assigné un titre spécial.", "👮Pour le retirer, re taper là même commande. ");
    msg.member.addRole(role)
    msg.reply(roleadd)
  }
}

//TODO Proposer des futurs commandes sur le bot.
function cmdsaidee (message){

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
    .setTitle("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Vous n’avez pas mis de nom de commandes et des détailles sur cette commandes.", "👮Merci de refaire la commande avec nom de la commande plus les détailles.")
    message.delete().catch(O_o=>{});

    let rreason = message.guild.members.get([0]) || args.join(" ").slice();
    if(!rreason) return message.channel.send(reponsebfembed) || message.delete(3600).catch(O_o=>{}); 

    let reportEmbed = new Discord.RichEmbed()
    .setTitle("Info commande proposée :")
    .setColor("#15f153")
    .addField("Commande proposée :", `<@${message.author}>`)
    .addField("Canal :", message.channel)
    .addField("Commande proposée le  :", message.createdAt)
    .addField("Commande :", rreason);

    let canalerror = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Je ne trouve pas le canal d'envoi.", "👮Merci de contacter un Administrateur.")
    message.delete().catch(O_o=>{});

    let reportschannel = message.guild.channels.find(`name`, "test-dev");
    if(!reportschannel) return message.channel.send(canalerror);

    let reponsebvembed = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#15f153")
    .addField(":white_check_mark: Merci d'avoir proposée cette commande.", "👮Votre proposition sera regarder par les Administrateur.");
    message.channel.send(reponsebvembed);

    message.delete().catch(O_o=>{});    
    reportschannel.send(reportEmbed);
    return;

}

//TODO Help d'une commande précise (Sert à rien vue il y a déjà la commande aide... x) )
function aide_cmd(msg, cmd) { 

    let args = msg.content.split(/\s+/).slice(1);
    let messageArray = msg.content.split(" ");

    if (args.length == 1) { 
        if (args[0].charAt(0) == config.prefix) 
            args[0] = args[0].slice(1);
    }

    let errorembed = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Vous n'avez pas mit de nom de commande.", "👮Merci de refaire la commande avec le nom d'une commande.(Auto-destruction du message dans 20s.)")

    let helpStr2 = msg.guild.members.get([0]) || args.join(" ");
    if(!helpStr2) return msg.channel.send(errorembed).then(message => {message.delete(12000)});
    msg.delete().catch(O_o=>{});  

    switch (helpStr2) {
    
        case 'aide':
          let aideembed = new Discord.RichEmbed()
          .setTitle("Réponse de la commande :")
          .setColor("#15f153")
          .addField(":white_check_mark: Exemple : !aide", "👮Permettre de voir tous les commandes du bot.(Auto-destruction du message dans 20s.)");
          msg.channel.send(aideembed).then(message => {message.delete(12000)}); 
        break;

        case 'reportmembre':
          let reportmembreembed = new Discord.RichEmbed()
          .setTitle("Réponse de la commande :")
          .setColor("#15f153")
          .addField(":white_check_mark: Exemple : !reportmembre @Pseudo message", "👮Permettre de signaler un membre aux Administrateurs.(Auto-destruction du message dans 20s.)");
          msg.channel.send(reportmembreembed).then(message => {message.delete(12000)}); 
        break;

        case 'reportbug':
          let reportbugembed = new Discord.RichEmbed()
          .setTitle("Réponse de la commande :")
          .setColor("#15f153")
          .addField(":white_check_mark: Exemple : !reportbug message_du_bug.", "👮Permettre d'envoyer un signalement de bug aux Administrateurs.(Auto-destruction du message dans 20s.)");
          msg.channel.send(reportbugembed).then(message => {message.delete(12000)});  
        break;

        case 'serverinfo':
          let serverinfoembed = new Discord.RichEmbed()
          .setTitle("Réponse de la commande :")
          .setColor("#15f153")
          .addField(":white_check_mark: Exemple : !serverinfo", "👮Permettre de voir les informations du serveur.(Auto-destruction du message dans 20s.)");
          msg.channel.send(serverinfoembed).then(message => {message.delete(12000)});
        break;

        case 'jeux':
          let jeuxembed = new Discord.RichEmbed()
          .setTitle("Réponse de la commande :")
          .setColor("#15f153")
          .addField(":white_check_mark: Exemple : !jeux [message avec le nom du jeux, quel type de jeux etc...]", "👮Permettre de proposée vos jeux pour les streams.(Auto-destruction du message dans 20s.)");
          msg.channel.send(jeuxembed).then(message => {message.delete(12000)});
        break;

        case 'mascotte':
          let mascotteembed = new Discord.RichEmbed()
          .setTitle("Réponse de la commande :")
          .setColor("#15f153")
          .addField(":white_check_mark: Exemple : !mascotte", "👮Pour avoir le rôle 'Apprenti Mascotte' ou le retirer.(Auto-destruction du message dans 20s.)");
          msg.channel.send(mascotteembed).then(message => {message.delete(12000)});
        break;

        default:
          let defaultembed = new Discord.RichEmbed()
          .setTitle("Réponse de la commande :")
          .setColor("#bc0000")
          .addField(":x: Je ne trouve pas la commande.", "👮Merci de contacter un Administrateur.(Auto-destruction du message dans 20s.)")
          msg.channel.send(defaultembed).then(message => {message.delete(12000)});
    }
        msg.delete().catch(O_o=>{}); 
}

//TODO Affiche votre avatar avec le lien
function avatar (msg) {

    if (msg.length == 1) { 
        if (msg[0].charAt(0) == config.prefix) 
            msg[0] = msg[0].slice(1);
    }

    let avatarEmbed = new Discord.RichEmbed()
    .setTitle(`Ton image de profil.`)  
    .setColor("#15f153")
    .setImage(`${msg.author.avatarURL}`)
    .setURL(`${msg.author.avatarURL}`)
    .setDescription(`[Lien direct vers l'image](${msg.author.avatarURL})`)
    .setAuthor(`Par ${msg.author.username} - Informations`, msg.author.avatarURL);

    msg.channel.send(avatarEmbed);
    msg.delete().catch(O_o=>{});
}
//TODO Commande  pari pour le fun pour Apex Legend
function pari (message) { // commande pari pour juste Apex Legend 

 if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let argsfrag = messageArray.slice(1, 2);
  let argsdead = messageArray.slice(2, 3);
  let argstop10 = messageArray.slice(3, 4);
  let argstop2 = messageArray.slice(4, 5);
  let argstop1 = messageArray.slice(5,6);
  let argscrash = messageArray.slice(6);

       if (message.length == 1){
           if (message[0].charAt(0) == config.prefix) 
               message[0] = message[0].slice(1);

      } 

    let fragEmbedError = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Vous n’avez pas mis le nombre de frags.", "👮Merci de refaire la commande avec le nombre de frags.")

    let frags = message.guild.members.get([0]) || argsfrag.join(" ").slice();
    if(!frags) return message.channel.send(fragEmbedError); 

    let deadEmbedError = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Vous n’avez pas mis le nombre de mort.", "👮Merci de refaire la commande avec le nombre de mort.")

    let dead = message.guild.members.get([0]) || argsdead.join(" ").slice();
    if(!dead) return message.channel.send(deadEmbedError); 

    let top10Error = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Vous n’avez pas mis le nombre de Top 10.", "👮Merci de refaire la commande avec le nombre de Top 10.")

    let top10 = message.guild.members.get([0]) || argstop10.join(" ").slice();
    if(!top10) return message.channel.send(top10Error); 

    let top2Error = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Vous n’avez pas mis le nombre de Top 2.", "👮Merci de refaire la commande avec le nombre de Top 2.")

    let top2 = message.guild.members.get([0]) || argstop2.join(" ").slice();
    if(!top2) return message.channel.send(top2Error); 

    let top1Error = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Vous n’avez pas mis le nombre de Top 1.", "👮Merci de refaire la commande avec le nombre de Top 1.")

    let top1 = message.guild.members.get([0]) || argstop1.join(" ").slice();
    if(!top1) return message.channel.send(top1Error); 

    let crachEmbedError = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Vous n’avez pas mis le nombre de crash de partie.", "👮Merci de refaire la commande avec le nombre de crash de partie.")

    let crash = message.guild.members.get([0]) || argscrash.join(" ").slice();
    if(!crash) return message.channel.send(crachEmbedError); 

    let pariEmbed = new Discord.RichEmbed()
    .setTitle(`Info pari de ${message.author.username} :`)
    .setColor("#15f153")
    .addField("Pari par :", `${message.author}`)
    .addField("Canal :", message.channel)
    .addField("Pari proposée le  :", message.createdAt)
    .addField("Nombre de frags :", frags)
    .addField("Nombre de fois où je meurs :", dead)
    .addField("Nombre de top 10 :", top10)
    .addField("Nombre de top 2 :", top2)
    .addField("Nombre de top 1 :", top1)
    .addField("Nombre de crash :", crash);

    let canalerror = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Je ne trouve pas le canal d'envoi.", "👮Merci de contacter un Administrateur.")

    let reportschannel = message.guild.channels.find(`name`, "📢liste-de-pari");
    if(!reportschannel) return message.channel.send(canalerror);

    let reponsebvembed = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#15f153")
    .addField(":white_check_mark: Merci d'avoir pari .", "👮Le pari seras affiché sur le canal #📢liste-de-pari .");

    message.channel.send(reponsebvembed);
    message.delete().catch(O_o=>{});    
    reportschannel.send(pariEmbed);
    return;
}
//TODO Détaile de l'usage commande pari 
function parihelp (message) {

 if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

       if (message.length == 1){
           if (message[0].charAt(0) == config.prefix) 
               message[0] = message[0].slice(1);

      }
    let parihelpEmbed = new Discord.RichEmbed()
    .setColor("#15f153")
    .setTitle("Commant utilisé la commande pari :")
    .setDescription(
    `!pari A B C D E F

     A = Nombre de Frag.

     B = Nombre de fois je meurs.

     C = Nombre de Top 10.

     D = Nombre de Top 2.

     E = Nombre de Top 1.

     F = Nombre de crash.

     Ex : !pari 10 20 300 4000 50000 600000 `)

    message.channel.send(parihelpEmbed);

    return;
} 

//TODO Commande aléotoire pour vous placer dans une des 4 classe d'Hasrry potter
function poudlard (msg){

  let args = msg.content.split(/\s+/).slice(1);
  let messageArray = msg.content.split(" ");

  if (args.length == 1) {
      if (args[0].charAt(0) == config.prefix)
          args[0] = args[0].slice(1);
  }

 var calcul = Math.floor(Math.random() * Math.floor(5));

  switch (calcul) {

  case 1:
     let griEmbed = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#15f153")
//    .setImage("image/shield_gry.gif")
    .addField(":white_check_mark: Vous avez reçus chez Gryffondor ! ", "👮Bravo à vous et bienvenue dans notre classe !");
    msg.channel.send(griEmbed);
  break;

   case 2:
     let serEmbed = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#15f153")
//      .setImage("image/shield_sly.gif")
    .addField(":white_check_mark: Vous avez reçus chez Serpentard ! ", "👮Bravo à vous et bienvenue dans notre classe !");
    msg.channel.send(serEmbed);
  break;

   case 3:
     let pouEmbed = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#15f153")
  //  .setImage("image/shield_huf.gif")
    .addField(":white_check_mark: Vous avez reçus chez Poufsouffle ! ", "👮Bravo à vous et bienvenue dans notre classe !");
    msg.channel.send(pouEmbed);
  break;

   case 4:
     let serdEmbed = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
  //  .setImage("image/shield_rav.gif")
    .setColor("#15f153")
    .addField(":white_check_mark: Vous avez reçus chez Serdaigle ! ", "👮Bravo à vous et bienvenue dans notre classe !");
    msg.channel.send(serdEmbed);
  break;

   default :
    let defaultembed = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Vous avez été refusé pour rentrer chez Poudlard.", "👮Re tenter votre chance plu tard !")
    msg.channel.send(defaultembed);
 }
   msg.delete().catch(O_o=>{});

}

//TODO Commande sur vos stats pour fornite.
function fortnite (msg) {

  if(msg.author.bot) return;
    if(msg.channel.type === "dm") return;

       if (msg.length == 1){
           if (msg[0].charAt(0) == config.prefix)
               msg[0] = msg[0].slice(1);

      }

  let messageArray = msg.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

let username = args[0];


let errorpseudo = new Discord.RichEmbed()
.setColor("#3498DB")
.setTitle("Commant utilisé la commande fortnite :")
.setDescription(
`!fortnite [Nom du joueur] [plataform] [La cathégorie de stats] (Sans les crochets)

- Nom du joueur : 
Le nom du joueur que vous voulez voir les stats.

- Platform : 
Vous avez le choix entre 3 platform (Playstation, XBOX Live, PC) : 
Pour PC vous devez rentrer : pc
Pour XBOX Live vous devez rentrer : xbl
Playstation vous devez rentrer : psn

- Cathégorie de stat : 
Vous avez le choix entre plusieur cathégorie (solo, duo, squad, global, actuel_solo, actuel_duo, actuel_squad, actuel_global)

solo donne les stats en solo de tous les saisons.
duo donne les stats en duo de tous les saisons.
squad donne les stats en squad de tous les saisons.
global donne la totalité des stats de (solo, duo, squad).

actuel_solo donne les stats en solo de la saison en cours.
actuel_duo donne les stats en duo de la saison en cours.
actuel_squad donne les stats en squad de la saison en cours.
actuel_global donne la totalité des stats de (actuel_solo, actuel_duo, actuel_squad).`)

if(!username) return msg.channel.send(errorpseudo);

let platform = args[1];


let errorplatform = new Discord.RichEmbed()
.setTitle("Réponse de la commande :")
.setColor("#bc0000")
.addField(":x: Vous n'avez pas rentrer votre platform ! ", "👮 Refaite la commande avec votre platfarm")

if(!platform) return msg.channel.send(errorplatform)

let data = fortnitebdd.user(username, platform).then(data => {

let errorusernovalide = new Discord.RichEmbed()
.setTitle("Réponse de la commande :")
.setColor("#bc0000")
.addField(":x: Ce nom de joueur est introuvable ! ", "👮 Refaite la commande avec un nom de joueur correct.")

if(data.code == "404") return msg.channel.send(errorusernovalide);

let errorstats = new Discord.RichEmbed()
.setTitle("Réponse de la commande :")
.setColor("#bc0000")
.addField(":x: vous n'avez pas choisie la cathégorie de stats ! ", "👮 Refaite la commande avec la demande cathégorie.")

let stats = args[2];
if(!stats) return msg.channel.send(errorstats)

console.log(data);

switch (stats) {

    case "actuel_solo":

      let embed1 = new Discord.RichEmbed()
      .setTitle("Réponse de la commande (Actuel Solo) :")
      .setColor("#0000FF")
      .addField("Score", data.stats.current_solo.score,true)
      .addField("KD", data.stats.current_solo.kd,true)
      .addField("Matches", data.stats.current_solo.matches, true)
      .addField("Kills", data.stats.current_solo.kills, true)
      .addField("Ration Kills", data.stats.current_solo.kills_per_match, true)
      .addField("Ration Score", data.stats.current_solo.score_per_match, true)
      .addField("Victoire", data.stats.current_solo.wins, true)
      .addField("Top 3",  data.stats.current_solo.top_3, true)
      .addField("Top 5", data.stats.current_solo.top_5, true)
      .addField("Top 6", data.stats.current_solo.top_6, true)
      .addField("Top 12", data.stats.current_solo.top_12, true)
      .addField("Top 25", data.stats.current_solo.top_25, true)

      msg.channel.send(embed1);

    break;

    case "actuel_duo":

      let embed2 = new Discord.RichEmbed()
      .setTitle("Réponse de la commande (Actuel Duo) :")
      .setColor("#FFFFFF")
      .addField("Score", data.stats.current_duo.score,true)
      .addField("KD", data.stats.current_duo.kd,true)
      .addField("Matches", data.stats.current_duo.matches, true)
      .addField("Kills", data.stats.current_duo.kills, true)
      .addField("Ration Kills", data.stats.current_duo.kills_per_match, true)
      .addField("Ration Score", data.stats.current_duo.score_per_match, true)
      .addField("Victoire", data.stats.current_duo.wins, true)
      .addField("Top 3",  data.stats.current_duo.top_3, true)
      .addField("Top 5", data.stats.current_duo.top_5, true)
      .addField("Top 6", data.stats.current_duo.top_6, true)
      .addField("Top 12", data.stats.current_duo.top_12, true)
      .addField("Top 25", data.stats.current_duo.top_25, true)

      msg.channel.send(embed2);

    break;

    case "actuel_squad":

      let embed3 = new Discord.RichEmbed()
      .setTitle("Réponse de la commande (Actuel Squad) :")
      .setColor("#bc0000")
      .addField("Score", data.stats.current_squad.score,true)
      .addField("KD", data.stats.current_squad.kd,true)
      .addField("Matches", data.stats.current_squad.matches, true)
      .addField("Kills", data.stats.current_squad.kills, true)
      .addField("Ration Kills", data.stats.current_squad.kills_per_match, true)
      .addField("Ration Score", data.stats.current_squad.score_per_match, true)
      .addField("Victoire", data.stats.current_squad.wins, true)
      .addField("Top 3",  data.stats.current_squad.top_3, true)
      .addField("Top 5", data.stats.current_squad.top_5, true)
      .addField("Top 6", data.stats.current_squad.top_6, true)
      .addField("Top 12", data.stats.current_squad.top_12, true)
      .addField("Top 25", data.stats.current_squad.top_25, true)

      msg.channel.send(embed3);

    break;


    case "solo":

      let embed4 = new Discord.RichEmbed()
      .setTitle("Réponse de la commande (Solo) :")
      .setColor("#0000FF")
      .addField("Score", data.stats.solo.score,true)
      .addField("KD", data.stats.solo.kd,true)
      .addField("Matches", data.stats.solo.matches, true)
      .addField("Kills", data.stats.solo.kills, true)
      .addField("Ration Kills", data.stats.solo.kills_per_match, true)
      .addField("Ration Score", data.stats.solo.score_per_match, true)
      .addField("Victoire", data.stats.solo.wins, true)
      .addField("Top 3",  data.stats.solo.top_3, true)
      .addField("Top 5", data.stats.solo.top_5, true)
      .addField("Top 6", data.stats.solo.top_6, true)
      .addField("Top 12", data.stats.solo.top_12, true)
      .addField("Top 25", data.stats.solo.top_25, true)

      msg.channel.send(embed4);

    break;

    case "duo":

      let embed5 = new Discord.RichEmbed()
      .setTitle("Réponse de la commande (Duo) :")
      .setColor("#FFFFFF")
      .addField("Score", data.stats.duo.score,true)
      .addField("KD", data.stats.duo.kd,true)
      .addField("Matches", data.stats.duo.matches, true)
      .addField("Kills", data.stats.duo.kills, true)
      .addField("Ration Kills", data.stats.duo.kills_per_match, true)
      .addField("Ration Score", data.stats.duo.score_per_match, true)
      .addField("Victoire", data.stats.duo.wins, true)
      .addField("Top 3",  data.stats.duo.top_3, true)
      .addField("Top 5", data.stats.duo.top_5, true)
      .addField("Top 6", data.stats.duo.top_6, true)
      .addField("Top 12", data.stats.duo.top_12, true)
      .addField("Top 25", data.stats.duo.top_25, true)

      msg.channel.send(embed5);

    break;

    case "squad":

      let embed6 = new Discord.RichEmbed()
      .setTitle("Réponse de la commande (Squad) :")
      .setColor("#bc0000")
      .addField("Score", data.stats.squad.score,true)
      .addField("KD", data.stats.squad.kd,true)
      .addField("Matches", data.stats.squad.matches, true)
      .addField("Kills", data.stats.squad.kills, true)
      .addField("Ration Kills", data.stats.squad.kills_per_match, true)
      .addField("Ration Score", data.stats.squad.score_per_match, true)
      .addField("Victoire", data.stats.squad.wins, true)
      .addField("Top 3",  data.stats.squad.top_3, true)
      .addField("Top 5", data.stats.squad.top_5, true)
      .addField("Top 6", data.stats.squad.top_6, true)
      .addField("Top 12", data.stats.squad.top_12, true)
      .addField("Top 25", data.stats.squad.top_25, true)

      msg.channel.send(embed6);

    break;

    case "global":

       var global_score = (data.stats.solo.score + data.stats.duo.score + data.stats.squad.score);

       
      var global_matches = ( data.stats.solo.matches + data.stats.duo.matches + data.stats.squad.matches);

      var global_kills =  ( data.stats.solo.kills + data.stats.duo.kills + data.stats.squad.kills);

      var global_ration_score = Math.round(((data.stats.solo.score + data.stats.duo.score + data.stats.squad.score)/(data.stats.solo.matches + data.stats.duo.matches + data.stats.squad.matches))*100)/100;

      var global_ration_kills = Math.round(((data.stats.solo.kills + data.stats.duo.kills + data.stats.squad.kills)/(data.stats.solo.matches + data.stats.duo.matches + data.stats.squad.matches))*100)/100;

      var global_ration_kd = Math.round(((data.stats.solo.kills + data.stats.duo.kills + data.stats.squad.kills)/((data.stats.solo.matches + data.stats.duo.matches + data.stats.squad.matches)-(data.stats.solo.wins + data.stats.duo.wins + data.stats.squad.wins)))*100)/100;

      var global_wins = (data.stats.solo.wins 	+ data.stats.duo.wins + data.stats.squad.wins);

      var global_top_3 = (data.stats.solo.top_3 + data.stats.duo.top_3 + data.stats.squad.top_3);

      var global_top_5 = (data.stats.solo.top_5 + data.stats.duo.top_5 + data.stats.squad.top_5);

      var global_top_6 = (data.stats.solo.top_6 + data.stats.duo.top_6 + data.stats.squad.top_6);

      var global_top_12 = (data.stats.solo.top_12 + data.stats.duo.top_12 + data.stats.squad.top_12);

      var global_top_25 = (data.stats.solo.top_25 + data.stats.duo.top_25 + data.stats.squad.top_25);

       let embed7 = new Discord.RichEmbed()
      .setTitle("Réponse de la commande (global) :")
      .setColor("#F3FF2B")
      .addField("Score", global_score,true)
      .addField("KD", global_ration_kd,true)
      .addField("Matches", global_matches, true)
      .addField("Kills", global_kills, true)
      .addField("Ration Kills", global_ration_kills, true)
      .addField("Ration Score", global_ration_score, true)
      .addField("Victoire", global_wins, true)
      .addField("Top 3",  global_top_3, true)
      .addField("Top 5", global_top_5, true)
      .addField("Top 6", global_top_6, true)
      .addField("Top 12", global_top_12, true)
      .addField("Top 25", global_top_25, true)


      msg.channel.send(embed7);

    break;

    case "actuel_global":

      var current_lifetime_score = (data.stats.current_solo.score + data.stats.current_duo.score + data.stats.current_squad.score);

      var current_lifetime_matches = ( data.stats.current_solo.matches + data.stats.current_duo.matches + data.stats.current_squad.matches);

      var current_lifetime_kills =  ( data.stats.current_solo.kills + data.stats.current_duo.kills + data.stats.current_squad.kills);

      var current_lifetime_ration_score = Math.round(((data.stats.current_solo.score + data.stats.current_duo.score + data.stats.current_squad.score)/(data.stats.current_solo.matches + data.stats.current_duo.matches + data.stats.current_squad.matches))*100)/100;

      var current_lifetime_ration_kills = Math.round(((data.stats.current_solo.kills + data.stats.current_duo.kills + data.stats.current_squad.kills)/(data.stats.current_solo.matches + data.stats.current_duo.matches + data.stats.current_squad.matches))*100)/100;

      var current_lifetime_ration_kd = Math.round(((data.stats.current_solo.kills + data.stats.current_duo.kills + data.stats.current_squad.kills)/((data.stats.current_solo.matches + data.stats.current_duo.matches + data.stats.current_squad.matches)-(data.stats.current_solo.wins + data.stats.current_duo.wins + data.stats.current_squad.wins)))*100)/100;

      var current_lifetime_wins = (data.stats.current_solo.wins 	+ data.stats.current_duo.wins + data.stats.current_squad.wins);

      var current_lifetime_top_3 = (data.stats.current_solo.top_3 + data.stats.current_duo.top_3 + data.stats.current_squad.top_3);

      var current_lifetime_top_5 = (data.stats.current_solo.top_5 + data.stats.current_duo.top_5 + data.stats.current_squad.top_5);

      var current_lifetime_top_6 = (data.stats.current_solo.top_6 + data.stats.current_duo.top_6 + data.stats.current_squad.top_6);

      var current_lifetime_top_12 = (data.stats.current_solo.top_12 + data.stats.current_duo.top_12 + data.stats.current_squad.top_12);

      var current_lifetime_top_25 = (data.stats.current_solo.top_25 + data.stats.current_duo.top_25 + data.stats.current_squad.top_25);

      
      let embed8 = new Discord.RichEmbed()
      .setTitle("Réponse de la commande (Actuel Global) :")
      .setColor("#F3FF2B")
      .addField("Score", current_lifetime_score,true)
      .addField("KD", current_lifetime_ration_kd,true)
      .addField("Matches", current_lifetime_matches, true)
      .addField("Kills", current_lifetime_kills, true)
      .addField("Ration Kills", current_lifetime_ration_kills, true)
      .addField("Ration Score", current_lifetime_ration_score, true)
      .addField("Victoire", current_lifetime_wins, true)
      .addField("Top 3",  current_lifetime_top_3, true)
      .addField("Top 5", current_lifetime_top_5, true)
      .addField("Top 6", current_lifetime_top_6, true)
      .addField("Top 12", current_lifetime_top_12, true)
      .addField("Top 25", current_lifetime_top_25, true)

      msg.channel.send(embed8);

    break;

    default :

    let errorchamp = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: La cathégorie que vous avez choisie n'exixte pas. ", "👮 Refaite la commande avec une cathégorie qui existe.")
    msg.channel.send(errorchamp)

    }
  })
}

function gif (msg){

  if(msg.author.bot) return;
  if(msg.channel.type === "dm") return;

     if (msg.length == 1){
         if (msg[0].charAt(0) == config.prefix)
             msg[0] = msg[0].slice(1);

    }

let messageArray = msg.content.split(" ");
let cmd = messageArray[0];
let args = messageArray.slice(1);

let errormethod = new Discord.RichEmbed()
.setColor("#3498DB")
.setTitle("Commant utilisé la commande gif :")
.setDescription(`!gif [Méthode de recherche ] [argument] (Sans les crochets)

Pour infos cette commande marche que avec le site : https://giphy.com.

Pour la méthode vous avez le choix entre : 

- random : 
Donner un gif aléatoire dans leurs base de donnés. 
Vous pouvez précisez un argument pour cherche un gif plus précis/

EX :  !gif random pokémon
Et sa vous donneras un gif de pokémon qui viens de leur site. 

- id : 
Faut récupérer l'id du gif que vous voulez utilisé sur leurs site en argument.

Vous avez que une solution pour récupérer l'id :

EX : !gif id NS7gPxeumewkWDOIxi (Sa devrais sortir un gif de pikachu en détective.)
https://giphy.com/gifs/detectivepikachumovie-[(id) --> NS7gPxeumewkWDOIxi]
Ce que vous voyez entre le crochet c'est son id.

`);

var method = args[0];
if (!method) return msg.channel.send(errormethod);

switch (method) {

  case "random":
  var gif_random = args[1];
  giphy.random(gif_random, function (err, res) {
    if (res.message == "API rate limit exceeded"){
    //  msg.channel.send("Merci de patienter avant de refaire la commande, la limitation à était dépasser...")
    let errorlimitation = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: La donnée passente avec l'API est dépasser ", "👮 Merci d'attendre 10-15 min avant de refaire la commande. ")
     msg.channel.send(errorlimitation);

    }else if(res.data.url === undefined) {
      //msg.channel.send("Avec se mot de clé on n'a pas trouver de gif...")
      let errorargument = new Discord.RichEmbed()
      .setTitle("Réponse de la commande :")
      .setColor("#bc0000")
      .addField(":x: On n'a pas trouver de gif qui conrespond avec ce argument", "👮 Merci de refaire la commande avec un autre argument.")
       msg.channel.send(errorargument);
    }else{
       msg.channel.send(res.data.url);
    }
  //console.log(res)
  });
  break;

  case "id":
  var gif_id = args[1];

  let errorid1 = new Discord.RichEmbed()
  .setTitle("Réponse de la commande :")
  .setColor("#bc0000")
  .addField(":x: Vous n'avez pas rentrer d'id", "👮 Merci de refaire la commande avec un id. ")

 if (!gif_id) return msg.channel.send(errorid1)
  giphy.id(gif_id, function (err, res) {

    if (res.message == "API rate limit exceeded") {
      let errorlimitation2 = new Discord.RichEmbed()
      .setTitle("Réponse de la commande :")
      .setColor("#bc0000")
      .addField(":x: La donnée passente avec l'API est dépasser ", "👮 Merci d'attendre 10-15 min avant de refaire la commande. ")
       msg.channel.send(errorlimitation2);
    }else if (res.meta.status  == "404") {
      let errorid = new Discord.RichEmbed()
      .setTitle("Réponse de la commande :")
      .setColor("#bc0000")
      .addField(":x: On n'a pas trouver de gif qui conrespond avec cette id", "👮 Merci de refaire la commande avec un autre id corect.")
       msg.channel.send(errorid);
    }else {
      msg.channel.send(res.data[0].url)
    }
  });
  break;

  default :

  msg.channel.send("La cathégorie est introuvable..");
};
}