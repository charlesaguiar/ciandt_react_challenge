import { useMemo } from 'react';
import { useQuery } from 'react-query';

import { useAuthContext } from '../contexts/AuthContext';
import { getPokemonsDataFromApi } from '../services/PokemonService';

import Loading from '../components/Loading';
import Breadcrumbs from '../components/Breadcrumbs';
import PokemonsList from '../components/Pokemon/PokemonsList';
import MyPokemonsCharts from '../components/Pokemon/Charts';

export default function MyPokemons() {
	const { trainer } = useAuthContext();

	const { isLoading, data: pokemonData } = useQuery({
		queryKey: `my-pokemons`,
		queryFn: () => getPokemonsDataFromApi(),
	});

	const myPokemons = useMemo(() => {
		const myPokemonsNames = trainer?.pokemonsNames || [];
		return pokemonData?.results?.filter((pokemon) =>
			myPokemonsNames.includes(pokemon.name)
		);
	}, [trainer, pokemonData]);

	if (isLoading || !pokemonData) {
		return <Loading size={300} />;
	}

	return (
		<>
			<Breadcrumbs
				items={[
					{ label: 'Pokemons Yard', url: '/' },
					{ label: 'My Pokemons', active: true },
				]}
			/>
			<div className="grid gap-4 grid-cols-1 lg:grid-cols-2 place-items-center">
				<div className="w-full">
					<PokemonsList
						pokemons={myPokemons}
						itemsPerPage={4}
						searchTitle="Search on your owned pokemons!"
					/>
				</div>
				<div className="flex flex-col gap-4 w-full h-full">
					<MyPokemonsCharts myPokemons={myPokemons} />
				</div>
			</div>
		</>
	);
}
