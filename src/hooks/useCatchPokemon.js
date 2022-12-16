import { useMemo } from 'react';
import { useQueryClient } from 'react-query';

import useLocalStorage from './useLocalStorage';

import {
	MY_POKEMONS_DETAILS_QUERY_KEY,
	USER_LOCAL_STORAGE_KEY,
} from '../constants';
import { displayToast } from '../utils/toast';

const useCatchPokemon = (pokemon) => {
	const queryClient = useQueryClient();
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

			queryClient.invalidateQueries([MY_POKEMONS_DETAILS_QUERY_KEY]);
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
