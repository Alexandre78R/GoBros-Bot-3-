const config = require('../config/config.json');
const cmds_adminconsole = require('../utils/generate').cmds_admin();
const aide_modoconsole = require('../utils/generate').aide_modo();
const kickconsole = require('../utils/generate').kick();
const banconsole = require('../utils/generate').ban();
const reactaddroleconsole = require('../utils/generate').reactaddrole();
const addroleconsole = require('../utils/generate').addrole();
const delroleconsole = require('../utils/generate').delrole();
const stripIndent = require('strip-indent');
const os = require('os');
const Discord = require("discord.js");

module.exports = {
    'aide_modo': aide_modo,
    'clean': clean,
    'kick': kick,
    'ban': ban,
    'reactaddrole': reactaddrole,
    'addrole': addrole,
    'delrole': delrole,
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

      let aide_modoPerm = new Discord.RichEmbed()
      .setDescription("Réponse de la commande :")
      .setColor("#bc0000")
      .addField(":x: Tu n'as pas le droit de utilisé cette commande.", "👮 Bien essayer en tous cas.")
      message.delete().catch(O_o=>{});

      if (!message.channel.permissionsFor(message.author).hasPermission("MANAGE_MESSAGES")) {
        message.channel.sendMessage(aide_modoPerm);
        console.log("Désolé, vous n'avez pas la permission d'exécuter la commande \""+message.content+"\"");
        return;
      }

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

function reactaddrole (message){ // !reactaddrole idmessage :smiley: @role  encore en développement !

if(message.author.bot) return;
  if(message.channel.type === "dm") return;

       if (message.length == 1){
           if (message[0].charAt(0) == config.prefix) 
               message[0] = message[0].slice(1);

      } 

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let argsid = messageArray.slice(1, 2);
    let argsemoji = messageArray.slice(2, 3);
    let argsrole = messageArray.slice(3);

    let errorid = new Discord.RichEmbed()
    .setDescription("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: ERROR ID", "👮 ERROR ID")
   // message.delete().catch(O_o=>{});

    let erroremoji = new Discord.RichEmbed()
    .setDescription("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: ERROR EMOJI", "👮 ERROR EMOJI")
  //  message.delete().catch(O_o=>{});

    let errorrole = new Discord.RichEmbed()
    .setDescription("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: ERROR ROLE", "👮 ERROR ROLE")
   // message.delete().catch(O_o=>{});

    let id = message.guild.members.get([1]) || argsid.join(" ");
    if(!id) return message.channel.send(errorid); 

    let emoji = message.guild.members.get([2]) || argsemoji.join(" ");
    if(!emoji) return message.channel.send(erroremoji); 

    let role = message.guild.members.get([3]) || argsrole.join(" ");
    if(!role) return message.channel.send(errorrole); 

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Info réaction role:")
    .setColor("#15f153")
    .addField("ID :", id)
    .addField("EMOJI :", emoji)
    .addField("ROLE :", role);

     // message.reaction.get(emoji);
    

    let canalerror = new Discord.RichEmbed()
    .setDescription("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Je ne trouve pas le canal d'envoi.", "👮Merci de contacter un Administrateur.")
    //message.delete().catch(O_o=>{});

    let reportschannel = message.guild.channels.find(`name`, "test-dev");
    if(!reportschannel) return message.channel.send(canalerror);

    //message.delete().catch(O_o=>{}); 
    reportschannel.send(reportEmbed);
    return;
}

function addrole (message){ // !addrole @pseudo nom_du_role

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let argsMembre = messageArray.slice(0);
  let argsRole = messageArray.slice(1);

  if(message.author.bot) return;
    if(message.channel.type === "dm") return;

         if (message.length == 1){
             if (message[0].charAt(0) == config.prefix) 
                 message[0] = message[0].slice(1);

  } 

    let addrolePerm = new Discord.RichEmbed()
    .setDescription("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Tu n'as pas le droit de donner de rôle !", "👮 Bien essayer en tous cas.")

    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(addrolePerm);
    message.delete().catch(O_o=>{});  

    let addroleErrorMembre = new Discord.RichEmbed()
    .setDescription("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Vous n'avez pas mit un nom de Membre.", "👮 Merci de refaire la commande avec le nom d'un Membre.")

    let membreError = argsMembre.join(" ").slice(22);
    if (!membreError) return message.channel.send(addroleErrorMembre);
    message.delete().catch(O_o=>{});

    let addroleErrorMembreIntrouvable = new Discord.RichEmbed()
    .setDescription("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Le nom de se Membre n'est pas trouvable.", "👮 Merci de refaire la commande avec le nom d'un Membre trouvable.")

    let roleMembre = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if (!roleMembre) return message.channel.send(addroleErrorMembreIntrouvable);
    message.delete().catch(O_o=>{});

    let roleError = new Discord.RichEmbed()
    .setDescription("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Vous n'avez pas mit le nom du Role.", "👮 Merci de refaire la commande avec le nom d'un Role.")

    let role = argsRole.join(" ").slice(22);
    if (!role) return message.channel.send(roleError);
    message.delete().catch(O_o=>{});

    let roleErrorIntrovable = new Discord.RichEmbed()
    .setDescription("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Le nom de se rôle est introuvable.", "👮 Merci de refaire la commande avec le nom d'un rôle trouvable.")
   
    let getRole = message.guild.roles.find(`name`, role);
    if (!getRole) return message.channel.send(roleErrorIntrovable);
    message.delete().catch(O_o=>{});

    let roleErrorUnique = new Discord.RichEmbed()
    .setDescription("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(`:x: Ce Membre à déjà le rôle " ${getRole.name} ".`, "👮 Merci de lui donner un autre rôle.")

    if (roleMembre.roles.has(getRole.id)) return message.channel.send(roleErrorUnique);
        roleMembre.addRole(getRole.id);
        message.delete().catch(O_o=>{});

    let addRoleMembre = new Discord.RichEmbed()
    .setDescription("Réponse de la commande :")
    .setColor("#15f153")
    .addField(`:white_check_mark: Le rôle ${getRole.name} a été donner à ${roleMembre.user} !`, "👮 Le rôle a été bien donner.")

    message.channel.send(addRoleMembre);
    message.delete().catch(O_o=>{});
}

function delrole (message){ // !delrole @pseudo nom_du_role

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let argsMembre = messageArray.slice(0);
  let argsRole = messageArray.slice(1);

  if(message.author.bot) return;
    if(message.channel.type === "dm") return;

         if (message.length == 1){
             if (message[0].charAt(0) == config.prefix) 
                 message[0] = message[0].slice(1);

  } 

    let delrolePerm = new Discord.RichEmbed()
    .setDescription("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Tu n'as pas le droit de donner de rôle !", "👮 Bien essayer en tous cas.")

    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(delrolePerm);
    message.delete().catch(O_o=>{});  

    let delroleErrorMembre = new Discord.RichEmbed()
    .setDescription("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Vous n'avez pas mit un nom de Membre.", "👮 Merci de refaire la commande avec le nom d'un Membre.")

    let membreError = argsMembre.join(" ").slice(22);
    if (!membreError) return message.channel.send(delroleErrorMembre);
    message.delete().catch(O_o=>{});

    let delroleErrorMembreIntrouvable = new Discord.RichEmbed()
    .setDescription("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Le nom de se Membre n'est pas trouvable.", "👮 Merci de refaire la commande avec le nom d'un Membre trouvable.")

    let roleMembre = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if (!roleMembre) return message.channel.send(delroleErrorMembreIntrouvable);
    message.delete().catch(O_o=>{});

    let roleError = new Discord.RichEmbed()
    .setDescription("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Vous n'avez pas mit le nom du Role.", "👮 Merci de refaire la commande avec le nom d'un Role.")

    let role = argsRole.join(" ").slice(22);
    if (!role) return message.channel.send(roleError);
    message.delete().catch(O_o=>{});

    let roleErrorIntrovable = new Discord.RichEmbed()
    .setDescription("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Le nom de se rôle est introuvable.", "👮 Merci de refaire la commande avec le nom d'un rôle trouvable.")
   
    let getRole = message.guild.roles.find(`name`, role);
    if (!getRole) return message.channel.send(roleErrorIntrovable);
    message.delete().catch(O_o=>{});

    let roleErrorUnique = new Discord.RichEmbed()
    .setDescription("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(`:x: Ce Membre n'a pas le rôle " ${getRole.name} ".`, "👮 Merci de lui retirer un autre rôle.")

    if (!roleMembre.roles.has(getRole.id)) return message.channel.send(roleErrorUnique);
        roleMembre.removeRole(getRole.id);
        message.delete().catch(O_o=>{});

    let delRoleMembre = new Discord.RichEmbed()
    .setDescription("Réponse de la commande :")
    .setColor("#15f153")
    .addField(`:white_check_mark: Le rôle ${getRole.name} a été retirer à ${roleMembre.user} !`, "👮 Le rôle a été bien retirer.")

    message.channel.send(delRoleMembre);
    message.delete().catch(O_o=>{});
}