import React from 'react';
import PokemonCard from './PokemonCard';

export default function PokemonsList({ pokemons }) {
	if (!pokemons?.length) {
		return <div>No pokemons found</div>;
	}

	return (
		<div className="flex flex-wrap gap-3 items-center justify-center w-full">
			{pokemons.map((pokemon) => (
				<PokemonCard key={pokemon.name} pokemon={pokemon} />
			))}
		</div>
	);
}
