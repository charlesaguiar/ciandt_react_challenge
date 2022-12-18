import { faker } from '@faker-js/faker';

import { act, renderHook } from '@testing-library/react';
import usePagination from '../usePagination';

function createRandomUsers(length) {
	const users = [];

	Array.from({ length }).forEach(() => {
		users.push({
			userId: faker.datatype.uuid(),
			username: faker.internet.userName(),
		});
	});

	return users;
}

describe('[usePagination]', () => {
	let users = createRandomUsers(100);
	let itemsPerPage = 20;

	it('should render initial state', () => {
		const { result } = renderHook(() => usePagination(users, itemsPerPage));
		expect(result.current.page).toBe(0);
		expect(result.current.setPage instanceof Function).toBeTruthy();
		expect(result.current.paginatedData).toEqual(
			expect.arrayContaining(users.slice(0, itemsPerPage))
		);
	});

	it('should return next page when setPage is called', () => {
		const { result } = renderHook(() => usePagination(users, itemsPerPage));

		act(() => result.current.setPage(1));

		expect(result.current.page).toBe(1);
		expect(result.current.paginatedData).toEqual(
			expect.arrayContaining(users.slice(itemsPerPage, 2 * itemsPerPage))
		);
	});

	it('should return correct page when setPage is called with arbitrary value', () => {
		users = createRandomUsers(16);
		itemsPerPage = 3;

		const currentPage = 3;

		const { result } = renderHook(() => usePagination(users, itemsPerPage));

		act(() => result.current.setPage(currentPage));

		expect(result.current.page).toBe(currentPage);
		expect(result.current.paginatedData).toEqual(
			expect.arrayContaining(
				users.slice(
					currentPage * itemsPerPage,
					currentPage * itemsPerPage + itemsPerPage
				)
			)
		);
	});

	it('should return correct items for last page', () => {
		users = createRandomUsers(16);
		itemsPerPage = 3;

		const currentPage = Math.ceil(16 / 3);

		const { result } = renderHook(() => usePagination(users, itemsPerPage));

		act(() => result.current.setPage(currentPage));

		expect(result.current.page).toBe(currentPage);
		expect(result.current.paginatedData).toEqual(
			expect.arrayContaining(
				users.slice(
					currentPage * itemsPerPage,
					currentPage * itemsPerPage + itemsPerPage
				)
			)
		);
	});
});
