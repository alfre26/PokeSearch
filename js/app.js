const search = document.getElementById("pokemonSearch");
const btn = document.getElementById("btn");

const modalbg = document.querySelector(".modal-bg");
const modalclose = document.querySelector(".modal-close");

btn.addEventListener("click", () => {
  if (search.value !== "") {
    consultarPokemon(search.value.toLowerCase());
    modalbg.classList.add("bg-active");
  } else {
    alert("llene el campo");
  }
});

function modalClose() {
  modalbg.classList.remove("bg-active");
}

async function consultarPokemon(name) {
  let template;
  await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then( async Response => {
      if (!Response.ok) {
        template = `
              <h1>No found.</h1>
              <span class="modal-close" onclick="modalClose()">&times;</span>
        `;
        document.querySelector(".modal").innerHTML = template;

        // make the promise be rejected if we didn't get a 200 response
        throw new Error("Not 200 response");
      } else {
        await Response.json()
         .then(pokemon => {
          template = `
            <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" height="200px" width="200px" alt="pokemon">
            <h2>${pokemon.name}</h2>
            <span class="modal-close" onclick="modalClose()">&times;</span>
        `;
          console.log(pokemon.id);
          document.querySelector(".modal").innerHTML = template;
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
}
