const tmi = require('tmi.js');
/*
const Discord = require('discord.js');
const bots = new Discord.Client();

const express = require("express");
const app = express();

app.set('port', (process.env.PORT || Math.floor(Math.random() * Math.floor(5000))))

app.listen(app.get('port'), function(){
    console.log(`Le bot fonctionne sur le port : ${app.get('port')} `);
})

bots.on('ready', () => {
  console.log(`Logged in as ${bots.user.tag}!`);
});

bots.login('');

	function messageTEST (message) {
 		 if(message.channel.type === "dm") return;

		/*	let messagechannel = message.guild.channels.find(`name`, "test-dev");
			messagechannel.send("coucou je test");
			
			message.channel.send("Test");
			console.log("messageTEST");
	}
*/
const options = {
	options: {
		debug:true,
	},
	connection: {
		cluster: 'aws',
		reconnect: true,
	},
	identity: {
		username : '',
		password: '',
	},
	channels : [''],
};

const client = new tmi.client(options);

client.connect();

client.on('connected', (adress, port) => {
	//client.action('', 'Bonjour , je suis le bot en configuration. j"arrive avec le compte bot !');
});

client.on('chat', (channel, user, message, self) => {
	if (message === '!test'){
		client.action('', `${user['display-name']}, Vous avez taper la commande !test !`);
	}
		if (message === '!class'){
			var calcul = Math.floor(Math.random() * Math.floor(5));

		switch (calcul) {

        case 1:
        	client.action('', `${user['display-name']}, Vous avez été reçus chez Gryffondor !`);
        break;
        	
        case 2:
        	client.action('', `${user['display-name']}, Vous avez été reçus chez Serpentard !`);
        break;

        case 3:
        	client.action('', `${user['display-name']}, Vous avez été reçus chez Poufsouffle !`);
        break;

        case 4:
        	client.action('', `${user['display-name']}, Vous avez été reçus chez Serdaigle !`);
        break;
           
      default:
      		client.action('', `${user['display-name']}, Vous avez été refusé pour rentrer chez Poudlard ! Re tenter votre chance plu tard !`);
		//client.action('', 'Vous avez taper la commande !test !');
	}
	//client.action('', `Salut ${user['display-name']} !`);
	}
			var messageArray = message.split(":");
  			var cmd = messageArray[0];
  			var argsName = messageArray.slice(0);

			if (message == '!sort' && argsName.join("")){
			var calcul = Math.floor(Math.random() * Math.floor(5));
		/*
  			let name = argsName.join(" ").slice();
   			if (!name) return client.action('', `${user['display-name']}, vous n'avez pas mi de cible du sort.`);
*/
		switch (calcul) {

        case 1:
        	client.action('', `${user['display-name']}, Vous avez jetter le sort n°1 sur ${argsName.join(':')[1]}!`);
        break;
        	
        case 2:
        	client.action('', `${user['display-name']}, Vous avez jetter le sort n°2 sur ${argsName.join(':')[1]} !`);
        break;

        case 3:        
        	client.action('', `${user['display-name']}, Vous avez jetter le sort n°3 sur ${argsName.join(':')[1]} !`);
        break;

        case 4:
        	client.action('', `${user['display-name']}, Vous avez jetter le sort n°4 sur ${argsName.join(':')[1]} !`);
        break;
           
      default:
      		client.action('', `${user['display-name']}, Vous n'avez pas réusie à touché votre cible, dommage réessayer plus tard...`);
		//client.action('', 'Vous avez taper la commande !test !');
	}
	//client.action('', `Salut ${user['display-name']} !`);
	}
	if (message === '!discord'){
		client.action('', 'Pour rejoindre le discord : https://discord.gg/5pKPqsw !');
	}
	if (message === '!code'){
		client.action('', 'Pour apprendre à  codé : https://www.youtube.com/watch?v=aeePeVUW6-k !');
	}
	if (message === '!swbatiment'){
		client.action('', 'Ne jamais faire sa : https://www.youtube.com/watch?v=MUPZgEJaj20 !');
	}
	if (message === '!vip'){
		client.action('go_bros', `Chut : ${user['display-name']} `);
	}
	if (message === '!question'){
		client.action('', `Chut : ${user['display-name']} `);
	}
	if (message === '!event'){
		client.action('', `${user['display-name']}, https://facts.be/fr/`);
	}
});

function timeOut(message) {
    splitMSG = message.split(" ");
    timeoutUserName = splitMSG[1];
    timeoutDuration = splitMSG[2];
    client.timeout("", timeoutUserName, timeoutDuration);
    client.action('', timeoutUserName + "c'est fait ban pendant : " + timeoutDuration);
}