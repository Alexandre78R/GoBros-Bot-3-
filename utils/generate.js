var fs = require('fs');
const os = require('os');
const rp = require('request-promise');
const stripIndent = require('strip-indent');




var formattedItems = [];
var formattedSets = [];

module.exports = {
	'name': name,
    'aide': aide,
    'clean': clean,
    'kick': kick,
    'ban': ban,
    'reportm': reportm,
    'reportb': reportb,
    'server': server,
}
function name() {
        console.log("▁ ▂ ▃ ▄ ▅ ▆ ▇ BOT █ ▇ ▆ ▅ ▄ ▂ ▁");
}

function aide() {
        console.log("Chargement de la commande !aide ...");
        console.log("Chargement de la commande !aide (OK)");
}

function clean() {
        console.log("Chargement de la commande  !clean...");
        console.log("Chargement de la commande !clean (OK)");
}

function kick() {
        console.log("Chargement de la commande  !kick...");
        console.log("Chargement de la commande !kick (OK)");
}

function ban() {
        console.log("Chargement de la commande  !ban...");
        console.log("Chargement de la commande !ban (OK)");
}

function reportm() {
        console.log("Chargement de la commande  !reportmembre...");
        console.log("Chargement de la commande !reportmembre (OK)");
}

function reportb() {
        console.log("Chargement de la commande  !reportb...");
        console.log("Chargement de la commande !reportb (OK)");
}

function server() {
        console.log("Chargement de la commande  !serverinfo...");
        console.log("Chargement de la commande !serverinfo (OK)");
}