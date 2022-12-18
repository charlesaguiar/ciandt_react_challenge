import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import * as ReactQuery from 'react-query';

import AuthProvider from 'contexts/AuthContext';
import PokemonCard from 'components/Pokemon/PokemonCard';

import { USER_LOCAL_STORAGE_KEY } from 'constants';
import { TEST_BLASTOISE, TEST_PIKACHU } from 'mocks';

const useQuerySpy = jest.spyOn(ReactQuery, 'useQuery');

const renderComponent = (pokemon) => {
	const queryClient = new ReactQuery.QueryClient();
	render(
		<AuthProvider>
			<ReactQuery.QueryClientProvider client={queryClient}>
				<Router>
					<PokemonCard pokemon={pokemon} />
				</Router>
			</ReactQuery.QueryClientProvider>
		</AuthProvider>
	);
};

describe('<PokemonCard />', () => {
	const user = { name: 'Ash Ketchum', pokemonsNames: ['pikachu'] };

	beforeEach(() => {
		localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));
	});

	it('should render correctly when loading', () => {
		useQuerySpy.mockReturnValue({
			isLoading: true,
		});
		renderComponent({ pokemon: { url: 'test' } });

		expect(screen.getByTestId('loading')).toBeInTheDocument();
	});

	it('should render pokemon data when its ready', () => {
		useQuerySpy.mockReturnValue({
			isLoading: false,
			data: TEST_BLASTOISE,
		});
		renderComponent({ pokemon: { url: 'test' } });

		expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
		expect(screen.getByText(TEST_BLASTOISE.name)).toBeInTheDocument();
	});

	it('should render marker if pokemon is already caught by user', () => {
		useQuerySpy.mockReturnValue({
			isLoading: false,
			data: TEST_PIKACHU,
		});
		renderComponent({ pokemon: { url: 'test' } });

		expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
		expect(screen.getByTestId('my-pokemon-marker')).toBeInTheDocument();
		expect(screen.getByText(TEST_PIKACHU.name)).toBeInTheDocument();
	});
});
