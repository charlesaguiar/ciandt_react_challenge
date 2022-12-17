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

export const TEST_PIKACHU = {
	id: 1,
	url: 'https://pokeapi.co/api/v2/pokemon/1/',
	name: 'pikachu',
	types: [{ slot: 1, type: { name: 'electrical' } }],
	stats: [
		{ base_stat: 48, stat: { name: 'attack' } },
		{ base_stat: 78, stat: { name: 'defense' } },
	],
	...BASE_POKEMON_MOCK,
};

export const TEST_SQUIRTLE = {
	id: 2,
	url: 'https://pokeapi.co/api/v2/pokemon/2/',
	name: 'squirtle',
	types: [{ slot: 1, type: { name: 'water' } }],
	stats: [
		{ base_stat: 60, stat: { name: 'attack' } },
		{ base_stat: 30, stat: { name: 'defense' } },
	],
	...BASE_POKEMON_MOCK,
};

export const TEST_BLASTOISE = {
	id: 3,
	url: 'https://pokeapi.co/api/v2/pokemon/3/',
	name: 'blastoise',
	types: [{ slot: 1, type: { name: 'water' } }],
	stats: [
		{ base_stat: 85, stat: { name: 'attack' } },
		{ base_stat: 41, stat: { name: 'defense' } },
		{ base_stat: 75, stat: { name: 'special' } },
	],
	...BASE_POKEMON_MOCK,
};
