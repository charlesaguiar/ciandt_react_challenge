import { createContext, useCallback, useContext, useMemo } from 'react';
import { USER_LOCAL_STORAGE_KEY } from '../constants';

import useLocalStorage from '../hooks/useLocalStorage';

const AuthContext = createContext({});

export const useAuthContext = () => {
	const context = useContext(AuthContext);
	return context;
};

function AuthProvider({ children }) {
	const [trainer, setTrainer] = useLocalStorage(USER_LOCAL_STORAGE_KEY, null);

	const signIn = useCallback((trainerName) => {
		setTrainer({ name: trainerName });
	}, []);

	const signOut = useCallback(() => {
		setTrainer(null);
	}, []);

	const value = useMemo(
		() => ({ trainer, isAuthenticated: Boolean(trainer), signIn, signOut }),
		[trainer, signIn, signOut]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
