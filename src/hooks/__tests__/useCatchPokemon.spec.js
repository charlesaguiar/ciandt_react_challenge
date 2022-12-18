import { act, renderHook, waitFor } from '@testing-library/react';

import { TEST_PIKACHU } from 'mocks';
import { USER_LOCAL_STORAGE_KEY } from 'constants';

import useCatchPokemon from '../useCatchPokemon';

describe('[useCatchPokemon]', () => {
	beforeEach(() => {
		localStorage.setItem(
			USER_LOCAL_STORAGE_KEY,
			JSON.stringify({ name: 'Ash Ketchum' })
		);
	});

	it('should render initial state', () => {
		const { result } = renderHook(() => useCatchPokemon(TEST_PIKACHU));
		expect(
			result.current.handleCatchLeavePokemon instanceof Function
		).toBeTruthy();
		expect(result.current.isPokemonAlreadyCaught).toBe(false);
	});

	it('should catch/set free pokemon correctly', () => {
		const { result } = renderHook(() => useCatchPokemon(TEST_PIKACHU));
		const { handleCatchLeavePokemon, isPokemonAlreadyCaught } = result.current;

		act(() => handleCatchLeavePokemon());

		waitFor(() => expect(isPokemonAlreadyCaught).toBe(true));

		act(() => handleCatchLeavePokemon());

		waitFor(() => expect(isPokemonAlreadyCaught).toBe(false));
	});
});
