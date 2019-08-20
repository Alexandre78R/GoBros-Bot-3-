/*
Paramère à configurer pour le bot fonctionne :
- La connexion du bot sur twitch username et la clé (Ligne : "71")
- Nom du channel de twitch pour le bot (Ligne : "28")
- Clé du bot discord (Ligne : "44")
- L'id du channel log sur discord (Ligne : "51")
*/

//Api pour twitch
const tmi = require('tmi.js');

//Api discord
const Discord = require('discord.js');

//Nom du client pour discord 
const bot = new Discord.Client();

// Express pour gestion port de la partie discord 
const express = require("express");

//Utilisation app pour express
const app = express();

// Valeur null pour le canal de log sur discord
var ChannelLog = null;

//Nom de la chaine ou le bot fait la modération sur twitch
var channel = ""

//Génération du port random
app.set('port', (process.env.PORT || Math.floor(Math.random() * Math.floor(5000))))

app.listen(app.get('port'), function(){
    console.log(`[Discord] : Le bot fonctionne sur le port : ${app.get('port')} `);
})

//En cas d'erreur pour le bot discord
bot.on('warn', console.warn);
bot.on('error', console.error);
bot.on('disconnect', () => console.log('Je viens de me déconnecter, en m\'assurant que vous savez, je vais me reconnecter maintenant'));
bot.on('reconnecting', () => console.log('Je reconnecte maintenant !'));

//Clé du bot
bot.login('');

//Status du bot discord 
bot.on('ready', () => {
	//Génération du profils du bot sur discord.
	bot.user.setPresence({ game: { name: "En développement By Alexandre78R", type : "STREAMING", url: "https://www.twitch.tv/jaxoou"}});
	//Fix l'id du channel log sur discord
	ChannelLog = bot.channels.get("");
	
	//Vérification du channel de log sur discord
	if(ChannelLog === undefined){
		console.log("Attention vous n'avez pas définie le channel log ou il est introuvable !")
	}else{
		console.log(`[Discord] : Mise en place du channel log sur ${ChannelLog.name}`)
		console.log(`[Discord] : Connecté en tant que ${bot.user.tag}`)
	}
});

//Option à la connexion de twitch
const options = {
	options: {
		debug:true,
	},
	connection: {
		cluster: 'aws',
		reconnect: true,
	},
	identity: {
		username : '', //Username du bot sur twitch
		password: 'oauth:**********************************', //Clé oauth du bot 
	},
	channels : [channel],
};

//Mise en place du bot twitch avec les options sur client
const client = new tmi.client(options);

//Connexion du bot twitch
client.connect();

//Message d'allumage du bot sur le tchat twitch
client.on('connected', (adress, port) => {
    console.log("[Twitch] : " + client.getUsername() + " s'est connecté sur : " + adress + ", port : " + port);
    client.action(channel, 'Bonjour , je suis le bot en configuration. j"arrive avec le compte bot !');
});

//Commande test pour discord
bot.on('message', message => {

	if (message.content === '!test') {
		let reportEmbed = new Discord.RichEmbed()
		.setTitle("Test message")
		.setColor("#15f153")
		.addField("Test message", `test`)
		let reportschannel = message.guild.channels.find(`name`, "test-dev");
		if(!reportschannel) return message.channel.send(console.log("error channel"));

		reportschannel.send(reportEmbed);
		message.reply('test!');
	}

  });

  //Prefix de commande pour twitch 
  const prefix = "!";

  //Gestion prefix
  function commandParser(message){
    let prefixEscaped = prefix.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
    let regex = new RegExp("^" + prefixEscaped + "([a-zA-Z]+)\s?(.*)");
    return regex.exec(message);
  }
 
//Gestion des commandes sur twitch
client.on('chat', (channel, user, message, self) => {
	//Si le message via du bot il stop les fonctions.
	if (self) return;

	// client.say(channel, user['display-name'] + " a dit " + message );
	let commands = commandParser(message);

	//Les agument des commandes après le prefix
	if(commands){
		// Nom de la commande
		let command = commands[1];

		//Un paramètre mais désactivé pour raison que l'on utilise pas.
        // let param = commands[2];
		
		//Liste des commandes
        switch(command){

			//Commande de test
            case "test":
                client.say(channel, `${user['display-name']}, Vous avez taper la commande !test !`)
				ChannelLog.send("[LOG] : :tada: Un viewers à utilisé la commande test !**")
			break;
			
			//Message d'erreur si la commande n'existe pas.
            default:
               client.say(channel, `${user['display-name']}, La Commande '` + command + "'' est non reconnue. Tapez " + prefix + "help pour la liste des commandes de " + client.getUsername());
			   ChannelLog.send("[LOG] : La commande n'existe pas ! ")
		}
    }
	
});

//Event quand une personne sub sur la chaine twitch !
client.on("subscription", function (channel, username, method, message, userstate) {
	// Log sur discord
	ChannelLog.send(`[LOG] : ${username} a sub à la chaîne ! Son Message : ${message}`)
	//Message sur le tchat de twitch
    client.action(channel, `${username} a sub à la chaîne!`)
});

//Event quand une personne resub sur la chaine twitch !
client.on("resub", function (channel, username, months, message, userstate, methods) {
	// Log sur discord
    ChannelLog.send(`[LOG] : ${username} est sub à la chaîne depuis ${months} mois ! Son message : ${message}`)
	// Message sur le tchat de twitch
	client.action(channel, `${username} est sub à la chaîne depuis ${months} mois ! `)
});

//Event quand une personne donne des cheer sur la chaîne twitch !
client.on("cheer", function (channel, userstate, message) {
	// Log sur discord
    ChannelLog.send(`[LOG] : ${userstate.username} a donné ${userstate.bits} bits !`)
});

//Event quand une personne host sur la chaîne twitch !
client.on("hosted", function (channel, username, viewers, autohost) {
	// Message sur le tchat de twitch
	client.action(channel, ` Merci pour le host ${username} ! ( ${viewers} )`)
	ChannelLog.send(`[LOG] : Merci pour le host ${username} ! ( ${viewers} )`)
});

//Event quand une personne to sur la chaîne twitch !
client.on("timeout", (channel, username, reason, duration, userstate) => {
	// client.action(channel, `L'utilisateur "${username}" est to pendant ${duration} !`)
	if(duration === 1){
		ChannelLog.send(`[LOG] : L'utilisateur " ${username} " est to pendant ${duration} seconde ! `)
	}else{
		ChannelLog.send(`[LOG] : L'utilisateur " ${username} " est to pendant ${duration} secondes ! `)	
	}
});

//Event quand une personne deviens vip sur la chaîne twitch !
//Event non fontionnelle pour l'instant 
client.on("vips", (channel, vips) => {
	// client.action(channel, `L'utilisateur "${username}" est to pendant ${duration} !`)
	console.log(vips)
	// ChannelLog.send(`[LOG] : L'utilisateur "${vips}" est devenue vip !`)
});

// //Event quand une personne se follow !
// client.on("followersonly", (channel, enabled, length) => {
// 	console.log("Channel", channel)
// 	console.log("Enable",  enabled)
// 	console.log("Length", length)
// });

// Event quand une personne supprime un messages sur la chaîne twitch !
client.on("messagedeleted", (channel, username, deletedMessage, userstate) => {
    // Message LOGS
    ChannelLog.send(`[LOG] : Le message de ${username} a était supprimé. Il contenait: ${deletedMessage}`)
});

// Evvent quand une personne rejion là première fois la chaîne twitch
//Désactivé pour éviter les spams
// client.on("join", (channel, username, self) => {
// 	ChannelLog.send(`[LOG] : " ${username} " viens de rejoindre la chaîne de twitch !`)
// });