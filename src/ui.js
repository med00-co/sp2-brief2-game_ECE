export const afficherErreur = (idElement, message) => {
  document.getElementById(idElement).textContent = message;
};

export const afficherJoueurs = (liste) => {
  const conteneur = document.getElementById("liste-joueurs");
  const vide = document.getElementById("aucun-joueur");


  if(liste.length == 0){
    vide.classList.remove('hidden')
    
  }else{
    vide.classList.add('hidden')
  }
  conteneur.innerHTML = liste.map(({ id, nickname, avatar }) => `
  <article class="flex items-center gap-4 bg-fond/60 border border-empereur/40 rounded-lg px-8 py-3 mt-6 ">
    <img src="./assets/images/avatars/${avatar}.jpg" alt="${avatar}" class="w-14 h-14 rounded-full object-cover mx-2">
    <div class="text-left">
      <p class="font-titre font-bold">${nickname}</p>
      <p class="text-sm text-white/60">0 partie</p>
    </div>
  </article>
`).join("")
};