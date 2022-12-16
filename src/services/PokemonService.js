import { TOTAL_POKEMONS } from '../constants';
import api from '../lib/api';

export const getPokemonsDataFromApi = (
	url = `${process.env.REACT_APP_POKEAPI_BASE_URL}pokemon?offset=0&limit=${TOTAL_POKEMONS}`
) => api.get(url).then((response) => response.data);

export const getMyPokemonsDetailsFromApi = (myPokemons) => {
	if (!myPokemons?.length) return [];

	console.log('FETCHING MY POKEMONS: ', { myPokemons });

	const fetchPokemonsPromises = myPokemons.map((pokemon) =>
		getPokemonsDataFromApi(pokemon.url)
	);

	return Promise.all(fetchPokemonsPromises);
};
