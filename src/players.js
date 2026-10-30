import { lire, ecrire, CLE_JOUEURS, CLE_CHOISI } from "./storage.js";

export const getJoueurs = () => lire(CLE_JOUEURS);

export const validerPseudo = (pseudo, idIgnore = null) => {
  const pseudoRegex = /^[A-Za-z0-9]{3,15}$/;

  if (!pseudoRegex.test(pseudo)) {
    return "3 à 15 caractères : lettres et chiffres uniquement";
  }

  const dejaPris = getJoueurs().some(
    (j) => j.nickname.toLowerCase() === pseudo.toLowerCase() && j.id !== idIgnore
  );

  if (dejaPris) {
    return "Ce pseudo est déjà utilisé";
  }

  return "";
};


export const ajouterJoueur = ({ nickname, avatar }) => {
  const nouveau = {
    id: `p_${Date.now()}`,
    nickname,
    avatar,
    createdAt: new Date().toISOString().slice(0, 10)
  };

  ecrire(CLE_JOUEURS, [...getJoueurs(), nouveau]);
  return nouveau;
};

export const choisirJoueur = (id) => ecrire(CLE_CHOISI, id);
export const getJoueurChoisi = () => lire(CLE_CHOISI, null);