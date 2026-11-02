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
  <article class="overflow-hidden rounded-xl border border-empereur/40 bg-carte/80 backdrop-blur-sm shadow-lg shadow-black/40 transition hover:-translate-y-1 hover:shadow-xl">

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
          class="col-span-2 cursor-pointer rounded-md bg-empereur py-2 text-sm font-titre font-bold uppercase tracking-wide text-fond transition hover:bg-empereur/80 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-empereur">Choisir</button>
      </div>
    </div>
  </article>
`).join("")
};