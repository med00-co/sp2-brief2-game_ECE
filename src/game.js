export const EMPEREUR_CARD = "empereur"
export const CITIZEN_CARD = "citoyen"
export const SLAVE_CARD = "esclave"
// hadi hiya li kat returner lina victoire wla game over wla ta3adol 
export const duel = (carteJoueur, carteOrdi) =>{
    if(carteJoueur== EMPEREUR_CARD && carteOrdi== CITIZEN_CARD){
        return 'victoire';
    }
    if(carteJoueur== SLAVE_CARD && carteOrdi == EMPEREUR_CARD){
        return 'victoire';
    }
    else if(carteJoueur == CITIZEN_CARD && carteOrdi == SLAVE_CARD){
        return 'victoire'
    }
    else if(carteJoueur == carteOrdi){
        return 'égalité';
    }
    else{
        return 'défaite';
    }
}


// hadi kat returner lina masfofa fiha 5 lwra9 bash ghanl3bo
export const creerMain = (camp) =>{
    const specialCardCamp = camp === EMPEREUR_CARD ? EMPEREUR_CARD : SLAVE_CARD
    const  quatreCitizen = Array(4).fill(CITIZEN_CARD)
    const  campCards = [...quatreCitizen , specialCardCamp]
    return(campCards);
}

// lmo3askar dyal la3ib: hiya li kat3tih lwra9 li ghayl3B BIHOW WACH FIHOM 3bd wla emperor
const getCamp = (manche) => {}

// lmo3askar dyal computer li khasso ykon 3kss dyal player
const campAdverse = (camp) =>{}

// chkon ghayl3b how lwl
const premierJoueur = (indexDuel) =>{}

// lwr9a li ghaykhtarha lcomputer whna ghankhdmo b Math.random w Math.floor
const choisirCarteOrdi = (main)=>{}

// anhydo biha lwra9
const retirerCarte = (main, index) =>{}

// ni9at li ghat3ta wch 1 wla 5
const points = (camp) =>{}

// kifach ghatkon lhala lwla fach katl3v flwl
const creerPartie = ()=> {}

// hadi hiya li ghathkm fl3ba wghatrbt bin functions lkhrin
const jouerDuel = (etat, indexCarte)=>{}

// ila salat ljawla  ghanbdaw bhadi ljawla khra 
const nouvelleManche = (etat) =>{}

// wach sala lmatch , y3ni wch salat 12 jawla  
const estTerminee= (etat)=>{}

// hadi ghat9arn lina mjmo3 dn9ati dl3aba wghat returner lina najah khasar ta3adol
const resultatFinal = (etat)=>{}