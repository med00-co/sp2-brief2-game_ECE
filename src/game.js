export const EMPEREUR_CARD = "empereur"
export const CITIZEN_CARD = "citoyen"
export const SLAVE_CARD = "esclave"
export const NB_MANCHES = 12
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
export const getCamp = (manche) => {
    if((Math.ceil(manche / 3)) % 2 === 0){
        return SLAVE_CARD ;
    }else{
        return EMPEREUR_CARD; 
    }
}

// lmo3askar dyal computer li khasso ykon 3kss dyal player
export const campAdverse = (camp) =>{
    let verseCamp = camp === EMPEREUR_CARD ?  SLAVE_CARD :  EMPEREUR_CARD
    return verseCamp ;
}

// chkon ghayl3b how lwl
export const premierJoueur = (indexDuel) =>{
    return indexDuel % 2 === 0 ?  EMPEREUR_CARD :  SLAVE_CARD
    
}


// lwr9a li ghaykhtarha lcomputer whna ghankhdmo b Math.random w Math.floor
export const choisirCarteOrdi = (main)=>{
    let num = Math.floor(Math.random() * main.length) 
    return num 
    
}

// anhydo biha lwra9
export const retirerCarte = (main, index) =>{
    return   main.filter((card , i) => i !== index)
     
}


// ni9at li ghat3ta wch 1 wla 5
export const points = (camp) =>{
    return camp === EMPEREUR_CARD ? 1 : 5
}


// kifach ghatkon lhala lwla fach katl3v flwl
export const creerPartie = ()=> {
   
   let partieObject = {
    manche : 1 ,
    indexDuel : 0 ,
    scoreJoueur : 0,
    scoreOrdi : 0 ,
   }
   let campJoueur = getCamp(partieObject.manche)
   partieObject.mainJoueur = creerMain(campJoueur)
   partieObject.mainOrdi = creerMain(campAdverse(campJoueur))
   
   return partieObject ;
}



// hadi hiya li ghathkm fl3ba wghatrbt bin functions lkhrin
export const jouerDuel = (etat, indexCarte)=>{
    let campPlayer = getCamp(etat.manche)
    let campOrdi = campAdverse(getCamp(etat.manche))
    
    let cartePlayer = etat.mainJoueur[indexCarte]

    let indexCarteOrdi = choisirCarteOrdi(etat.mainOrdi)
    let carteOrdi = etat.mainOrdi[indexCarteOrdi]

    let duelResultat = duel(cartePlayer, carteOrdi)

    // p2: halat ta3adol w rba7 w lkhassara
    if(duelResultat === "égalité"){
        let newMainJoueur = retirerCarte(etat.mainJoueur , indexCarte);
        let newMainOrdi = retirerCarte(etat.mainOrdi , indexCarteOrdi);
        let newEtat = {...etat, indexDuel : etat.indexDuel + 1 , mainJoueur : newMainJoueur, mainOrdi: newMainOrdi }
        let rapport = {
            newEtat ,
            cartePlayer ,
            carteOrdi,
            resultat : duelResultat  , 
            mancheTerminee : false ,
        }

        return rapport ; 
    }
    else if(duelResultat === "victoire"){

        let newMainJoueur = retirerCarte(etat.mainJoueur, indexCarte);
        let newMainOrdi = retirerCarte(etat.mainOrdi, indexCarteOrdi);

        let newEtat = {...etat, scoreJoueur : etat.scoreJoueur + points(campPlayer) , mainJoueur: newMainJoueur, mainOrdi: newMainOrdi, indexDuel: etat.indexDuel + 1,}
        let rapport = {
            newEtat ,
            cartePlayer ,
            carteOrdi,
            resultat : duelResultat  , 
            mancheTerminee : true ,
        }

        return rapport ; 
    }
    else if(duelResultat === "défaite"){

        let newMainJoueur = retirerCarte(etat.mainJoueur, indexCarte);
        let newMainOrdi = retirerCarte(etat.mainOrdi, indexCarteOrdi);

        let newEtat = {...etat, scoreOrdi : etat.scoreOrdi + points(campOrdi), mainJoueur: newMainJoueur, mainOrdi: newMainOrdi, indexDuel: etat.indexDuel + 1, }
        let rapport = {
            newEtat ,
            cartePlayer ,
            carteOrdi,
            resultat : duelResultat  , 
            mancheTerminee : true ,
        }

        return rapport ;
    }

}

// ila salat ljawla  ghanbdaw bhadi ljawla khra 
export const nouvelleManche = (etat) =>{
    let numManche = etat.manche + 1
    let pyCamp = getCamp(numManche)
    let OrdiCamp = campAdverse(pyCamp)

    let pyCartes = creerMain(pyCamp)
    let OrdiCartes = creerMain(OrdiCamp)

    let newEtat = {...etat ,manche : numManche, mainJoueur : pyCartes , mainOrdi: OrdiCartes, indexDuel : 0, } 
    return newEtat ;
}


// wach sala lmatch , y3ni wch salat 12 jawla  
export const estTerminee= (etat)=>{
    return etat.manche === NB_MANCHES ;
}


// hadi ghat9arn lina mjmo3 dn9ati dl3aba wghat returner lina najah khasar ta3adol
export const resultatFinal = (etat)=>{
    let scorePlayer = etat.scoreJoueur 
    let scoreOrdi = etat.scoreOrdi

    if(scorePlayer > scoreOrdi){
        return "victoire"
    }
    else if(scorePlayer < scoreOrdi){
        return "défaite"
    }
    else{
        return "égalité"
    }
}
// nghyr ra9m lgroup li rani fih daba mn 4
export const getGroupe = (manche) =>{
    return Math.ceil(manche / 3)
    
}

// chkon ghaybda lwl 
export const estTourOrdi = (etat) => {
  const campQuiCommence = premierJoueur(etat.indexDuel);
  const campJoueur = getCamp(etat.manche);
  return campQuiCommence !== campJoueur;
};