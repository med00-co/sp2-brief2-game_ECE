import {
  validerPseudo, ajouterJoueur, getJoueurs,
  choisirJoueur, getJoueurChoisi, getJoueurParId
} from "./players.js";

import { afficherErreur, afficherJoueurs, afficherJoueurChoisi } from "./ui.js";

import { duel , creerMain , getCamp , campAdverse } from "./game.js";




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
});


afficherJoueurs(getJoueurs(), getJoueurChoisi());
afficherJoueurChoisi(getJoueurParId(getJoueurChoisi()));
