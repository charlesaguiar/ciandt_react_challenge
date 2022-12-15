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
