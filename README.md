# Présentation 
L’idée était de faciliter l’accès à mon serveur aux nouveaux membres et aussi.
De proposer plusieurs commandes différentes pour les utilisateurs ainsi que
Pour les membres de l’équipe (STAFF) pour la modération avec la libs de
discord.js.

 Pour les nouveaux membres, j’ai mis en place plusieurs fonctionnalités :
- Message automatique de bienvenue pour accéder à la totalité du serveur.
- Système de réaction avec les émojis sur des messages ciblés.

J’ai réalisé plusieurs commandes pour les utilisateurs :

- Les commandes des reports pour reporter un bug sur le serveur ou sur le bot.
Transmises sur un canal visible par les membres de l’équipe (STAFF).
- Des commandes reliées à des APIs, par exemple avec Gyphy pour utiliser des
Gifs en ligne à partir de l’ID du GIF ou de mot-clé dans leur BDD.
- Des commandes pour récupérer ou retirer un rôle précis.

J’ai réalisé plusieurs commandes pour les membres de l’équipe (STAFF) :
- Les commandes de sanctions du type (KICK / BAN)
- Une commande qui supprime les messages sur un canal.
- Une commande qui permet d’envoyer un message privé à un utilisateur précis
Depuis le profil du bot.
- Les commandes de gestion des rôles (ajout/suppression) pour modifier les
Rôles d’un utilisateur.
> **Note:** Le bot n'est pas vraiment optimisé ! Et son développement est arrêté pour l'instant.

## Installation
Pour faire fonctionner les deux bots faudra utiliser NodeJs avec plusieurs modules différents avec la commande `npm install`.

Liste des modules installés dedans  :

- dotenv ( `npm install dotenv --save` )
- Libs discord ( `npm install discord.js --save` )
- Express pour le port du bot discord ( `npm install express --save`)
- Api de fornite ( `npm install fortnite --save`)
- Api de Giphy ( `npm install giphy-api --save` )

## Configuration

La configuration est très simple à faire, ça sera juste à modifier les informations dans le fichier `./config/config.json` tous est expliqué de dans  !

## Démarrage du bot 

Vous devrez utiliser la commande `node bot`!

## Liste des commandes 

Les commandes pour les membres de l'équipe sur le discord :

- `(prefix)clean` Supprime des messages en grande quantité.
- `(prefix)kick` Kick un utilisateur // EX : !kick @nom_de_la_personne_a_kick raison.
- `(prefix)ban` Ban un utilisateur // EX : !ban @nom_de_la_personne_a_ban raison.
- `(prefix)addrole_admin` donne un rôle à un membre. // EX : !addrole_admin @nom_de_la_personne_a_ban rôle (PAS DE MENTION POUR LE ROLE).
- `(prefix)delrole_admin` retire un rôle à un membre. // EX : !delrole_admin @nom_de_la_personne_a_ban rôle (PAS DE MENTION POUR LE ROLE).
- `(prefix)messageprivate` Envoi un message privé à un membre. // EX : !messageprivate @nom_de_la_personne_a_ban message.
 

>**Note:** Vue le bot n'est pas optimisé vous devrais changer les ID des salons pour les commandes kick et ban.

Les commandes pour les membres sur le discord :

- `(prefix)aide` voir les commandes du bot.
- `(prefix)reportmembre` Report d'un membre du serveur // EX : !reportmembre message.
- `(prefix)reportbug` Report un bug sur le discord ou sur le bot
- `(prefix)serverinfo` indique les informations du serveur.
- `(prefix)jeux`Permettre de proposée vos jeux pour les streams.
- `(prefix)mascotte` pour avoir le rôle 'Apprenti Mascotte' ou le retirer.
- `(prefix)aide_cmd` permettre de vous aider pour l'utilisation des commandes.
- `(prefix)avatar` permettre de voir votre photo de profils et d'avoir le lien.
- `(prefix)poudlard` permettre de vous choisir dans une classe de Harry Potter
- `(prefix)fortnite` pour voir vos statistiques sur fortnite ! (tous sont expliqués avec la simple commande.)
- `(prefix)gif`Pour utilisé les gifs. (tous sont expliqués avec la simple commande.)

>**Note:**  Le bot n'est pas optimisé vous devrais changer l'ID du rôle pour la commande mascotte et jeux le salon d’annonce des jeux puis les ID des salons des reports (reportbug et reportmembre).
