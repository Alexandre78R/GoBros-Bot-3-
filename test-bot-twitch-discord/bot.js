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

// app.listen(app.get('port'), function(){
//     console.log(`Le bot fonctionne sur le port : ${app.get('port')} `);
// })

//console allumage du bot sur discord
bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

//clé du bot
bot.login('clé du bot discord');

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
		username : '< pseudo du bot >',
		password: 'oauth:********************************',
	},
	channels : ['channels du bot'],
};

//Mise en place du bot twitch avec les options sur client
const client = new tmi.client(options);

//Connexion du bot twitch
client.connect();

//Message d'allumage du bot sur le tchat twitch
client.on('connected', (adress, port) => {
	client.action('channels du bot', 'Le bot est en ligne');
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

  //Gestion des commandes sur twitch
client.on('chat', (channel, user, message, self) => {
    //Commande test pour twitch
	if (message === '!test'){
		client.action('channels du bot', `${user['display-name']}, Vous avez taper la commande !test !`)
		console.log("test")
	}
});