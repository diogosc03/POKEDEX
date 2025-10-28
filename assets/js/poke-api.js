const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;

  pokemon.types = types;
  pokemon.type = type;

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

  const statusList = pokeDetail.stats.map((status) => {
    const pokeStat = {
      name: status.stat.name,
      statNum: status.base_stat,
    };

    return pokeStat;
  });

  pokemon.stats = statusList;

  const total = statusList
    .map((element) => {
      return element["statNum"];
    })
    .reduce((acc, num) => acc + num);

  pokemon.total = total;

  return pokemon;
}

pokeApi.getPokemonDetails = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon);
};

pokeApi.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetails))
    .then((detailRequest) => Promise.all(detailRequest))
    .then((pokemonsDetails) => pokemonsDetails)
    .catch((error) => console.error(error));
};

pokeApi.getPokemon = (name = "mewtwo") => {
  const url = `https://pokeapi.co/api/v2/pokemon/${name}`;

  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => convertPokeApiDetailToPokemon(jsonBody))
    .then((pokemonDetail) => pokemonDetail)
    .catch((error) => console.error(error));
};
