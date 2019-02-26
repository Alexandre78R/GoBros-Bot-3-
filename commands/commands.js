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
const stripIndent = require('strip-indent');
const os = require('os');
const Discord = require("discord.js");

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
    'addrole' : addrole,
    'delrole' : delrole,
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
    .addField("!reportmembre", "Report d'un membre du serveur // EX : !reportmembre message.")
    .addField("!reportbug", "Report un bug sur le discord ou sur le bot")
    .addField("!serverinfo", "Indique les informations du serveur.")
    .addField("!jeux", "Permettre de proposée vos jeux pour les streams.")
    .addField("!mascotte", "Pour avoir le rôle 'Apprenti Mascotte' ou le retirer.")
    .addField("!aide_cmd", "Permettre de vous aidez pour l'utilisation des commandes.")
    .addField("!avatar", "Permettre de voir votre photo de profils et avoir le lien.")
    message.channel.send(aideembed);

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

function jeux (message) { // !reportbug @membre-qui-report citer-le-bug
  
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

function addrole (msg) {

    let args = msg.content.split(/\s+/).slice(1);
    let messageArray = msg.content.split(" ");

    if (args.length == 1) { 
        if (args[0].charAt(0) == config.prefix) 
            args[0] = args[0].slice(1);
    }

    let errorembed = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Vous n'avez pas mit le nom du rôle.", "👮Merci de refaire la commande avec le nom du rôle.(Auto-destruction du message dans 20s.)")

    let role = msg.guild.members.get([0]) || args.join(" ");
    if(!role) return msg.channel.send(errorembed).then(message => {message.delete(12000)});
    msg.delete().catch(O_o=>{});  

    switch (role) {
    
        case 'Summoners War':
          let swembed = new Discord.RichEmbed()
          .setTitle("Réponse de la commande :")
          .setColor("#15f153")
          .addField(":white_check_mark: Vous avez reçus le rôle : Summoners War !", "👮Bravo vous avez obtenu un rôle !(Auto-destruction du message dans 20s.)");
          msg.channel.send(swembed).then(message => {message.delete(12000)}); 
          msg.member.addRole('525127518156750850');
        break;

        case 'Marvel Strike Force':
          let msfembed = new Discord.RichEmbed()
          .setTitle("Réponse de la commande :")
          .setColor("#15f153")
          .addField(":white_check_mark: Vous avez reçus le rôle : Marvel Strike Force !", "👮Bravo vous avez obtenu un rôle !(Auto-destruction du message dans 20s.)");
          msg.channel.send(msfembed).then(message => {message.delete(12000)}); 
          msg.member.addRole('Marvel Strike Force');
        break;

        case 'Marvel Future Fight':
          let mffembed = new Discord.RichEmbed()
          .setTitle("Réponse de la commande :")
          .setColor("#15f153")
          .addField(":white_check_mark: Vous avez reçus le rôle : Marvel Future Fight !", "👮Bravo vous avez obtenu un rôle !(Auto-destruction du message dans 20s.)");
          msg.channel.send(mffembed).then(message => {message.delete(12000)});  
          msg.member.addRole('Marvel Future Fight');
        break;

        case 'Heroes of the Storm':
          let hotsembed = new Discord.RichEmbed()
          .setTitle("Réponse de la commande :")
          .setColor("#15f153")
          .addField(":white_check_mark: Vous avez reçus le rôle : Heroes of the Storm !", "👮Bravo vous avez obtenu un rôle !(Auto-destruction du message dans 20s.)");
          msg.channel.send(hotsembed).then(message => {message.delete(12000)});
          msg.member.addRole('Heroes of the Storm');
        break;

        case 'Monster Hunter World':
          let mhwembed = new Discord.RichEmbed()
          .setTitle("Réponse de la commande :")
          .setColor("#15f153")
          .addField(":white_check_mark: Vous avez reçus le rôle : Monster Hunter World !", "👮Bravo vous avez obtenu un rôle !(Auto-destruction du message dans 20s.)");
          msg.channel.send(mhwembed).then(message => {message.delete(12000)});
          msg.member.addRole('Monster Hunter World');
        break;

        default:
          let defaultembed = new Discord.RichEmbed()
          .setTitle("Réponse de la commande :")
          .setColor("#bc0000")
          .addField(":x: Je ne trouve pas le rôle.", "👮Merci de contacter un Administrateur.(Auto-destruction du message dans 20s.)")
          msg.channel.send(defaultembed).then(message => {message.delete(12000)});
    }
        msg.delete().catch(O_o=>{}); 
}

function delrole (msg) { // En construction

    let args = msg.content.split(/\s+/).slice(1);
    let messageArray = msg.content.split(" ");

    if (args.length == 1) { 
        if (args[0].charAt(0) == config.prefix) 
            args[0] = args[0].slice(1);
    }

    let errorembed = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Vous n'avez pas mit le nom du rôle.", "👮Merci de refaire la commande avec le nom du rôle.")

    let role = msg.guild.members.get([0]) || args.join(" ");
    if(!role) return msg.channel.send(errorembed);
    msg.delete().catch(O_o=>{});  

    switch (role) {
    
        case 'Summoners War':
          let messageMembre1 = msg.author.username;
          let swembed = new Discord.RichEmbed()
          .setTitle("Réponse de la commande :")
          .setColor("#15f153")
          .addField(":white_check_mark: Vous avez retiré le rôle :  Summoners War !", "👮Bravo vous avez retiré un rôle !");
          messageMembre1.send(swembed); 
          msg.guild.roles.find(`name`, "525127518156750850");
        break;

        case 'Marvel Strike Force':
          let messageMembre2 = msg.author.username;
          let msfembed = new Discord.RichEmbed()
          .setTitle("Réponse de la commande :")
          .setColor("#15f153")
          .addField(":white_check_mark: Vous avez retiré le rôle :  Marvel Strike Force !", "👮Bravo vous avez retiré un rôle !");
          messageMembre2.send(msfembed); 
          msg.guild.roles.find(`name`, "525338096439525402");
        break;

        case 'Marvel Future Fight':
          let messageMembre3 = msg.author.username;
          let mffembed = new Discord.RichEmbed()
          .setTitle("Réponse de la commande :")
          .setColor("#15f153")
          .addField(":white_check_mark: Vous avez retiré le rôle :  Marvel Future Fight !", "👮Bravo vous avez retiré un rôle !");
          messageMembre3.send(mffembed);  
          msg.guild.roles.find(`name`, "525338309556174848");
        break;

        case 'Heroes of the Storm':
          let messageMembre4 = msg.author.username;
          let hotsembed = new Discord.RichEmbed()
          .setTitle("Réponse de la commande :")
          .setColor("#15f153")
          .addField(":white_check_mark: Vous avez retiré le rôle :  Heroes of the Storm !", "👮Bravo vous avez retiré un rôle !");
          messageMembre4.send(hotsembed);
          msg.guild.roles.find(`name`, "525338811761295370");
        break;

        case 'Monster Hunter World':
          let messageMembre5 = msg.author.username;
          let mhwembed = new Discord.RichEmbed()
          .setTitle("Réponse de la commande :")
          .setColor("#15f153")
          .addField(":white_check_mark: Vous avez retiré le rôle : Monster Hunter World !", "👮Bravo vous avez retiré un rôle !");
          messageMembre5.send(mhwembed);
          msg.guild.roles.find(`name`, "541667683205120030");
        break;

        default:
          let messageMembre6 = msg.author.username;
          let defaultembed = new Discord.RichEmbed()
          .setTitle("Réponse de la commande :")
          .setColor("#bc0000")
          .addField(":x: Je ne trouve pas le rôle.", "👮Merci de contacter un Administrateur.")
          messageMembre6.send(defaultembed);
    }
        msg.delete().catch(O_o=>{}); 
}
