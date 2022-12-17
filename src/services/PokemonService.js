import axios from 'axios';
import { TOTAL_POKEMONS } from '../constants';

export const getPokemonsDataFromApi = (
	url = `${process.env.REACT_APP_POKEAPI_BASE_URL}pokemon?offset=0&limit=${TOTAL_POKEMONS}`
) => axios.get(url).then((response) => response.data);

export const getMyPokemonsDetailsFromApi = (myPokemons) => {
	if (!myPokemons?.length) return [];

	const fetchPokemonsPromises = myPokemons.map((pokemon) =>
		getPokemonsDataFromApi(pokemon.url)
	);

	return Promise.all(fetchPokemonsPromises);
};
