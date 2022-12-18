import _ from 'lodash';

export const getPokemonGalleryImages = (pokemon) => {
	if (!pokemon) return [];

	const sprites = pokemon.sprites || {};

	const mainKeys = Object.keys(sprites).filter(
		(spriteKey) => spriteKey !== 'other' && spriteKey !== 'versions'
	);
	const otherKeys = Object.keys(sprites.other);

	return [
		...mainKeys.map((spriteKey) => ({ url: sprites[spriteKey] })),
		...otherKeys.map((spriteKey) => ({
			url: sprites?.other[spriteKey]?.front_default,
		})),
	].filter((img) => Boolean(img.url));
};

export const getPokemonStats = (pokemonStats) => {
	if (!pokemonStats?.length) return {};

	return pokemonStats.reduce(
		(acc, curr) => ({
			...acc,
			[curr.stat.name]: curr.base_stat,
		}),
		{}
	);
};

export const getBestPokemonsPerStat = (pokemons) => {
	if (!pokemons?.length) return [];

	const allStats = _.uniq(
		pokemons.map(({ stats }) => stats.map(({ stat }) => stat.name)).flat()
	);

	const statsByPokemon = pokemons.map((pokemon) => ({
		name: pokemon.name,
		...getPokemonStats(pokemon.stats),
	}));

	return allStats.map((stat) => {
		const bestPokemonForStat = _.maxBy(statsByPokemon, stat);

		return {
			stat,
			best: bestPokemonForStat[stat],
			name: bestPokemonForStat.name,
		};
	});
};

export const getPokemonsByType = (pokemons) => {
	if (!pokemons?.length) return [];

	const allTypes = _.uniq(
		pokemons.map(({ types }) => types.map(({ type }) => type.name)).flat()
	);

	return allTypes.map((type) => ({
		type,
		quantity: pokemons.filter((pokemon) =>
			pokemon.types.some((innerType) => innerType.type.name === type)
		).length,
	}));
};
