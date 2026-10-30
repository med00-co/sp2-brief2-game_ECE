export const CLE_JOUEURS = "ecd_joueurs";
export const CLE_CHOISI = "ecd_joueur_choisi";
export const CLE_PARTIES = "ecd_parties";

export const lire = (cle, defaut = []) => {
  const brut = localStorage.getItem(cle);
  return brut === null ? defaut : JSON.parse(brut)
};

export const ecrire = (cle, valeur) => {
    localStorage.setItem(cle , JSON.stringify(valeur))
};