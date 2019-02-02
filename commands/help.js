const commands = module.exports = {
    'aide': `
!aide
   Affiche la page de commande.`,

    'music': `
[Liste des commandes pour la musique]

!music | m <function>
   play <url> | <search> : Ajoute la chanson / la liste de lecture à la file d'attente.
   skip                  : Interrompre la chanson en cours
   pause                 : Met en pause la chanson.
   resume                : Reprendre la chanson.
   vol <0-100>           : Définit le volume.
   join                  : Le rejoint votre canal vocal.
   leave                 : Le bot quitte le canal vocal.
   
   //Commande pas encore débuguer.
   queue                 : Affiche la file d'attente de chansons.
   purge                 : Efface la file d'attente de chansons.
   np                    : Affiche le titre de la chanson en cours.`,

    'joueur': `
!joueur
   Donne le rôle joueur.`,
}

