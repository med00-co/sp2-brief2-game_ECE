import {
  validerPseudo, ajouterJoueur, getJoueurs,
  choisirJoueur, getJoueurChoisi, getJoueurParId,
  supprimerJoueur
} from "./players.js";

import { afficherErreur, afficherJoueurs, afficherJoueurChoisi, afficherSection, afficherInfosPartie , 
  afficherMainJoueur , afficherMainOrdi  , afficherCartesJouees , afficherResultatDuel , viderCartesJouees,
  afficherZoneJeu , afficherFinPartie, afficherParties,
} from "./ui.js";

import {  creerPartie , jouerDuel , nouvelleManche , 
  estTerminee , resultatFinal,
 } from "./game.js";

import { enregistrerPartie, filtrerParties, supprimerPartie  } from "./history.js";



let etat = null 
let verouille = false
const form = document.getElementById("form-joueur");

form.addEventListener("submit", (e) => {
  e.preventDefault();
   
  const pseudo = document.getElementById("pseudo").value.trim();
  const avatarChoisi = document.querySelector('input[name="avatar"]:checked');

  const erreurPseudo = validerPseudo(pseudo);
  afficherErreur("erreur-pseudo", erreurPseudo);
  afficherErreur("erreur-avatar", avatarChoisi ? "" : "Choisis un avatar");

  if (erreurPseudo || !avatarChoisi) return;

  ajouterJoueur({ nickname: pseudo, avatar: avatarChoisi.value });
  afficherJoueurs(getJoueurs(), getJoueurChoisi());
  form.reset();
});

const listeJoueurs = document.getElementById("liste-joueurs"); 

listeJoueurs.addEventListener("click", (event) => {
  const bouton = event.target.closest("[data-action]");
  if (!bouton) return;

  const { id, action } = bouton.dataset;

  if (action === "choisir") {
    choisirJoueur(id);
    afficherJoueurs(getJoueurs(), id);
    afficherJoueurChoisi(getJoueurParId(id));
  }
  if(action === "supprimer"){
    let confirmer = confirm('Voullez vous supprimer ce Joueur ? ')
    if(!confirmer) return ;
    supprimerJoueur(id)
    afficherJoueurs(getJoueurs(), getJoueurChoisi())
    afficherJoueurChoisi(getJoueurParId(getJoueurChoisi()))
    rafraichirHistorique()
  }
});


afficherJoueurs(getJoueurs(), getJoueurChoisi());
afficherJoueurChoisi(getJoueurParId(getJoueurChoisi()));

// partie 2 , nkhli lgame khdama
const navs = document.querySelectorAll('[data-section]')
navs.forEach((nav)=>{
   
   nav.addEventListener('click' , function(event){
       event.preventDefault()
       navs.forEach((n)=>{
        n.className = "px-4 py-1 rounded-md transition hover:bg-empereur/50 font-titre"
       })
       nav.classList.remove('hover:bg-empereur/50')
       nav.classList.add('font-bold', 'bg-empereur', 'hover:bg-empereur/85')
       let navSection = nav.dataset.section
       afficherSection(navSection)

       if(navSection === "jeu" && etat == null){
        afficherZoneJeu(getJoueurParId(getJoueurChoisi()))
       }
       if(navSection === "historique"){
        rafraichirHistorique()
       }
   })
})


// refraichir function
const refraichir = ()=>{
  
  afficherInfosPartie(etat)
  afficherMainJoueur(etat.mainJoueur)
  afficherMainOrdi(etat.mainOrdi)
}

// btn-lancer
const btnLancer = document.getElementById('btn-lancer')

btnLancer.addEventListener('click', ()=>{
  etat = creerPartie()
  document.getElementById('zone-lancer').classList.add('hidden')
  document.getElementById('zone-jeu').classList.remove('hidden')
  refraichir()
})

const laMainJoueur = document.getElementById('main-joueur')
laMainJoueur.addEventListener('click', (event)=>{
    let carteChoisi = event.target.closest('[data-index]')
    if(!carteChoisi || verouille) return ;

    verouille = true
    let index = carteChoisi.dataset.index
    const rapport  = jouerDuel(etat , Number(index))

    afficherCartesJouees(rapport.cartePlayer , rapport.carteOrdi)
    afficherResultatDuel(rapport.resultat)
    setTimeout(()=>{
      etat = rapport.newEtat
      const resultat = resultatFinal(etat)
    if(rapport.mancheTerminee){
      if(estTerminee(etat)){
        afficherFinPartie(resultat, etat.scoreJoueur ,etat.scoreOrdi)
        enregistrerPartie({playerId: getJoueurChoisi() , playerScore: etat.scoreJoueur ,computerScore: etat.scoreOrdi ,result: resultat})
        rafraichirHistorique()
        afficherJoueurs(getJoueurs(), getJoueurChoisi())
        return ;
      }else{
        etat = nouvelleManche(etat)
      }
    }
    viderCartesJouees()
    refraichir()
    verouille = false
    },1500)

    
})

const btnRejouer = document.getElementById('btn-rejouer')
btnRejouer.addEventListener('click', function(){
    etat = creerPartie()
    verouille = false
    document.getElementById('zone-fin').classList.add('hidden')
    document.getElementById('zone-jeu').classList.remove('hidden')
    refraichir()
    viderCartesJouees()
})



// rafraichirHistorique -----------
const rafraichirHistorique = () =>{
  const recherche = document.getElementById('cherche-partie').value.trim()
  const resultat = document.getElementById('filter-par-result').value
  const periode = document.getElementById('filter-par-date').value

  const filtersObject = {
    recherche,
    resultat,
    periode,
  }
  
  afficherParties(filtrerParties(filtersObject))
}


rafraichirHistorique()

const search = document.getElementById('cherche-partie')
search.addEventListener('input', rafraichirHistorique)

const resultFilter = document.getElementById('filter-par-result')
resultFilter.addEventListener('change', rafraichirHistorique)

const dateFilter = document.getElementById('filter-par-date')
dateFilter.addEventListener('change', rafraichirHistorique)


const listParties = document.getElementById('liste-parties')
listParties.addEventListener('click', function(event){
  let btnSupprimerPartie = event.target.closest('[data-action]')
  if(!btnSupprimerPartie) return ;

  let  action = btnSupprimerPartie.dataset.action
  let id = btnSupprimerPartie.dataset.id

  if(action == "supprimer-partie"){
    let confirmation = confirm("Voullez-vous de supprimer cette partie ?")
    if(!confirmation) return ;

    supprimerPartie(id)
    rafraichirHistorique()
    afficherJoueurs(getJoueurs(), getJoueurChoisi())
    
  }

})


