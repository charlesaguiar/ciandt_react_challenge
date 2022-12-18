import { useState, useMemo } from 'react';
import useDebounce from './useDebounce';

const useSearch = (searchOnKey, data = []) => {
	const [query, setQuery] = useState('');
	const debouncedQuery = useDebounce(query);

	const filteredData = useMemo(() => {
		if (!debouncedQuery) return data;

		return data.filter((item) =>
			item[searchOnKey].includes(debouncedQuery.toLowerCase())
		);
	}, [debouncedQuery, data]);

	return { debouncedQuery, setQuery, filteredData };
};

export default useSearch;
