import { useState, useMemo } from 'react';

const useSearch = (searchOnKey, data = []) => {
	const [query, setQuery] = useState('');

	const filteredData = useMemo(() => {
		if (!query) return data;

		return data.filter((item) =>
			item[searchOnKey].includes(query.toLowerCase())
		);
	}, [query, data]);

	return { query, setQuery, filteredData };
};

export default useSearch;
