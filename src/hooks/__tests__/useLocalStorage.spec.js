import { act, renderHook } from '@testing-library/react';
import { USER_LOCAL_STORAGE_KEY } from 'constants';

import useLocalStorage from '../useLocalStorage';

describe('[useLocalStorage]', () => {
	const value = { name: 'John Doe' };

	it('should update localStorage when state changes', () => {
		const { result } = renderHook(() =>
			useLocalStorage(USER_LOCAL_STORAGE_KEY, null)
		);

		const [, setValue] = result.current;

		act(() => setValue(value));

		expect(JSON.parse(localStorage.getItem(USER_LOCAL_STORAGE_KEY))).toEqual(
			value
		);
	});

	it('should set the default value from localStorage if it exists', () => {
		const testKey = 'jest:test';
		const testValue = { test: 'test' };
		localStorage.setItem(testKey, JSON.stringify(testValue));

		const { result } = renderHook(() => useLocalStorage(testKey));

		const [storedValue] = result.current;
		expect(storedValue).toEqual(testValue);
	});
});
