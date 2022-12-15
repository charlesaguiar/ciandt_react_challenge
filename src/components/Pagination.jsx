import { useCallback } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import ReactPaginate from 'react-paginate';

import { POKEMONS_PER_PAGE } from '../constants';

export default function Pagination({
	page,
	setPage,
	totalItems,
	itemsPerPage = POKEMONS_PER_PAGE,
	scrollToTopOnPageChange = true,
}) {
	const onPageChange = useCallback((newPage) => {
		setPage(newPage.selected);

		if (scrollToTopOnPageChange) {
			window?.scrollTo({
				top: 0,
				behavior: 'smooth',
			});
		}
	});

	return (
		<ReactPaginate
			breakLabel="..."
			nextLabel={<MdChevronRight size={30} />}
			onPageChange={onPageChange}
			pageRangeDisplayed={3}
			pageCount={Math.ceil(totalItems / itemsPerPage)}
			previousLabel={<MdChevronLeft size={30} />}
			renderOnZeroPageCount={null}
			forcePage={page}
			className="flex gap-1 justify-center items-center my-8 border-t border-t-gray-300 py-5 px-1"
			pageClassName="p-2 rounded-xl font-bold hover:bg-blue-200"
			activeClassName="bg-blue-400 text-white hover:bg-blue-400"
			disabledClassName="text-gray-300"
		/>
	);
}
