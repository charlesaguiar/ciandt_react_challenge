import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import * as ReactQuery from 'react-query';

import AuthProvider from '../../../contexts/AuthContext';
import PokemonsList from '../../Pokemon/PokemonsList';

import { USER_LOCAL_STORAGE_KEY } from '../../../constants';
import { TEST_PIKACHU } from '../../../mocks';

const useQuerySpy = jest.spyOn(ReactQuery, 'useQuery');

const renderComponent = (pokemons) => {
	const queryClient = new ReactQuery.QueryClient();
	render(
		<AuthProvider>
			<ReactQuery.QueryClientProvider client={queryClient}>
				<Router>
					<PokemonsList pokemons={pokemons} />
				</Router>
			</ReactQuery.QueryClientProvider>
		</AuthProvider>
	);
};

describe('<PokemonsList />', () => {
	const user = { name: 'Ash Ketchum', pokemonsNames: ['pikachu'] };

	beforeEach(() => {
		localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));
	});

	it('should render search bar and pokemons cards for each pokemon fetched', () => {
		useQuerySpy.mockReturnValue({
			isLoading: false,
			data: TEST_PIKACHU,
		});

		renderComponent([{ url: TEST_PIKACHU.url }]);

		expect(screen.getByText(TEST_PIKACHU.name)).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText('Search for pokemon name')
		).toBeInTheDocument();
	});

	it('should behave properly for search WITH RESULTS', () => {
		useQuerySpy.mockReturnValue({
			isLoading: false,
			data: TEST_PIKACHU,
		});

		renderComponent([{ name: TEST_PIKACHU.name, url: TEST_PIKACHU.url }]);

		const searchInput = screen.getByPlaceholderText('Search for pokemon name');
		userEvent.type(searchInput, 'Pi');

		expect(screen.getByText(TEST_PIKACHU.name)).toBeInTheDocument();
	});

	it('should behave properly for search WITH NO RESULTS', () => {
		useQuerySpy.mockReturnValue({
			isLoading: false,
			data: TEST_PIKACHU,
		});

		renderComponent([{ name: TEST_PIKACHU.name, url: TEST_PIKACHU.url }]);

		const searchInput = screen.getByPlaceholderText('Search for pokemon name');
		userEvent.type(searchInput, 'Blast');

		expect(screen.getByText('No pokemons found')).toBeInTheDocument();
	});
});
