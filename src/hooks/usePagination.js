import { useState, useMemo } from 'react';

const usePagination = (data = [], itemsPerPage = 20) => {
	const [page, setPage] = useState(0);

	const paginatedData = useMemo(() => {
		return data.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage);
	}, [data, page]);

	return { page, setPage, paginatedData };
};

export default usePagination;
