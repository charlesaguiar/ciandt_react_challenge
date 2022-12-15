import { createContext, useCallback, useContext, useMemo } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';

const AuthContext = createContext({});

export const useAuthContext = () => {
	const context = useContext(AuthContext);
	return context;
};

function AuthProvider({ children }) {
	const [trainer, setTrainer] = useLocalStorage('poke:trainer', null);

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
