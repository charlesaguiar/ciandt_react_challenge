import { ToastContainer } from 'react-toastify';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import { useAuthContext } from './contexts/AuthContext';

import Layout from './layouts/Layout';
import Home from './pages/Home';
import PokemonDetails from './pages/PokemonDetails';
import SignIn from './pages/SignIn';
import MyPokemons from './pages/MyPokemons';

function App() {
	const { isAuthenticated } = useAuthContext();

	return (
		<>
			<Router>
				<Routes>
					{isAuthenticated ? (
						<Route path="/" element={<Layout />}>
							<Route path="" element={<Home />} />
							<Route path="/my-pokemons" element={<MyPokemons />} />
							<Route path="/pokemon/:pokemon" element={<PokemonDetails />} />
							<Route path="*" element={<Navigate to="/" />} />
						</Route>
					) : (
						<>
							<Route path="/signin" element={<SignIn />} />
							<Route path="*" element={<Navigate to="/signin" />} />
						</>
					)}
				</Routes>
			</Router>
			<ToastContainer />
		</>
	);
}

export default App;
