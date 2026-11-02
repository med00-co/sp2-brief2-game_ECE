import { validerPseudo, ajouterJoueur, getJoueurs } from "./players.js";
import { afficherErreur, afficherJoueurs } from "./ui.js";

const form = document.getElementById("form-joueur");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const pseudo = document.getElementById("pseudo").value.trim();
  const avatarChoisi = document.querySelector('input[name="avatar"]:checked');

  const erreurPseudo = validerPseudo(pseudo);
  afficherErreur("erreur-pseudo", erreurPseudo);
  afficherErreur("erreur-avatar", avatarChoisi ? "" : "Choisis un avatar");


  if(erreurPseudo || !avatarChoisi) return ;
  ajouterJoueur({ nickname: pseudo, avatar: avatarChoisi.value })
  afficherJoueurs(getJoueurs())
  form.reset()
});
afficherJoueurs(getJoueurs())
