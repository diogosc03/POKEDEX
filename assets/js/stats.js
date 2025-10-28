const baseInfo = document.getElementById("baseInfo");
const statusList = document.getElementById("statusList");
const text = document.getElementById("text");

function loadPokemonInfo(name) {
  pokeApi.getPokemon(name).then((pokemon) => {
    const newHtml = `
      <h2 id="name">${pokemon.name}</h2>
      <h4 id="number">#${pokemon.number}</h4>

      <ol class="types">
        ${pokemon.types
          .map((type) => `<li class="type ${type}">${type}</li>`)
          .join("")}
      </ol>

      <img
        src="${pokemon.photo}"
        alt="${pokemon.name}"
      />`;

    baseInfo.classList.add(pokemon.type);

    baseInfo.innerHTML += newHtml;
  });
}

function loadPokemonStats(name) {
  pokeApi.getPokemon(name).then((pokemon) => {
    let newHtml = pokemon.stats
      .map(
        (stat) =>
          `<li class="statLine">
        <ul id="statInfo">
          <li class="stat">${
            stat["name"] === "hp" ? stat["name"].toUpperCase() : stat["name"]
          }</li>
          <li id="Quantity">${stat["statNum"]}</li>
          <li id="statBar">
            <div class="statBarBack">
              <div id="statBarFront" style="width:${
                Math.floor(stat["statNum"]) >= 200
                  ? 100
                  : Math.floor((stat["statNum"] * 100) / 200)
              }%; background-color: ${
            Math.floor((stat["statNum"] * 100) / 200) >= 50
              ? "#00ff00"
              : "#ff0000"
          }"></div>
            </div>
          </li>
        </ul>
      </li>`
      )
      .join("")
      .replace("special-attack", "Sp.Atk");

    newHtml += `<li class="statLine">
        <ul id="statInfo">
          <li class="stat" id="total">Total</li>
          <li id="Quantity">${pokemon.total}</li>
          <li id="statBar">
            <div class="statBarBack">
              <div id="statBarFront" style="width:${Math.floor(
                (pokemon.total * 100) / 1200
              )}%; background-color: ${
      Math.floor((pokemon.total * 100) / 1200) >= 50 ? "#00ff00" : "#ff0000"
    }"></div>
            </div>
          </li>
        </ul>
      </li>`;

    statusList.innerHTML += newHtml.replace("special-defense", "Sp.Def");
    text.innerHTML = `The effectiveness of each type on ${pokemon.name}`;
  });
}

const urlParams = new URLSearchParams(window.location.search);
const pokemonName = urlParams.get("name");
loadPokemonInfo(pokemonName);
loadPokemonStats(pokemonName);
