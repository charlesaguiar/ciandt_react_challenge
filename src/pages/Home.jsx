import { useQuery } from 'react-query';

import { useAuthContext } from '../contexts/AuthContext';

import getPokemonsDataFromApi from '../services/PokemonService';

import Loading from '../components/Loading';
import Title from '../components/Typography/Title';
import PokemonsList from '../components/Pokemon/PokemonsList';

export default function Home() {
	const { trainer } = useAuthContext();

	const { isLoading, data } = useQuery({
		queryKey: 'pokemon-list',
		queryFn: () => getPokemonsDataFromApi(),
	});

	if (isLoading || !data) {
		return <Loading size={300} />;
	}

	return (
		<>
			<Title>Welcome, {trainer.name}</Title>
			<PokemonsList pokemons={data?.results || []} />
		</>
	);
}
