import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { getPokemonsDataFromApi } from '../services/PokemonService';

import Loading from '../components/Loading';
import Breadcrumbs from '../components/Breadcrumbs';
import PokemonGallery from '../components/Pokemon/PokemonGallery';
import PokemonSummary from '../components/Pokemon/PokemonSummary';

const API_BASE_URL = process.env.REACT_APP_POKEAPI_BASE_URL;

export default function PokemonDetails() {
	const { pokemon: pokemonName } = useParams();

	const { isLoading, data: pokemonData } = useQuery({
		queryKey: `pokemon-details-${pokemonName}`,
		queryFn: () =>
			getPokemonsDataFromApi(`${API_BASE_URL}pokemon/${pokemonName}`),
	});

	if (isLoading || !pokemonData) {
		return <Loading size={300} />;
	}

	return (
		<>
			<Breadcrumbs
				items={[
					{ label: 'Pokemons Yard', url: '/' },
					{ label: pokemonName.toUpperCase(), active: true },
				]}
			/>
			<div className="grid gap-4 grid-cols-1 lg:grid-cols-2 place-items-center">
				<div className="w-full">
					<PokemonSummary pokemon={pokemonData} />
				</div>
				<div className="flex flex-col gap-4 w-full h-full">
					<PokemonGallery pokemon={pokemonData} />
				</div>
			</div>
		</>
	);
}
