import { useState } from 'react';
import { displayToast } from 'utils/toast';

const useLocalStorage = (key, initialValue) => {
	const [storedValue, setStoredValue] = useState(() => {
		if (!window) return initialValue;

		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			displayToast('Error on recovering data', { type: 'error' });
			return initialValue;
		}
	});

	const setValue = (value) => {
		try {
			const valueToStoreInLocalStorage =
				value instanceof Function ? value(storedValue) : value;
			setStoredValue(valueToStoreInLocalStorage);

			if (window) {
				window.localStorage.setItem(
					key,
					JSON.stringify(valueToStoreInLocalStorage)
				);
			}
		} catch (error) {
			displayToast('Error on setting data', { type: 'error' });
			throw error;
		}
	};

	return [storedValue, setValue];
};

export default useLocalStorage;
