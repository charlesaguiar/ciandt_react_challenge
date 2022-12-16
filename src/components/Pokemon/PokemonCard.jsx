import { MdStar } from 'react-icons/md';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import useCatchPokemon from '../../hooks/useCatchPokemon';

import { getPokemonsDataFromApi } from '../../services/PokemonService';

import Divider from '../Divider';
import Loading from '../Loading';

export default function PokemonCard({ pokemon }) {
	const { isLoading, data } = useQuery({
		queryKey: `pokemon-card-details-${pokemon.name}`,
		queryFn: () => getPokemonsDataFromApi(pokemon.url),
	});

	const { isPokemonAlreadyCaught } = useCatchPokemon(data);

	return (
		<Link to={`/pokemon/${pokemon.name}`}>
			<div className="flex flex-col gap-3 rounded-xl shadow-lg p-6 cursor-pointer">
				{isLoading ? (
					<Loading size={200} />
				) : (
					<div className="relative">
						<img
							className={`${
								isPokemonAlreadyCaught ? 'opacity-100' : 'opacity-60'
							} w-[200px] h-[200px] hover:w-[210px] hover:h-[210px] hover:opacity-100 duration-200 ease-in-out`}
							src={data.sprites.other.dream_world.front_default}
							alt={data.name}
						/>
						<Divider />
						<div className="flex justify-between items-center">
							<strong className="uppercase leading-tight">{data.name}</strong>
							<strong className="text-gray-500">#{data.id}</strong>
						</div>
						<div>
							<span className="text-sm">
								Type(s): {data.types.map((type) => type?.type?.name).join(', ')}
							</span>
						</div>

						{isPokemonAlreadyCaught ? (
							<div className="absolute top-2 -left-4 bg-blue-500 rounded-full">
								<MdStar color="white" size={24} />
							</div>
						) : null}
					</div>
				)}
			</div>
		</Link>
	);
}
