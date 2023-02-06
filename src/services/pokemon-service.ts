import axios from "axios";

const getPokemonList = async () => {
  const resp = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=30");
  return resp.data;
};

const getPokemon = async (id: any) => {
  const resp = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return resp.data;
};
const getPokemonImageUrl = (id: any) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
};

const getIdFromUrlPokemon = (url: string) => {
  url = url.replace("https://pokeapi.co/api/v2/pokemon/", "").replace("/", "");
  return url;
};

export { getPokemonList, getPokemon, getPokemonImageUrl, getIdFromUrlPokemon };
