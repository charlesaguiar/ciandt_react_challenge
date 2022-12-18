import { useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';

import ProgressBar from 'components/ProgressBar';
import Subtitle from 'components/Typography/Subtitle';

import { STATS_COLORS } from 'appConstants';

const columnHelper = createColumnHelper();

const columns = [
	columnHelper.accessor('id', {
		cell: (info) => info.getValue(),
		header: () => <span>#</span>,
	}),
	columnHelper.accessor('name', {
		cell: (info) => <strong>{info.getValue().toUpperCase()}</strong>,
		header: () => <span>Name</span>,
	}),
	columnHelper.accessor('weight', {
		cell: (info) => info.getValue(),
		header: () => <span>Weight (kg)</span>,
	}),
	columnHelper.accessor('height', {
		cell: (info) => info.getValue(),
		header: () => <span>Height (cm)</span>,
	}),
	columnHelper.accessor((row) => row.stats[0].base_stat, {
		id: 'hp',
		cell: (info) => (
			<ProgressBar value={info.getValue()} color={STATS_COLORS[0]} />
		),
		header: () => <span>HP</span>,
	}),
	columnHelper.accessor((row) => row.stats[1].base_stat, {
		id: 'attack',
		cell: (info) => (
			<ProgressBar value={info.getValue()} color={STATS_COLORS[1]} />
		),
		header: () => <span>Attack</span>,
	}),
	columnHelper.accessor((row) => row.stats[2].base_stat, {
		id: 'defense',
		cell: (info) => (
			<ProgressBar value={info.getValue()} color={STATS_COLORS[2]} />
		),
		header: () => <span>Defense</span>,
	}),
];

export default function MyPokemonsSummayTable({ myPokemons }) {
	const [sorting, setSorting] = useState([]);
	const navigate = useNavigate();

	const table = useReactTable({
		data: myPokemons,
		columns,
		state: { sorting },
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});

	return (
		<div className="w-full my-4">
			<Subtitle>Summary Table</Subtitle>
			<div className="max-w-full max-h-[300px] overflow-auto mt-4 border-b border-b-gray-300 shadow-lg rounded-xl">
				<table className="w-full">
					<thead className="sticky top-0 m-0 border-b border-b-gray-300 bg-gray-100 z-50">
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id} className="px-3">
								{headerGroup.headers.map((header) => (
									<th key={header.id} className="text-start py-2 px-3">
										{header.isPlaceholder ? null : (
											<div
												{...{
													className: header.column.getCanSort()
														? 'flex items-center gap-1 cursor-pointer select-none'
														: '',
													onClick: header.column.getToggleSortingHandler(),
												}}
											>
												{flexRender(
													header.column.columnDef.header,
													header.getContext()
												)}
												{{
													asc: (
														<MdKeyboardArrowUp
															className="text-gray-500 hover:text-black"
															size={24}
														/>
													),
													desc: (
														<MdKeyboardArrowDown
															className="text-gray-500 hover:text-black"
															size={24}
														/>
													),
												}[header.column.getIsSorted()] ?? null}
											</div>
										)}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						{table.getRowModel().rows.map((row) => (
							<tr
								key={row.id}
								className="cursor-pointer hover:bg-gray-50"
								onClick={() => navigate(`/pokemon/${row.original.id}`)}
							>
								{row.getVisibleCells().map((cell) => (
									<td key={cell.id} className="py-2 px-3">
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
