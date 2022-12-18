import { useMemo } from 'react';
import {
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
} from 'recharts';

import { CHART_COLORS } from 'appConstants';
import { getPokemonsByType } from 'utils/pokemon';

import Subtitle from 'components/Typography/Subtitle';
import ChartCard from './ChartCard';

export default function PokemonsByTypePieChart({ myPokemonsDetails }) {
	const typePieChartData = useMemo(() => {
		return getPokemonsByType(myPokemonsDetails);
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
		<div className="flex gap-3 p-4 text-white font-bold uppercase bg-[rgba(1,1,1,0.5)]">
			<span className="">{name}:</span>
			<span>{value}</span>
		</div>
	);
}
