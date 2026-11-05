import { CLE_PARTIES , ecrire , lire  } from "./storage.js";

// first function ; it return the list of saved parts 
export const getParties = ()=> { return lire(CLE_PARTIES) }

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
