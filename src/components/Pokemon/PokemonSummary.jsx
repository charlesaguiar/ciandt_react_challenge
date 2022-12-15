import { useState } from 'react';
import { MdCatchingPokemon } from 'react-icons/md';

import Title from '../Typography/Title';
import Subtitle from '../Typography/Subtitle';

import { STATS_COLORS } from '../../constants';

export default function PokemonSummary({ pokemon }) {
	const [showCatchLabel, setShowCatchLabel] = useState(false);

	return (
		<>
			<div className="flex justify-between items-center max-w-[100%] md:max-w-[80%]">
				<Title>{pokemon.name.toUpperCase()}</Title>
				<div
					className={`flex gap-4 justify-between items-center px-3 py-1 rounded-full hover:bg-blue-100 cursor-pointer text-indigo-400 hover:text-blue-500 ${
						showCatchLabel ? 'w-[180px]' : 'w-[60px]'
					} duration-700 ease-in-out`}
					onMouseEnter={() => setShowCatchLabel(true)}
					onMouseLeave={() => setShowCatchLabel(false)}
				>
					<span
						className={`${
							showCatchLabel ? 'block' : 'hidden'
						} text-xl font-bold`}
					>
						Catch!
					</span>
					<MdCatchingPokemon className="animate-bounce" size={32} />
				</div>
			</div>
			<div className="flex gap-2 flex-wrap">
				{pokemon.types.map(({ type }) => (
					<span
						key={type?.name}
						className="px-4 py-2 bg-blue-200 font-bold text-white rounded-xl hover:bg-blue-500"
					>
						{type?.name.toUpperCase()}
					</span>
				))}
			</div>
			<div className="flex flex-col my-8 gap-2">
				<Subtitle>Abilities</Subtitle>
				<div className="flex gap-2 flex-wrap">
					{pokemon.abilities.map(({ ability }) => (
						<span
							key={ability?.name}
							className="px-4 py-2 bg-red-200 font-bold text-white rounded-xl hover:bg-red-500"
						>
							{ability?.name.toUpperCase()}
						</span>
					))}
				</div>
			</div>
			<div className="flex flex-col my-8 gap-2">
				<Subtitle>Stats</Subtitle>
				<div className="flex flex-col flex-wrap max-w-[100%] md:max-w-[80%]">
					{pokemon.stats.map(({ stat, base_stat: baseStat }, i) => (
						<>
							<span className="mb-1">{stat?.name?.toUpperCase()}</span>
							<div className="relative w-100 h-[8px] rounded-full border border-gray-300 mb-3">
								<div
									className="h-full"
									style={{
										width: `${Math.ceil(baseStat > 100 ? 100 : baseStat)}%`,
										backgroundColor: STATS_COLORS[i],
									}}
								/>
							</div>
						</>
					))}
				</div>
			</div>
		</>
	);
}
