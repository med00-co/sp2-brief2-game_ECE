import { CLE_PARTIES , ecrire , lire  } from "./storage.js";
import { getJoueurParId } from "./players.js";

// first function ; it return the list of saved parts 
export const getParties = ()=> { return lire(CLE_PARTIES) || []}

// second function: it build the part object and add it to the list and save it
export const enregistrerPartie = ({ playerId , playerScore, computerScore, result }) =>{
    const partObject = {
        id : `g_${Date.now()}` ,
        playerId ,
        date : new Date().toISOString().slice(0, 16) , 
        playerScore ,
        computerScore ,
        result ,
    }
    ecrire(CLE_PARTIES , [...getParties() , partObject])
    return partObject ;
}

// third function , it returns the number of parts of a player
export const compterParties = (playerId)=>{
    let partie = getParties()
    return partie.filter((g)=> g.playerId == playerId).length  
}

// partie of filtering --------------------------------------------------

// supprimer partie
export const supprimerPartie = (id) => {
    let partiesIdAfterSupprime =  getParties().filter((pa)=>{ return pa.id !== id })
    ecrire(CLE_PARTIES, partiesIdAfterSupprime) ;
    return ;
}

// nomJoueur : return Joueur supprimée au lieu de nom de joueur après le supprimer
export const nomJoueur = (playerId) =>{
    let player = getJoueurParId(playerId)
    return player ? player.nickname : "Joueur supprimé"
    
}

// filter -----------------------------------------------------------------------
export const filtrerParties = ({ recherche = "" , resultat = "toutes", periode = "tout" } = {})=>{
    
    let parties = getParties()

    parties = parties.filter((p)=>
      nomJoueur(p.playerId).toLowerCase().includes(recherche.trim().toLowerCase())
    )
    
    parties = parties.filter((g)=>
      resultat === "toutes" || g.result === resultat
    )

    if(periode === "aujourdhui"){
        const aujourdhui = new Date().toISOString().slice(0, 10)
        parties = parties.filter((g)=> g.date.slice(0, 10) === aujourdhui)
    }
    else if(periode === "7jours" ){
        const  ilYa7Jours = Date.now() - 7 * 24 * 60 * 60 * 1000;
        parties = parties.filter((g)=> new Date(g.date).getTime() >= ilYa7Jours)
    }

    
    parties = parties.sort((a, b) => b.date.localeCompare(a.date))

    return parties ; 
   
}

