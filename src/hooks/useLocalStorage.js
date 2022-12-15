import { useState } from 'react';

const useLocalStorage = (key, initialValue) => {
	const [storedValue, setStoredValue] = useState(() => {
		/* prevents from crashing if not running on a browser */
		if (!window) return initialValue;

		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.error('[USELOCALSTORAGE] Error: ', error);
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
			console.error('[USELOCALSTORAGE] Error: ', error);
		}
	};

	return [storedValue, setValue];
};

export default useLocalStorage;
