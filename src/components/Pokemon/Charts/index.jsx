import { useQuery } from 'react-query';

import { getMyPokemonsDetailsFromApi } from 'services/PokemonService';
import { MY_POKEMONS_DETAILS_QUERY_KEY } from 'appConstants';

import Loading from 'components/Loading';
import Subtitle from 'components/Typography/Subtitle';
import MyPokemonsSummayTable from 'components/Pokemon/MyPokemonsSummayTable';

import BestPokemonsPerStatBarChart from './BestPokemonsPerStatBarChart';
import PokemonsByTypePieChart from './PokemonsByTypePieChart';

export default function MyPokemonsCharts({ myPokemons }) {
	const { isLoading, data: myPokemonsDetails } = useQuery({
		queryKey: MY_POKEMONS_DETAILS_QUERY_KEY,
		queryFn: () => getMyPokemonsDetailsFromApi(myPokemons),
	});

	if (isLoading || !myPokemonsDetails) {
		return <Loading size={300} />;
	}

	return (
		<>
			<Subtitle>Charts</Subtitle>
			<div className="flex flex-col lg:flex-row gap-4 w-full">
				<PokemonsByTypePieChart myPokemonsDetails={myPokemonsDetails} />
				<BestPokemonsPerStatBarChart myPokemonsDetails={myPokemonsDetails} />
			</div>
			<div className="w-full">
				<MyPokemonsSummayTable myPokemons={myPokemonsDetails} />
			</div>
		</>
	);
}
