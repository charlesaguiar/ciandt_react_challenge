import { MdSearch } from 'react-icons/md';

import usePagination from 'hooks/usePagination';
import useSearch from 'hooks/useSearch';

import Input from 'components/Input';
import Pagination from 'components/Pagination';
import PokemonCard from 'components/Pokemon/PokemonCard';

import { POKEMONS_PER_PAGE } from 'appConstants';

export default function PokemonsList({
	pokemons,
	searchTitle = 'Which pokemon you want catch today?',
	itemsPerPage = POKEMONS_PER_PAGE,
}) {
	const { query, setQuery, filteredData } = useSearch('name', pokemons || []);

	const { paginatedData, page, setPage } = usePagination(
		filteredData,
		itemsPerPage
	);

	const handleInputValueChange = (e) => {
		setQuery(e.target.value);
		setPage(0);
	};

	return (
		<>
			<div className="flex flex-col items-center justify-center my-10 gap-3">
				<h3 className="text-xl font-bold text-gray-500">{searchTitle}</h3>
				<Input
					placeholder="Search for pokemon name"
					className="min-w-[300px]"
					startIcon={<MdSearch size={28} className="text-gray-500" />}
					value={query}
					onChange={handleInputValueChange}
				/>
			</div>
			<div className="flex flex-wrap gap-3 items-center justify-center w-full">
				{paginatedData?.length ? (
					paginatedData.map((pokemon) => (
						<PokemonCard key={pokemon.url} pokemon={pokemon} />
					))
				) : (
					<div>No pokemons found</div>
				)}
			</div>
			<Pagination
				page={page}
				setPage={setPage}
				totalItems={pokemons.length}
				itemsPerPage={itemsPerPage}
			/>
		</>
	);
}
