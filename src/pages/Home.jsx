import { useQuery } from 'react-query';
import { MdSearch } from 'react-icons/md';

import { useAuthContext } from '../contexts/AuthContext';
import usePagination from '../hooks/usePagination';
import useSearch from '../hooks/useSearch';

import getPokemonsDataFromApi from '../services/PokemonService';

import Loading from '../components/Loading';
import Input from '../components/Input';
import Title from '../components/Title';
import PokemonsList from '../components/PokemonsList';
import Pagination from '../components/Pagination';

import { TOTAL_POKEMONS } from '../constants';

export default function Home() {
	const { trainer } = useAuthContext();

	const { isLoading, data } = useQuery({
		queryKey: 'pokemon-list',
		queryFn: () => getPokemonsDataFromApi(),
	});

	const { query, setQuery, filteredData } = useSearch(
		'name',
		data?.results || []
	);

	const { paginatedData, page, setPage } = usePagination(filteredData);

	const handleInputValueChange = (e) => {
		setQuery(e.target.value);
		setPage(0);
	};

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
					onChange={handleInputValueChange}
				/>
			</div>
			<PokemonsList pokemons={paginatedData} />
			<Pagination page={page} setPage={setPage} totalItems={TOTAL_POKEMONS} />
		</>
	);
}
