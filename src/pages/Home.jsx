import { useState, useMemo } from 'react';
import { useQuery } from 'react-query';
import { MdSearch } from 'react-icons/md';

import getPokemonsDataFromApi from '../services/PokemonService';
import { useAuthContext } from '../contexts/AuthContext';

import Loading from '../components/Loading';
import Input from '../components/Input';
import Title from '../components/Title';
import PokemonsList from '../components/PokemonsList';

export default function Home() {
	const [query, setQuery] = useState('');

	const { trainer } = useAuthContext();

	const { isLoading, data } = useQuery({
		queryKey: 'pokemon-list',
		queryFn: () => getPokemonsDataFromApi(),
	});

	const filteredPokemons = useMemo(() => {
		if (!query) return data?.results || [];
		return data?.results?.filter((pokemon) =>
			pokemon.name.includes(query.toLowerCase())
		);
	}, [query, data]);

	if (isLoading) {
		return <Loading size={300} />;
	}

	return (
		<>
			<Title>Welcome, {trainer.name}</Title>
			<div className="flex flex-col items-center justify-center my-10 gap-3">
				<h3 className="text-xl font-bold text-gray-500">
					Which pokemon you want catch today?
				</h3>
				<Input
					placeholder="Search for pokemon name"
					className="min-w-[300px]"
					startIcon={<MdSearch size={28} className="text-gray-500" />}
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
			</div>
			<PokemonsList pokemons={filteredPokemons.slice(0, 20)} />
		</>
	);
}
