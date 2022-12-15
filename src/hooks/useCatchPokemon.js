import { useMemo } from 'react';
import useLocalStorage from './useLocalStorage';

import { USER_LOCAL_STORAGE_KEY } from '../constants';

const useCatchPokemon = (pokemon) => {
	const [trainer, setTrainer] = useLocalStorage(USER_LOCAL_STORAGE_KEY, null);

	const handleCatchLeavePokemon = () => {
		if (!trainer) return;
		const trainerPokemonsIds = trainer.pokemonsIds || [];
		if (trainerPokemonsIds.includes(pokemon.id)) {
			setTrainer((prevTrainer) => ({
				...prevTrainer,
				pokemonsIds: prevTrainer.pokemonsIds.filter((id) => id !== pokemon.id),
			}));
			return;
		}

		setTrainer((prevTrainer) => ({
			...prevTrainer,
			pokemonsIds: [pokemon.id, ...(prevTrainer.pokemonsIds || [])],
		}));
	};

	const isPokemonAlreadyCaught = useMemo(() => {
		return (trainer.pokemonsIds || []).includes(pokemon.id);
	}, [trainer, pokemon.id]);

	return { handleCatchLeavePokemon, isPokemonAlreadyCaught };
};

export default useCatchPokemon;
