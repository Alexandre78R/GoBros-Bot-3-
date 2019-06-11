const config = require('../config/config.json');
const cmds_adminconsole = require('../utils/generate').cmds_admin();
const aide_modoconsole = require('../utils/generate').aide_modo();
const kickconsole = require('../utils/generate').kick();
const banconsole = require('../utils/generate').ban();
const addroleconsole = require('../utils/generate').addrole();
const delroleconsole = require('../utils/generate').delrole();
const Discord = require("discord.js");

module.exports = {
    'aide_modo': aide_modo,
    'clean': clean,
    'kick': kick,
    'ban': ban,
    'addrole': addrole,
    'delrole': delrole,
    'messageprivate': messageprivate,
} 

//TODO Commande HELP pour modo ou admin.
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
      .setTitle("Réponse de la commande :")
      .setColor("#bc0000")
      .addField(":x: Tu n'as pas le droit de utilisé cette commande.", "👮 Bien essayer en tous cas.(Auto-destruction du message dans 20s.)")
      message.delete().catch(O_o=>{});

      if (!message.channel.permissionsFor(message.author).hasPermission("MANAGE_MESSAGES")) {
        message.channel.sendMessage(aide_modoPerm).then(message => {message.delete(12000)});
        console.log("Désolé, vous n'avez pas la permission d'exécuter la commande \""+message.content+"\"");
        return;
      }

    let aideembed = new Discord.RichEmbed()
    .setColor("#15f153")
    //.setThumbnail(sicon)
    .addField("!clean", "Suprime des messages en grande quantité.")
    .addField("!kick", "Kick un utilisateur // EX : !kick @nom_de_la_personne_a_kick raison.")
    .addField("!ban", "Ban un utilisateur // EX : !ban @nom_de_la_personne_a_ban raison.")
    .addField("!addrole_admin", "Donne un rôle à un membre. // EX : !addrole_admin @nom_de_la_personne_a_ban rôle (PAS DE MENTION POUR LE ROLE).")
    .addField("!delrole_admin", "Retire un rôle à un membre. // EX : !delrole_admin @nom_de_la_personne_a_ban rôle (PAS DE MENTION POUR LE ROLE).")
    .addField("!messageprivate", "Envoi un message privé à un membre. // EX : !messageprivate @nom_de_la_personne_a_ban message.")    

    message.channel.send(aideembed);

    return;

} 

//TODO Commande clean canal.
function clean (message) {
       if (message.length == 1){
           if (message[0].charAt(0) == config.prefix) 
               message[0] = message[0].slice(1);

      }    
          let cleanPerm = new Discord.RichEmbed()
          .setTitle("Réponse de la commande :")
          .setColor("#bc0000")
          .addField(":x: Tu n'as pas le droit de suprimer des messages !", "👮 Bien essayer en tous cas.(Auto-destruction du message dans 20s.)")
          message.delete().catch(O_o=>{});

       if (!message.channel.permissionsFor(message.author).hasPermission("MANAGE_MESSAGES")) {
        message.channel.sendMessage(cleanPerm).then(message => {message.delete(12000)});
        console.log("Désolé, vous n'avez pas la permission d'exécuter la commande \""+message.content+"\"");
        return;
      }

      if (message.channel.type == 'text') {
        message.channel.fetchMessages()
          .then(messages => {
            message.channel.bulkDelete(messages);
            messagesDeleted = messages.array().length;

            let messageyes = new Discord.RichEmbed()
            .setTitle("Réponse de la commande :")
            .setColor("#15f153")
            .addField(":white_check_mark: Suppression des messages réussie. Nombre total de messages supprimés:", +messagesDeleted)
            //.addField(":white_check_mark: Suppression des messages réussie. Nombre total de messages supprimés:" +messagesDeleted "!", ${message.author})
            message.delete().catch(O_o=>{});


            message.channel.sendMessage(messageyes).then(message => {message.delete(6000)});
            console.log('Suppression des messages réussie. Nombre total de messages supprimés '+messagesDeleted)
          })
          .catch(err => {
            console.log('Erreur lors de la suppression en bloc');
            console.log(err);
          });
      }
    };

//TODO Commande Kick du serveur
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
    .setTitle("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Tu n'as pas le droit de kick !", "👮 Bien essayer en tous cas.(Auto-destruction du message dans 20s.)")
    message.delete().catch(O_o=>{});


    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(kickPerm).then(message => {message.delete(12000)}); 

    let errMention = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Merci de mentionné un pseudo !", "👮Merci de refaire la commande avec une mention de un pseudo.(Auto-destruction du message dans 20s.)")
    message.delete().catch(O_o=>{});

    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send(errMention).then(message => {message.delete(12000)});
    
    let kickErrorMessage = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Vous n’avez pas mis de message en expliquant le kick.", "👮Merci de refaire la commande avec un message.(Auto-destruction du message dans 20s.)")
    message.delete().catch(O_o=>{});

    let kReason = message.guild.members.get([1]) || args.join(" ").slice(22);
    if(!kReason) return message.channel.send(kickErrorMessage) || message.delete(3600).catch(O_o=>{}); 

    let kickError = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Cette personne ne peut pas être kick !", "👮Merci de vérifié le profil.")
    message.delete().catch(O_o=>{});

    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(kickError).then(message => {message.delete(12000)});

    let kickEmbed = new Discord.RichEmbed()
    .setTitle("Info du Kick :")
    .setColor("#e56b00")
    .addField("Membre kick :", `${kUser}> ID : ${kUser.id}`)
    .addField("Kick par :", `<@${message.author.id}> ID : ${message.author.id}`)
    .addField("Canal :", message.channel)
    .addField("Kick :", message.createdAt)
    .addField("Raison :", kReason);

    let kickCanalErro = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Je ne trouve pas le canal d'envoi.", "👮Merci de contacter un Administrateur.(Auto-destruction du message dans 20s.)")
    message.delete().catch(O_o=>{});

    let kickChannel = message.guild.channels.find(`name`, "📝historique-sanction");
    if(!kickChannel) return message.channel.send(kickCanalErro).then(message => {message.delete(12000)});

    let kickValid = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#15f153")
    .addField(":white_check_mark: L'utilisateur a été kick !", "👮Ce kick a été sauvegarder.");
    message.channel.send(kickValid).then(message => {message.delete(12000)});

    message.delete().catch(O_o=>{});
    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);

    return;
  }
//TODO Commmande ban du serveur.
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
    .setTitle("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Tu n'as pas le droit de ban !", "👮 Bien essayer en tous cas.(Auto-destruction du message dans 20s.)")
    message.delete().catch(O_o=>{});

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(banPerm).then(message => {message.delete(12000)}); 

    let errMention = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Merci de mentionné un pseudo !", "👮Merci de refaire la commande avec une mention de un pseudo.(Auto-destruction du message dans 20s.)")
    message.delete().catch(O_o=>{});

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send(errMention).then(message => {message.delete(12000)});

    let banErrorMessage = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Vous n’avez pas mis de message en expliquant le ban.", "👮Merci de refaire la commande avec un message.(Auto-destruction du message dans 20s.)")
    message.delete().catch(O_o=>{});

    let bReason = message.guild.members.get([1]) || args.join(" ").slice(22);
    if(!bReason) return message.channel.send(banErrorMessage) || message.delete(3600).catch(O_o=>{});

    let banError = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Cette personne ne peut pas être ban !", "👮Merci de vérifié le profil.(Auto-destruction du message dans 20s.)")

    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(banError).then(message => {message.delete(12000)});


    let banEmbed = new Discord.RichEmbed()
    .setTitle("Info du Ban :")
    .setColor("#bc0000")
    .addField("Membre Banni :", `${bUser}> ID : ${bUser.id}`)
    .addField("Banni par :", `<@${message.author.id}> ID : ${message.author.id}`)
    .addField("Canal :", message.channel)
    .addField("Ban le :", message.createdAt)
    .addField("Raison :", bReason);

    let banCanalErro = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Je ne trouve pas le canal d'envoi.", "👮Merci de contacter un Administrateur.(Auto-destruction du message dans 20s.)")

    let incidentchannel = message.guild.channels.find(`name`, "📝historique-sanction");
    if(!incidentchannel) return message.channel.send(banCanalErro).then(message => {message.delete(12000)});;

    let banValid = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#15f153")
    .addField(":white_check_mark: L'utilisateur a été banni !", "👮Ce bannisement a été sauvegarder.");
    message.channel.send(banValid);

    message.delete().catch(O_o=>{});
    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);


    return;
}
//TODO Commande pour ajouté un role à un membre
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
    .setTitle("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Tu n'as pas le droit de donner de rôle !", "👮 Bien essayer en tous cas.(Auto-destruction du message dans 20s.)")

    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(addrolePerm).then(message => {message.delete(12000)});
    message.delete().catch(O_o=>{});  

    let addroleErrorMembre = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Vous n'avez pas mit un nom de Membre.", "👮 Merci de refaire la commande avec le nom d'un Membre.(Auto-destruction du message dans 20s.)")

    let membreError = argsMembre.join(" ").slice(22);
    if (!membreError) return message.channel.send(addroleErrorMembre).then(message => {message.delete(12000)});
    message.delete().catch(O_o=>{});

    let addroleErrorMembreIntrouvable = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Le nom de se Membre n'est pas trouvable.", "👮 Merci de refaire la commande avec le nom d'un Membre trouvable.(Auto-destruction du message dans 20s.)")

    let roleMembre = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if (!roleMembre) return message.channel.send(addroleErrorMembreIntrouvable).then(message => {message.delete(12000)});
    message.delete().catch(O_o=>{});

    let roleError = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Vous n'avez pas mit le nom du Role.", "👮 Merci de refaire la commande avec le nom d'un Role.(Auto-destruction du message dans 20s.)")

    let role = argsRole.join(" ").slice(22);
    if (!role) return message.channel.send(roleError).then(message => {message.delete(12000)});
    message.delete().catch(O_o=>{});

    let roleErrorIntrovable = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Le nom de se rôle est introuvable.", "👮 Merci de refaire la commande avec le nom d'un rôle trouvable.(Auto-destruction du message dans 20s.)")
   
    let getRole = message.guild.roles.find(`name`, role);
    if (!getRole) return message.channel.send(roleErrorIntrovable).then(message => {message.delete(12000)});
    message.delete().catch(O_o=>{});

    let roleErrorUnique = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(`:x: Ce Membre à déjà le rôle " ${getRole.name} ".`, "👮 Merci de lui donner un autre rôle.(Auto-destruction du message dans 20s.)")

    if (roleMembre.roles.has(getRole.id)) return message.channel.send(roleErrorUnique).then(message => {message.delete(12000)});
        roleMembre.addRole(getRole.id);
        message.delete().catch(O_o=>{});

    let addRoleMembre = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#15f153")
    .addField(`:white_check_mark: Le rôle ${getRole.name} a été donner à ${roleMembre.user.username} !`, "👮 Le rôle a été bien donner.")

    message.channel.send(addRoleMembre);
    message.delete().catch(O_o=>{});
}
//TODO Commande pour supprimé un role à un membre
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
    .setTitle("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Tu n'as pas le droit de donner de rôle !", "👮 Bien essayer en tous cas.(Auto-destruction du message dans 20s.)")

    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(delrolePerm).then(message => {message.delete(12000)});
    message.delete().catch(O_o=>{});  

    let delroleErrorMembre = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Vous n'avez pas mit un nom de Membre.", "👮 Merci de refaire la commande avec le nom d'un Membre.(Auto-destruction du message dans 20s.)")

    let membreError = argsMembre.join(" ").slice(22);
    if (!membreError) return message.channel.send(delroleErrorMembre).then(message => {message.delete(12000)});
    message.delete().catch(O_o=>{});

    let delroleErrorMembreIntrouvable = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Le nom de se Membre n'est pas trouvable.", "👮 Merci de refaire la commande avec le nom d'un Membre trouvable.(Auto-destruction du message dans 20s.)")

    let roleMembre = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if (!roleMembre) return message.channel.send(delroleErrorMembreIntrouvable).then(message => {message.delete(12000)});
    message.delete().catch(O_o=>{});

    let roleError = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Vous n'avez pas mit le nom du Role.", "👮 Merci de refaire la commande avec le nom d'un Role.(Auto-destruction du message dans 20s.)")

    let role = argsRole.join(" ").slice(22);
    if (!role) return message.channel.send(roleError).then(message => {message.delete(12000)});
    message.delete().catch(O_o=>{});

    let roleErrorIntrovable = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Le nom de se rôle est introuvable.", "👮 Merci de refaire la commande avec le nom d'un rôle trouvable.(Auto-destruction du message dans 20s.)")
   
    let getRole = message.guild.roles.find(`name`, role);
    if (!getRole) return message.channel.send(roleErrorIntrovable).then(message => {message.delete(12000)});
    message.delete().catch(O_o=>{});

    let roleErrorUnique = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(`:x: Ce Membre n'a pas le rôle " ${getRole.name} ".`, "👮 Merci de lui retirer un autre rôle.(Auto-destruction du message dans 20s.)")

    if (!roleMembre.roles.has(getRole.id)) return message.channel.send(roleErrorUnique).then(message => {message.delete(12000)});
        roleMembre.removeRole(getRole.id);
        message.delete().catch(O_o=>{});

    let delRoleMembre = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#15f153")
    .addField(`:white_check_mark: Le rôle ${getRole.name} a été retirer à ${roleMembre.user.username} !`, "👮 Le rôle a été bien retirer.")

    message.channel.send(delRoleMembre);
    message.delete().catch(O_o=>{});
}
//TODO Commande pour envoyer un message privé à un membre par le bot.
function messageprivate (message) { // en cours développement 

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let argsMembre = messageArray.slice(1);
  let argsMessage = messageArray.slice(2);
 
  if(message.author.bot) return;
    if(message.channel.type === "dm") return;

         if (message.length == 1){
             if (message[0].charAt(0) == config.prefix) 
                 message[0] = message[0].slice(1);

  } 

    let messagePrvatePerm = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Tu n'as pas le droit de donner d'envoyer unn message !", "👮 Bien essayer en tous cas.(Auto-destruction du message dans 20s.)")

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(messagePrvatePerm).then(message => {message.delete(12000)});

    let messagePrvateErrorMembre = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Vous n'avez pas mit un nom de Membre.", "👮 Merci de refaire la commande avec le nom d'un Membre.(Auto-destruction du message dans 20s.)")

    let membreError = argsMembre.join(" ").slice(22);
    if (!membreError) return message.channel.send(messagePrvateErrorMembre).then(message => {message.delete(12000)});
   // message.delete().catch(O_o=>{});

    let messagePrvateErrorMembreIntrouvable = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Le nom de se Membre n'est pas trouvable.", "👮 Merci de refaire la commande avec le nom d'un Membre trouvable.(Auto-destruction du message dans 20s.)")

    let messageMembre = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[2]);
    if (!messageMembre) return message.channel.send(messagePrvateErrorMembreIntrouvable).then(message => {message.delete(12000)});
    //message.delete().catch(O_o=>{});

    let messageError = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Vous n'avez pas mit le message", "👮 Merci de refaire la commande avec le message.(Auto-destruction du message dans 20s.)")

    let messageEmbed = argsMessage.join(" ").slice();
    if (!messageEmbed) return message.channel.send(messageError).then(message => {message.delete(12000)});
    //message.delete().catch(O_o=>{});
    /*
    let messageErrorCaractere = new Discord.RichEmbed()
    .setTitle("Réponse de la commande :")
    .setColor("#bc0000")
    .addField(":x: Le message est trop gros. ", "👮 Merci de refaire la commande avec un message plus court.")*/

    let messagePrvateMembre = new Discord.RichEmbed()
    .setTitle(`Message de ${message.author.username} :`)
    .setColor("#15f153")
    .setDescription(messageEmbed)
    .setFooter("👮 Cordialement l'équie du Discord de GoBrosTv.");

     messageMembre.send(messagePrvateMembre);
     message.delete().catch(O_o=>{});
}