import { useMemo, useState } from 'react';

import { POKEMONS_PER_PAGE } from '../constants';

const usePagination = (data = [], itemsPerPage = POKEMONS_PER_PAGE) => {
	const [page, setPage] = useState(0);

	const paginatedData = useMemo(() => {
		return data.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage);
	}, [data, page]);

	return { page, setPage, paginatedData };
};

export default usePagination;
