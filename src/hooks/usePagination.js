import { useMemo } from 'react';
import useLocalStorage from './useLocalStorage';

const usePagination = (data = [], itemsPerPage = 20) => {
	const [page, setPage] = useLocalStorage('home:current-page', 0);

	const paginatedData = useMemo(() => {
		return data.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage);
	}, [data, page]);

	return { page, setPage, paginatedData };
};

export default usePagination;
