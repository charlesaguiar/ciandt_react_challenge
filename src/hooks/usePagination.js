import { useMemo } from 'react';
import useLocalStorage from './useLocalStorage';

import { POKEMONS_PER_PAGE } from '../constants';

const usePagination = (data = [], itemsPerPage = POKEMONS_PER_PAGE) => {
	const [page, setPage] = useLocalStorage('home:current-page', 0);

	const paginatedData = useMemo(() => {
		return data.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage);
	}, [data, page]);

	return { page, setPage, paginatedData };
};

export default usePagination;
