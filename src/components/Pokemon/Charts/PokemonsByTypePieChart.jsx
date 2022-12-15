import { useMemo } from 'react';
import {
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
} from 'recharts';
import _ from 'lodash';

import Subtitle from '../../Typography/Subtitle';
import ChartCard from './ChartCard';

import { CHART_COLORS } from '../../../constants';

export default function PokemonsByTypePieChart({ myPokemonsDetails }) {
	const typePieChartData = useMemo(() => {
		if (!myPokemonsDetails?.length) return [];

		const allTypes = _.uniq(
			myPokemonsDetails
				.map(({ types }) => types.map(({ type }) => type.name))
				.flat()
		);

		return allTypes.map((type) => ({
			type,
			quantity: myPokemonsDetails.filter((pokemon) =>
				pokemon.types.some((innerType) => innerType.type.name === type)
			).length,
		}));
	}, [myPokemonsDetails]);

	return (
		<ChartCard>
			<Subtitle size="md">Pokemons By Type</Subtitle>
			<ResponsiveContainer className="self-center" width="100%" height={300}>
				<PieChart>
					<Pie
						data={typePieChartData}
						dataKey="quantity"
						nameKey="type"
						cx="50%"
						cy="50%"
						innerRadius={60}
						outerRadius={80}
						fill="#82ca9d"
						label
					>
						{typePieChartData.map((type, i) => (
							<Cell key={type} fill={CHART_COLORS[i % CHART_COLORS.length]} />
						))}
					</Pie>
					<Legend content={<CustomLegend />} />
					<Tooltip content={<CustomTooltip />} />
				</PieChart>
			</ResponsiveContainer>
		</ChartCard>
	);
}

function CustomLegend(props) {
	const { payload } = props;
	return (
		<ul className="flex gap-2 flex-wrap mt-3 justify-center">
			{payload.map((entry) => (
				<li key={entry.value} className="flex gap-1 items-center">
					<div
						className="w-2 h-2 rounded-full"
						style={{ backgroundColor: entry.color }}
					/>
					<span>{entry.value}</span>
				</li>
			))}
		</ul>
	);
}

function CustomTooltip(props) {
	const { active, payload } = props;

	if (!active) return null;

	const { name, value } = payload[0];

	return (
		<div className="flex gap-3 p-4 text-white font-bold uppercase bg-[rgba(1,1,1,0.3)]">
			<span className="">{name}:</span>
			<span>{value}</span>
		</div>
	);
}
