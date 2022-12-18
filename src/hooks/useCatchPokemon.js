import { useMemo } from 'react';

import { USER_LOCAL_STORAGE_KEY } from 'appConstants';
import { displayToast } from 'utils/toast';

import useLocalStorage from './useLocalStorage';

const useCatchPokemon = (pokemon) => {
	const [trainer, setTrainer] = useLocalStorage(USER_LOCAL_STORAGE_KEY, null);

	const handleCatchLeavePokemon = () => {
		if (!trainer || !pokemon) return;
		const trainerPokemonsNames = trainer.pokemonsNames || [];

		try {
			if (trainerPokemonsNames.includes(pokemon.name)) {
				setTrainer((prevTrainer) => ({
					...prevTrainer,
					pokemonsNames: prevTrainer.pokemonsNames.filter(
						(name) => name !== pokemon.name
					),
				}));
				displayToast(`You set ${pokemon.name.toUpperCase()} free!`, {
					type: 'success',
				});
				return;
			}

			setTrainer((prevTrainer) => ({
				...prevTrainer,
				pokemonsNames: [pokemon.name, ...(prevTrainer.pokemonsNames || [])],
			}));
			displayToast(`You caught ${pokemon.name.toUpperCase()}!`, {
				type: 'success',
			});
		} catch {
			displayToast('There was an error! Please, try again.', { type: 'error' });
		}
	};

	const isPokemonAlreadyCaught = useMemo(() => {
		return (trainer.pokemonsNames || []).includes(pokemon?.name);
	}, [trainer, pokemon?.name]);

	return { handleCatchLeavePokemon, isPokemonAlreadyCaught };
};

export default useCatchPokemon;
