import { useQuery } from 'react-query';
import getPokemonsDataFromApi from '../services/PokemonService';

export default function Home() {
	const { isLoading, data, error } = useQuery({
		queryKey: 'pokemon-list',
		queryFn: () => getPokemonsDataFromApi(),
	});

	console.log({ isLoading, data, error });
	return <div>Home</div>;
}
