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
bot.login('clé discord');

//Status du bot discord 
bot.on('ready', () => {
	bot.user.setPresence({ game: { name: "En développement By Alexandre78R", type : "STREAMING", url: "https://www.twitch.tv/jaxoou"}});
	console.log(`[Discord] : Connecté en tant que ${bot.user.tag}`)
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
		username : 'username',
		password: 'oauth:***************************',
	},
	channels : ['alexandre78rg'],
};

//Mise en place du bot twitch avec les options sur client
const client = new tmi.client(options);

//Connexion du bot twitch
client.connect();

//Message d'allumage du bot sur le tchat twitch
client.on('connected', (adress, port) => {
    console.log("[Twitch] : " + client.getUsername() + " s'est connecté sur : " + adress + ", port : " + port);
    client.action('alexandre78rg', 'Bonjour , je suis le bot en configuration. j"arrive avec le compte bot !');
});

//Commande test pour discord
bot.on('message', message => {
	if (message.content === 'c!test') {
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

  //Gestion log discord
  function log(){
	// bot.on('message', msg => {
	// 	let reportEmbed = new Discord.RichEmbed()
	// 	.setTitle("Test message")
	// 	.setColor("#15f153")
	// 	.addField("Test message", `test`)
	// 	let reportschannel = msg.guild.channels.find(`name`, "test-dev");
	// 	if(!reportschannel) return msg.channel.send(console.log("error channel"));

	// 	reportschannel.send(reportEmbed);
	// });
	console.log("Test Log")
  }
 
//Gestion des commandes sur twitch
client.on('chat', (channel, user, message, self) => {
	//Si le message via du bot il stop les fonctions.
	if (self) return;

	// client.say(channel, user['display-name'] + " a dit " + message );
	let commands = commandParser(message);

	//Les agument des commandes après le prefix
	if(commands){
        let command = commands[1];
        // let param = commands[2];
		
		//Liste des commandes
        switch(command){

			//Commande de test
            case "test":
                client.say(channel, `${user['display-name']}, Vous avez taper la commande !test !`)
				log();
				// bot.on('ready', () => { console.log("test")});
			break;
			
			//Message d'erreur si la commande n'existe pas.
            default:
               client.say(channel, `${user['display-name']}, La Commande '` + command + "'' est non reconnue. Tapez " + prefix + "help pour la liste des commandes de " + client.getUsername());
        }
    }
	
});
