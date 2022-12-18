import { useMemo } from 'react';
import {
	Cell,
	Bar,
	BarChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
	CartesianGrid,
} from 'recharts';

import { CHART_COLORS } from 'appConstants';
import { getBestPokemonsPerStat } from 'utils/pokemon';

import Subtitle from 'components/Typography/Subtitle';
import ChartCard from './ChartCard';

export default function BestPokemonsPerStatBarChart({ myPokemonsDetails }) {
	const statsBarChartData = useMemo(() => {
		return getBestPokemonsPerStat(myPokemonsDetails);
	}, [myPokemonsDetails]);

	return (
		<ChartCard>
			<Subtitle size="md">Best Pokemons Per Stat</Subtitle>
			<ResponsiveContainer className="self-center" width="100%" height={300}>
				<BarChart data={statsBarChartData}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="stat" />
					<YAxis />
					<Tooltip content={<CustomTooltip />} />
					<Bar dataKey="best">
						{statsBarChartData.map((type, i) => (
							<Cell key={type} fill={CHART_COLORS[i % CHART_COLORS.length]} />
						))}
					</Bar>
				</BarChart>
			</ResponsiveContainer>
		</ChartCard>
	);
}

function CustomTooltip(props) {
	const { active, payload } = props;

	if (!active) return null;

	const {
		payload: { best, name, stat },
	} = payload[0];

	return (
		<div className="flex flex-col gap-3 p-4 text-white font-bold uppercase bg-[rgba(1,1,1,0.5)]">
			<span>BEST POKEMON in {stat}:</span>
			<div className="w-full h-[1px] my-2 bg-white" />
			<div className="flex gap-2">
				<span className="">{name}:</span>
				<span>{best} points</span>
			</div>
		</div>
	);
}
