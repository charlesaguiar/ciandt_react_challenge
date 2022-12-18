import { useState, useMemo } from 'react';
import useDebounce from './useDebounce';

const useSearch = (searchOnKey, data = []) => {
	const [query, setQuery] = useState('');
	const debouncedValue = useDebounce(query);

	const filteredData = useMemo(() => {
		if (!debouncedValue) return data;

		return data.filter((item) =>
			item[searchOnKey].includes(debouncedValue.toLowerCase())
		);
	}, [debouncedValue, data]);

	return { query: debouncedValue, setQuery, filteredData };
};

export default useSearch;
