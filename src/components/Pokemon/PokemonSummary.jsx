import { useState } from 'react';
import { MdCatchingPokemon } from 'react-icons/md';

import useCatchPokemon from '../../hooks/useCatchPokemon';

import Divider from '../Divider';
import Title from '../Typography/Title';
import Subtitle from '../Typography/Subtitle';

import { STATS_COLORS } from '../../constants';
import ProgressBar from '../ProgressBar';

export default function PokemonSummary({ pokemon }) {
	const [showCatchLabel, setShowCatchLabel] = useState(false);
	const { handleCatchLeavePokemon, isPokemonAlreadyCaught } =
		useCatchPokemon(pokemon);

	return (
		<>
			<div className="flex justify-between max-w-[100%] md:max-w-[80%]">
				<div>
					<Title>{pokemon.name.toUpperCase()}</Title>
					{isPokemonAlreadyCaught ? (
						<span className="text-sm text-gray-500 font-semibold">
							You own this Pokemon!
						</span>
					) : null}
				</div>
				<button
					type="button"
					className={`flex gap-4 max-h-[50px] justify-between items-center px-3 py-1 rounded-full hover:bg-blue-100 cursor-pointer text-indigo-400 hover:text-blue-500 ${
						showCatchLabel ? 'w-[150px]' : 'w-[60px]'
					} duration-700 ease-in-out`}
					onClick={handleCatchLeavePokemon}
					onMouseEnter={() => setShowCatchLabel(true)}
					onMouseLeave={() => setShowCatchLabel(false)}
				>
					<span
						className={`${
							showCatchLabel ? 'block' : 'hidden'
						} text-xl font-bold`}
					>
						{isPokemonAlreadyCaught ? 'Leave' : 'Catch'}
					</span>
					<MdCatchingPokemon className="animate-bounce" size={32} />
				</button>
			</div>

			<div className="max-w-[100%] md:max-w-[80%]">
				<Divider />
			</div>

			<div className="flex gap-2 flex-wrap mt-4">
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
						<ProgressBar
							title={stat?.name}
							value={baseStat}
							color={STATS_COLORS[i]}
							key={stat?.name}
						/>
					))}
				</div>
			</div>
		</>
	);
}
