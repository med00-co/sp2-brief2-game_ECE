import { getCamp, premierJoueur , getGroupe  } from "./game.js";
import { compterParties ,  nomJoueur} from "./history.js";
import { getJoueurParId } from "./players.js";


export const afficherErreur = (idElement, message) => {
  document.getElementById(idElement).textContent = message;
};

export const afficherJoueurs = (liste , idChoisi = null) => {
  const conteneur = document.getElementById("liste-joueurs");
  const vide = document.getElementById("aucun-joueur");

  

  if(liste.length == 0){
    vide.classList.remove('hidden')
    
  }else{
    vide.classList.add('hidden')
  }
  conteneur.innerHTML = liste.map(({ id, nickname, avatar }) => `
  <article class="player overflow-hidden rounded-xl border border-empereur/40 bg-carte/80 backdrop-blur-sm shadow-lg shadow-black/40 transition hover:-translate-y-1 hover:shadow-xl ${id === idChoisi ? "ring-4 ring-green-300" : ""}">

    <div class="h-16 bg-linear-to-r from-empereur/60 via-empereur/30 to-esclave/30"></div>

    <div class="flex flex-col items-center px-4 pb-4 text-center">
      <img src="./assets/images/avatars/${avatar}.jpg" alt="${avatar}"
        class="-mt-10 h-30 w-30 rounded-full object-cover ring-4 ring-carte border-2 border-empereur shadow-lg">

      <p class="mt-3 w-full truncate font-titre text-lg font-bold uppercase tracking-wide text-texte">${nickname}</p>
      <p class="mt-1 rounded-full bg-black/30 px-3 py-0.5 text-xs uppercase tracking-widest text-white/60">${compterParties(id)} ${compterParties(id)> 1 ? "parties": "partie"}</p>

      <div class="mt-4 grid w-full grid-cols-2 gap-2">
        <button type="button" data-action="modifier" data-id="${id}"
          class="cursor-pointer rounded-md bg-citoyen/20 py-2 text-sm font-titre font-bold uppercase tracking-wide text-citoyen transition hover:bg-citoyen/40 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-citoyen">Modifier</button>
        <button type="button" data-action="supprimer" data-id="${id}"
          class="cursor-pointer rounded-md bg-esclave/20 py-2 text-sm font-titre font-bold uppercase tracking-wide text-red-300 transition hover:bg-esclave/50 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-esclave">Supprimer</button>
        <button type="button" data-action="choisir" data-id="${id}"
          class="col-span-2 cursor-pointer rounded-md bg-empereur py-2 text-sm font-titre font-bold uppercase tracking-wide text-fond transition hover:bg-empereur/80 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-empereur disabled:bg-none disabled:bg-empereur/30 disabled:opacity-60 disabled:cursor-not-allowed disabled:text-white disabled:hover:bg-empereur disabled:active:scale-100" ${id === idChoisi ? "disabled" : ""} >${id === idChoisi ? "Sélectionné" : "Choisir"}</button>
      </div>
    </div>
  </article>
`).join("")


};


// hna lkhtwa 3 bach nkhli les buttons khdamin 
export const afficherJoueurChoisi = (joueur) =>{
  const joueurActif = document.getElementById('joueur-actif')
  joueurActif.textContent = joueur ? joueur.nickname : "Aucun joueur sélectionné";
}

// functions dyal partie 2 , nkhli lgame khdama
export const afficherSection = (nom) =>{
  const sections = document.querySelectorAll('section')
  
  sections.forEach((sect)=>{
    sect.classList.add('hidden')
    if(sect.id == nom){
      sect.classList.remove('hidden')
    }
  })
}

// hadi li ghan3rd biha m3lomat dlo3ba
export const afficherInfosPartie = (etat)=>{
  const camp = getCamp(etat.manche)

  document.getElementById('info-manche').textContent = etat.manche
  document.getElementById('info-camp').textContent = camp === "empereur" ? "Empereur" : "Esclave"
  document.getElementById('score-joueur').textContent = etat.scoreJoueur
  document.getElementById('score-ordi').textContent = etat.scoreOrdi

  // hado dyal lgroupe w la3ib lwl
  document.getElementById('info-group').textContent = getGroupe(etat.manche)
  document.getElementById('info-premier').textContent = premierJoueur(etat.indexDuel) == getCamp(etat.manche) ? "Toi" : "Ordinateur"
}

// kat3rd lbita9at li kaynin fyd dljoueur
export const afficherMainJoueur = (main)=>{
  const contenur = document.getElementById('main-joueur')

  contenur.innerHTML = main.map((carte , index) => `
      <button type="button" data-index="${index}"
      class="carte-joueur w-20 h-28 rounded-lg border-2 border-empereur/60 bg-carte shadow-lg 
             hover:scale-105 hover:border-empereur transition cursor-pointer
             flex items-center justify-center font-titre font-bold text-sm uppercase
             ${carte === "empereur" ? "text-empereur" : carte === "esclave" ? "text-esclave" : "text-citoyen"}">
             <img src="./assets/cards/${carte}.jpg" alt="a card of ${carte}" class="w-full h-full">
      </button>
  `).join("")
}

// kat3rd les cartes li kaynin 3nd l'Ordi
export const afficherMainOrdi = (main) => {
  const content = document.getElementById('main-ordi')

  content.innerHTML = main.map(()=> `
   <div class="w-20 h-28 rounded-lg border border-white/20 bg-black/50 shadow-md
                flex items-center justify-center text-white/30 text-2xl">
      <img src="./assets/cards/backCart.jpg" alt="back of card " class="w-full h-full">
    </div>
  `).join("")
}

// affiche les cartes jouées dans le milieu  
export const afficherCartesJouees = (carteJoueur, carteOrdi) => {
  const zoneJoueur = document.getElementById("carte-joueur-jouee")
  const zoneOrdi = document.getElementById("carte-ordi-jouee")

  zoneJoueur.innerHTML = `<img src="./assets/cards/${carteJoueur}.jpg" alt="${carteJoueur}" class="w-full h-full">`
  zoneJoueur.className = `w-20 h-28 rounded-lg border-2 flex items-center justify-center 
                          font-titre font-bold uppercase text-sm
                          ${carteJoueur === "empereur" ? "border-empereur text-empereur bg-empereur/20" : 
                            carteJoueur === "esclave" ? "border-esclave text-esclave bg-esclave/20" : 
                            "border-citoyen text-citoyen bg-citoyen/20"}`;

  zoneOrdi.innerHTML = `<img src="./assets/cards/${carteOrdi}.jpg" alt="${carteOrdi}" class="w-full h-full">`
  zoneOrdi.className = `w-20 h-28 rounded-lg border-2 flex items-center justify-center 
                        font-titre font-bold uppercase text-sm
                        ${carteOrdi === "empereur" ? "border-empereur text-empereur bg-empereur/20" : 
                          carteOrdi === "esclave" ? "border-esclave text-esclave bg-esclave/20" : 
                          "border-citoyen text-citoyen bg-citoyen/20"}`;
}

// elle supprime les cartes jouées du milieu pour jouer une autre fois aprés le résultat
export const viderCartesJouees = () => {
  const zoneJoueur = document.getElementById("carte-joueur-jouee")
  const zoneOrdi = document.getElementById("carte-ordi-jouee")

  zoneJoueur.textContent = "";
  zoneJoueur.className = "w-20 h-28 rounded-lg border border-white/20 bg-black/40";

  zoneOrdi.textContent = "";
  zoneOrdi.className = "w-20 h-28 rounded-lg border border-white/20 bg-black/40";

  document.getElementById('resultat-duel').textContent = ""
}

// kat afficher resultat
export const afficherResultatDuel = (resultat) => {
  const el = document.getElementById("resultat-duel")

  if(resultat === "victoire"){
    el.textContent = "victoire !"
    el.className = "text-center text-lg font-titre font-bold min-h-8 mb-6 text-green-400"
  }
  else if(resultat === "défaite"){
    el.textContent = "défaite..."
    el.className = "text-center text-lg font-titre font-bold min-h-8 mb-6 text-red-400"
  }
  else{
    el.textContent = "= Egalité ="
    el.className = "text-center text-lg font-titre font-bold min-h-8 mb-6 text-yellow-400"
  }
}

// supprime le message de choisir un joueur ,et affiche la zone de jeu
export const afficherZoneJeu = (joueur) =>{
  const messageChoisirJoueur = document.getElementById('msg-pas-joueur')

  const zoneLancer = document.getElementById('zone-lancer')
  const zoneJeu = document.getElementById('zone-jeu')
  const zoneFin = document.getElementById('zone-fin')
  const array = [zoneLancer , zoneJeu , zoneFin, messageChoisirJoueur]

  array.forEach((zn) =>{
    zn.classList.add('hidden')
    if(!joueur){
      messageChoisirJoueur.classList.remove('hidden')
    }else if(joueur) {
      zoneLancer.classList.remove('hidden')
    }
  })
}

// dans la fin du match , il affiche la résultat
export const afficherFinPartie = (resultat, scoreJ, scoreOr) => {
  const zoneJeu = document.getElementById('zone-jeu')
  const zoneFin = document.getElementById('zone-fin')  
  const messageFin = document.getElementById('msg-fin')

  zoneJeu.classList.add('hidden')
  zoneFin.classList.remove('hidden')

 messageFin.innerHTML = `
 ${resultat == "victoire" ? "§§ VICTOIRE ! §§" : resultat == "défaite" ? "GAME OVER..." : "Egalité"} 
 <br><br> ${scoreJ} - ${scoreOr} 
 `

}

// partie history : afficher parties 
export const afficherParties = (liste) => {
  const p = document.getElementById('aucune-partie')
  const listeParties = document.getElementById('liste-parties')

  if(liste.length === 0){
    p.classList.remove('hidden')
  }else{
    p.classList.add('hidden')
  }
  
  listeParties.innerHTML = liste.map(({ id, playerId, date, playerScore , computerScore, result }) =>  `
  <article class="group relative flex flex-col gap-4 bg-carte/80 border border-empereur/40 rounded-xl p-5 
                  shadow-lg shadow-black/30 backdrop-blur-sm
                  hover:border-empereur/70 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">

     <div class="flex items-center justify-between gap-3">
      <span class="text-xs uppercase tracking-widest text-white/50">
        ${date.replace("T", " ").slice(0, 16)}
      </span>
      
      <span class="px-3 py-1 rounded-full text-xs font-titre font-bold uppercase tracking-wide
        ${result === "victoire" 
          ? "bg-green-500/20 text-green-400 border border-green-500/40" 
          : result === "défaite" 
            ? "bg-red-500/20 text-red-400 border border-red-500/40" 
            : "bg-citoyen/20 text-citoyen border border-citoyen/40"}">
        ${result}
      </span>

     </div> 

     <div class="flex items-center justify-between gap-4">
      <div>
        <p class="font-titre font-bold text-lg text-texte tracking-wide">
          ${nomJoueur(playerId)}
        </p>
        <p class="text-sm text-white/50 mt-0.5">Joueur</p>
      </div>
      
      <div class="text-right">
        <p class="font-titre font-bold text-2xl">
          <span class="text-empereur">${playerScore}</span>
          <span class="text-white/40 mx-1">-</span>
          <span class="text-esclave">${computerScore}</span>
        </p>
        <p class="text-xs text-white/40 mt-0.5">Score</p>
      </div>
    </div>
    
     <button type="button" 
            data-id="${id}" 
            data-action="supprimer-partie"
            class="mt-1 w-full cursor-pointer rounded-md bg-esclave/15 py-2 text-sm font-titre font-bold 
                   uppercase tracking-wide text-red-300 border border-esclave/30
                   transition hover:bg-esclave/40 hover:text-white active:scale-95
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-esclave">
      Supprimer
    </button>
    
  </article>
  `).join("")

}

export const remplirFormulaire = (joueur) => {
  document.getElementById('pseudo').value = joueur.nickname
  document.getElementById('joueur-id').value = joueur.id
  

  const radio = document.querySelector(`input[name="avatar"][value="${joueur.avatar}"] `)
  if(radio){
    radio.checked = true
  }

  document.getElementById('titre-formulaire').textContent = "Modifier un joueur"

  let btnValider = document.getElementById('btn-valider')
  btnValider.textContent = "Modifier"
  btnValider.classList.remove('bg-empereur' , 'hover:bg-empereur/80')
  btnValider.classList.add('bg-citoyen/90', 'hover:text-white', 'hover:bg-citoyen/70')

  document.getElementById('btn-annuler').classList.remove('hidden')
}

export const renitialiserFormulaire = ()=>{
  const form = document.getElementById("form-joueur")
  form.reset()
  document.getElementById('joueur-id').value  = "" ;
  document.getElementById('titre-formulaire').textContent = "Ajouter un joueur"
  let btnValider = document.getElementById('btn-valider')
  btnValider.textContent = "Ajouter"
  btnValider.classList.add('bg-empereur' , 'hover:bg-empereur/80')
  btnValider.classList.remove('bg-citoyen/90', 'hover:text-white', 'hover:bg-citoyen/50')
  

  afficherErreur("erreur-pseudo", "");
  afficherErreur("erreur-avatar", "");
  document.getElementById('btn-annuler').classList.add('hidden')
}