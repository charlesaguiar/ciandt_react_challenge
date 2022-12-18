import { TEST_PIKACHU, TEST_SQUIRTLE, TEST_BLASTOISE } from 'mocks';
import {
	getPokemonGalleryImages,
	getPokemonStats,
	getBestPokemonsPerStat,
	getPokemonsByType,
} from '../pokemon';

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
