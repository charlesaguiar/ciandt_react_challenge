import { useQuery } from 'react-query';

import { getMyPokemonsDetailsFromApi } from '../../../services/PokemonService';

import Loading from '../../Loading';
import Subtitle from '../../Typography/Subtitle';
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
			<div className="flex w-full">
				<PokemonsByTypePieChart myPokemonsDetails={myPokemonsDetails} />
			</div>
		</>
	);
}
