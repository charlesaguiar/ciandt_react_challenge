import { useQuery } from 'react-query';

import { getMyPokemonsDetailsFromApi } from '../../../services/PokemonService';

import Loading from '../../Loading';
import Subtitle from '../../Typography/Subtitle';
import MyPokemonsSummayTable from '../MyPokemonsSummayTable';
import BestPokemonsPerStatBarChart from './BestPokemonsPerStatBarChart';
import PokemonsByTypePieChart from './PokemonsByTypePieChart';

export default function MyPokemonsCharts({ myPokemons }) {
	const { isLoading, data: myPokemonsDetails } = useQuery({
		queryKey: `my-pokemons-details`,
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
