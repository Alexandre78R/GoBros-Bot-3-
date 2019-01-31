const https = require('https');
const request = require('request');

const apiBaseUrl = 'https://ow-api.herokuapp.com/';
const apiType = 'profile';

const platformOptions = ['pc', 'xbl', 'psn'];
let platform;

const regionOptions = ['us', 'eu', 'kr', 'cn', 'global'];
let region;
const stripIndent = require('strip-indent');
const os = require('os');
const Discord = require("discord.js");
let buildAPIUrl = (battleTag) => {
  return apiBaseUrl + apiType + '/' + platform + '/' + region + '/' + battleTag;
};

module.exports = (message, callback) => {

  let msgParts = message.split(' ');

  let battleTag = null;
  platform = platformOptions[0];
  region = regionOptions[0];

  // Part user's options
  msgParts.forEach( (item) => {
    if (item.indexOf('#') > -1) {
      battleTag = item.replace('#', '-');
    } else if (item.indexOf('platform=') > -1) {
      platform = item.split('=').pop();
    } else if (item.indexOf('region=') > -1) {
      region = item.split('=').pop();
    }
  });

  // Check user's options for validity
  if (!battleTag) {
    return callback('Invalid BattleTag', 'Please provide a valid BattleTag. Ex: User#1234')
  } else {
    if (platformOptions.indexOf(platform) == -1)
      return callback('Invalid Platform', 'Platform invalid, allowed options are: ' + platformOptions.join(' '));
    if (regionOptions.indexOf(region) == -1)
      return callback('Invalid Region', 'Region invalid, allowed options are: ' + regionOptions.join(' '));
  }

  let url = buildAPIUrl(battleTag);
  console.log('Getting stats from URL: ' + url);

  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // For API errors, send back the error to the user
      let statsJSON = JSON.parse(body);
      if (statsJSON.statusCode == 404)
        return callback('API Error: ' + statsJSON.statusCode + ' - ' + statsJSON.error, statsJSON.error);

      // Stats were returned okay, let's parse them
      let stats = statsJSON;
      let statLevel = stats.level;
      let statPortrait = stats.portrait;
      let statCompRank = stats.competitive.rank;
      let statCompRecord = stats.games.competitive.won + 'W';
      let statCompWon = stats.games.competitive.lost +'L';
      let statCompDraw = stats.games.competitive.draw + 'D';
      let statCompWinrate = (stats.games.competitive.won / stats.games.competitive.played * 100).toFixed(2) + '%';
      let statCompTime = stats.playtime.competitive;
      let statQuickplayWins = stats.games.quickplay.won;
      let statQuickplayLost = stats.games.quickplay.lost;
      let statQuickTime = stats.playtime.quickplay;
      let statlevelframe = stats.levelFrame;
      let statRankImg = stats.competitive.rank_img;
     // let statRankImg2 = (+ 'https://d1u1mce87gyfbn.cloudfront.net/game/rank-icons/season-2/rank-1.png' + = ':BRONZE:'; + 'https://d1u1mce87gyfbn.cloudfront.net/game/rank-icons/season-2/rank-2.png'+ = ':SILVER:'; +'https://d1u1mce87gyfbn.cloudfront.net/game/rank-icons/season-2/rank-3.png' + = ':GOLD:')'';
      let statRankImg2 = stats.competitive.rank_img;
      let statStar = stats.star;

      // Format the string we are going to return to the user
/*
 let statsString = '';
    // statsString += '```';
      statsString += '**' + stats.username + '**\n';
      statsString += 'Portrait : **' + stats.portrait + '**\n';
      statsString += 'Niveau : **' + statLevel + '** | Image de la Bordure du Niveau :**' + stats.levelFrame + '** \n';
      statsString += 'Image du Prestige : **' + stats.star + '**\n';
      statsString += 'Classement compétitif: **' + statCompRank + '** | Image du Grade : ' + statRankImg2 + ' **' + stats.competitive.rank_img + '**\n';
      statsString += 'Victoire en partie rapide : **' + statQuickplayWins + ' victoires !**\n';
      statsString += 'Infos compétitif (saison en cours) : **' + stats.games.competitive.played + ' jouer !** | Détail : **' + stats.games.competitive.won+ ' victoires !** | ** ' + stats.games.competitive.lost+ ' défaites !** | ** ' + stats.games.competitive.draw+ ' égalités !** | ** ' + statCompWinrate+ ' Winrate ! ** \n';
      statsString += '**' + statCompTime + '** jouer en Partie Competitive | ' + '**' + statQuickTime + '** jouer en Partie rapide'
     // statsString += '```';*/
    let reportEmbed = new Discord.RichEmbed()
    .setDescription('Info du profils de **' + stats.username + '**\n')
    .setColor("#bc0000")
    .setThumbnail(+ statPortrait + '**\n')
    .addField("Niveau :", '**' + statLevel + '**\n')
    .addField("Classement compétitif :", '**' + statCompRank + '**\n')
    .addField("Victoire en partie rapide :", '**' + statQuickplayWins + 'victoire !**\n')
    .addField("Infos compétitif (saison en cours) : ", '**' + stats.games.competitive.played + ' jouer !** | Détail : **' + stats.games.competitive.won+ ' victoires !** | ** ' + stats.games.competitive.lost+ ' défaites !** | ** ' + stats.games.competitive.draw+ ' égalités !** | ** ' + statCompWinrate+ ' Winrate ! ** \n')
    .addField('' + statCompTime + '** jouer en Partie Competitive | ' , '**' + statQuickTime + '** jouer en Partie rapide');
    
    message.channel.send(reportEmbed)

     // return callback(null, statsString);
    } else {
      return callback(error || response.statusCode, null);
    }
  });

}