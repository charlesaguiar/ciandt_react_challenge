import axios from 'axios';
import { when } from 'jest-when';

import { TEST_PIKACHU, TEST_SQUIRTLE, TEST_BLASTOISE } from 'mocks';
import { TOTAL_POKEMONS } from 'constants';

import {
	getPokemonsDataFromApi,
	getMyPokemonsDetailsFromApi,
} from '../PokemonService';

jest.mock('axios');

const DEFAULT_URL = `${process.env.REACT_APP_POKEAPI_BASE_URL}pokemon?offset=0&limit=${TOTAL_POKEMONS}`;

describe('PokemonService', () => {
	describe('[getPokemonsDataFromApi]', () => {
		it('should fetch pokemons with default URL', async () => {
			const pokemons = [TEST_BLASTOISE, TEST_PIKACHU, TEST_SQUIRTLE];

			axios.get.mockResolvedValueOnce({ data: pokemons });

			const response = await getPokemonsDataFromApi();

			expect(axios.get).toHaveBeenCalledWith(DEFAULT_URL);
			expect(response).toEqual(expect.arrayContaining(pokemons));
		});

		it('should fetch pokemon with custom URL', async () => {
			const pokemon = TEST_BLASTOISE;

			axios.get.mockResolvedValueOnce({ data: pokemon });

			const response = await getPokemonsDataFromApi(pokemon.url);

			expect(axios.get).toHaveBeenCalledWith(pokemon.url);
			expect(response).toEqual(pokemon);
		});
	});

	describe('[getMyPokemonsDetailsFromApi]', () => {
		it('should not crash for invalid inputs', () => {
			expect(getMyPokemonsDetailsFromApi(null)).toHaveLength(0);
			expect(getMyPokemonsDetailsFromApi(undefined)).toHaveLength(0);
			expect(getMyPokemonsDetailsFromApi([])).toHaveLength(0);
		});

		it('should fetch pokemons details', async () => {
			const pokemons = [TEST_BLASTOISE, TEST_PIKACHU, TEST_SQUIRTLE];

			when(axios.get)
				.calledWith(TEST_BLASTOISE.url)
				.mockResolvedValueOnce({ data: TEST_BLASTOISE });

			when(axios.get)
				.calledWith(TEST_PIKACHU.url)
				.mockResolvedValueOnce({ data: TEST_PIKACHU });

			when(axios.get)
				.calledWith(TEST_SQUIRTLE.url)
				.mockResolvedValueOnce({ data: TEST_SQUIRTLE });

			const response = await getMyPokemonsDetailsFromApi(pokemons);

			expect(response).toEqual(pokemons);
		});
	});
});
