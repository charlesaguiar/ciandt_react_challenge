import {
	getPokemonGalleryImages,
	getPokemonStats,
	getBestPokemonsPerStat,
	getPokemonsByType,
} from '../pokemon';

const BASE_POKEMON_MOCK = {
	sprites: {
		front_default: 'url_img_a',
		back_default: 'url_img_b',
		front_female: null,
		other: {
			dream_world: { front_default: 'url_img_other_a' },
		},
		versions: {
			generation_i: { red_blue: { back_default: 'url_img_version_a' } },
		},
	},
};

const TEST_PIKACHU = {
	id: 1,
	name: 'pikachu',
	types: [{ slot: 1, type: { name: 'electrical' } }],
	stats: [
		{ base_stat: 48, stat: { name: 'attack' } },
		{ base_stat: 78, stat: { name: 'defense' } },
	],
	...BASE_POKEMON_MOCK,
};

const TEST_SQUIRTLE = {
	id: 2,
	name: 'squirtle',
	types: [{ slot: 1, type: { name: 'water' } }],
	stats: [
		{ base_stat: 60, stat: { name: 'attack' } },
		{ base_stat: 30, stat: { name: 'defense' } },
	],
	...BASE_POKEMON_MOCK,
};

const TEST_BLASTOISE = {
	id: 3,
	name: 'blastoise',
	types: [{ slot: 1, type: { name: 'water' } }],
	stats: [
		{ base_stat: 85, stat: { name: 'attack' } },
		{ base_stat: 41, stat: { name: 'defense' } },
		{ base_stat: 75, stat: { name: 'special' } },
	],
	...BASE_POKEMON_MOCK,
};

describe('[getPokemonGalleryImages]', () => {
	it('should not crash for invalid inputs', () => {
		expect(getPokemonGalleryImages(null)).toHaveLength(0);
		expect(getPokemonGalleryImages(undefined)).toHaveLength(0);
	});

	it('should build pokemon gallery with only valid urls', () => {
		const gallery = getPokemonGalleryImages(TEST_PIKACHU);
		expect(gallery).toEqual(
			expect.arrayContaining([
				{ url: 'url_img_a' },
				{ url: 'url_img_b' },
				{ url: 'url_img_other_a' },
			])
		);
	});
});

describe('[getPokemonStats]', () => {
	it('should not crash for invalid inputs', () => {
		expect(getPokemonStats(null)).toEqual({});
		expect(getPokemonStats(undefined)).toEqual({});
	});

	it('should build pokemon stats correctly', () => {
		const stats = getPokemonStats(TEST_PIKACHU.stats);
		expect(stats).toEqual({ defense: 78, attack: 48 });
	});
});

describe('[getBestPokemonsPerStat]', () => {
	it('should not crash for invalid inputs', () => {
		expect(getBestPokemonsPerStat(null)).toHaveLength(0);
		expect(getBestPokemonsPerStat(undefined)).toHaveLength(0);
		expect(getBestPokemonsPerStat([])).toHaveLength(0);
	});

	it('should compute best pokemons for all available stats', () => {
		const bestPokemonsPerStat = getBestPokemonsPerStat([
			TEST_PIKACHU,
			TEST_SQUIRTLE,
			TEST_BLASTOISE,
		]);

		// 3 possible stats: attack, defense, special
		// even if some pokemons do NOT have 'special' stat
		expect(bestPokemonsPerStat).toHaveLength(3);

		expect(bestPokemonsPerStat).toStrictEqual(
			expect.arrayContaining([
				{
					stat: 'defense',
					best: TEST_PIKACHU.stats[1].base_stat,
					name: TEST_PIKACHU.name,
				},
				{
					stat: 'attack',
					best: TEST_BLASTOISE.stats[0].base_stat,
					name: TEST_BLASTOISE.name,
				},
				{
					stat: 'special',
					best: TEST_BLASTOISE.stats[2].base_stat,
					name: TEST_BLASTOISE.name,
				},
			])
		);
	});
});

describe('[getPokemonsByType]', () => {
	it('should not crash for invalid inputs', () => {
		expect(getPokemonsByType(null)).toHaveLength(0);
		expect(getPokemonsByType(undefined)).toHaveLength(0);
		expect(getPokemonsByType([])).toHaveLength(0);
	});

	it('should compute pokemons per type', () => {
		const pokemonsPerType = getPokemonsByType([
			TEST_PIKACHU,
			TEST_SQUIRTLE,
			TEST_BLASTOISE,
		]);

		// 2 available types: electrical and water
		expect(pokemonsPerType).toHaveLength(2);

		expect(pokemonsPerType.find((t) => t.type === 'water').quantity).toBe(2);
		expect(pokemonsPerType.find((t) => t.type === 'electrical').quantity).toBe(
			1
		);
	});
});
