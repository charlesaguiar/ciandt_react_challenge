import { useMemo } from 'react';
import useLocalStorage from './useLocalStorage';

import { USER_LOCAL_STORAGE_KEY } from '../constants';
import { displayToast } from '../utils/toast';

const useCatchPokemon = (pokemon) => {
	const [trainer, setTrainer] = useLocalStorage(USER_LOCAL_STORAGE_KEY, null);

	const handleCatchLeavePokemon = () => {
		if (!trainer || !pokemon) return;
		const trainerPokemonsIds = trainer.pokemonsIds || [];

		try {
			if (trainerPokemonsIds.includes(pokemon.id)) {
				setTrainer((prevTrainer) => ({
					...prevTrainer,
					pokemonsIds: prevTrainer.pokemonsIds.filter(
						(id) => id !== pokemon.id
					),
				}));
				displayToast(`You set ${pokemon.name.toUpperCase()} free!`, {
					type: 'success',
				});
				return;
			}

			setTrainer((prevTrainer) => ({
				...prevTrainer,
				pokemonsIds: [pokemon.id, ...(prevTrainer.pokemonsIds || [])],
			}));
			displayToast(`You caught ${pokemon.name.toUpperCase()}!`, {
				type: 'success',
			});
		} catch {
			displayToast('There was an error! Please, try again.', { type: 'error' });
		}
	};

	const isPokemonAlreadyCaught = useMemo(() => {
		return (trainer.pokemonsIds || []).includes(pokemon?.id);
	}, [trainer, pokemon?.id]);

	return { handleCatchLeavePokemon, isPokemonAlreadyCaught };
};

export default useCatchPokemon;
