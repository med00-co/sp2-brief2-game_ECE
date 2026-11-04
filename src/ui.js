import { getCamp,  } from "./game.js";


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
  <article class="player overflow-hidden rounded-xl border border-empereur/40 bg-carte/80 backdrop-blur-sm shadow-lg shadow-black/40 transition hover:-translate-y-1 hover:shadow-xl ${id === idChoisi ? "ring-4 ring-orange-500" : ""}">

    <div class="h-16 bg-linear-to-r from-empereur/60 via-empereur/30 to-esclave/30"></div>

    <div class="flex flex-col items-center px-4 pb-4 text-center">
      <img src="./assets/images/avatars/${avatar}.jpg" alt="${avatar}"
        class="-mt-10 h-30 w-30 rounded-full object-cover ring-4 ring-carte border-2 border-empereur shadow-lg">

      <p class="mt-3 w-full truncate font-titre text-lg font-bold uppercase tracking-wide text-texte">${nickname}</p>
      <p class="mt-1 rounded-full bg-black/30 px-3 py-0.5 text-xs uppercase tracking-widest text-white/60">0 partie</p>

      <div class="mt-4 grid w-full grid-cols-2 gap-2">
        <button type="button" data-action="modifier" data-id="${id}"
          class="cursor-pointer rounded-md bg-citoyen/20 py-2 text-sm font-titre font-bold uppercase tracking-wide text-citoyen transition hover:bg-citoyen/40 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-citoyen">Modifier</button>
        <button type="button" data-action="supprimer" data-id="${id}"
          class="cursor-pointer rounded-md bg-esclave/20 py-2 text-sm font-titre font-bold uppercase tracking-wide text-red-300 transition hover:bg-esclave/50 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-esclave">Supprimer</button>
        <button type="button" data-action="choisir" data-id="${id}"
          class="col-span-2 cursor-pointer rounded-md bg-empereur py-2 text-sm font-titre font-bold uppercase tracking-wide text-fond transition hover:bg-empereur/80 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-empereur disabled:bg-none disabled:bg-empereur/30 disabled:opacity-60 disabled:cursor-not-allowed disabled:text-white disabled:hover:bg-empereur disabled:active:scale-100" ${id === idChoisi ? "disabled" : ""} >${id === idChoisi ? "Sélectioné" : "Choisir"}</button>
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
      ?
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
 <br> ${scoreJ} - ${scoreOr} 
 `

}