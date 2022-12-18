import { act, renderHook } from '@testing-library/react';
import useSearch from '../useSearch';

describe('[useSearch]', () => {
	const data = [
		{ id: 1, name: 'foo' },
		{ id: 2, name: 'bar' },
		{ id: 3, name: 'baz' },
	];

	it('should render initial state', () => {
		const { result } = renderHook(() => useSearch('name', data));
		expect(result.current.query).toBe('');
		expect(result.current.setQuery instanceof Function).toBeTruthy();
		expect(result.current.filteredData).toEqual(expect.arrayContaining(data));
	});

	it('should filter data when setQuery is called', () => {
		const searchTerm = 'foo';
		const { result } = renderHook(() => useSearch('name', data));

		act(() => result.current.setQuery(searchTerm));

		expect(result.current.query).toBe(searchTerm);
		expect(result.current.filteredData).toEqual(
			expect.arrayContaining(
				data.filter((item) => item.name.includes(searchTerm))
			)
		);
	});
});
