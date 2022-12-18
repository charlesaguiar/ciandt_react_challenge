import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';

import AuthProvider from '../../../contexts/AuthContext';
import PokemonSummary from '../../Pokemon/PokemonSummary';

import { USER_LOCAL_STORAGE_KEY } from '../../../constants';
import { TEST_BLASTOISE } from '../../../mocks';

const renderComponent = (pokemon) => {
	const queryClient = new QueryClient();
	render(
		<AuthProvider>
			<QueryClientProvider client={queryClient}>
				<Router>
					<PokemonSummary pokemon={pokemon} />
				</Router>
			</QueryClientProvider>
		</AuthProvider>
	);
};

describe('<PokemonSummary />', () => {
	const user = { name: 'Ash Ketchum' };
	beforeEach(() => {
		localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));
	});

	it('should render correctly', () => {
		renderComponent(TEST_BLASTOISE);

		expect(
			screen.getByText(TEST_BLASTOISE.name.toUpperCase())
		).toBeInTheDocument();
		expect(screen.getByText('Catch')).toBeInTheDocument();
		expect(screen.queryByText('Leave')).not.toBeInTheDocument();
		expect(screen.queryByText('You own this Pokemon!')).not.toBeInTheDocument();
	});

	it('should behave correctly when CATCH pokemon action is taken', () => {
		renderComponent(TEST_BLASTOISE);

		const catchPokemonButton = screen.getByText('Catch');

		userEvent.click(catchPokemonButton);

		expect(screen.getByText('You own this Pokemon!')).toBeInTheDocument();
		expect(screen.getByText('Leave')).toBeInTheDocument();
		expect(screen.queryByText('Catch')).not.toBeInTheDocument();
		expect(JSON.parse(localStorage.getItem(USER_LOCAL_STORAGE_KEY))).toEqual({
			...user,
			pokemonsNames: [TEST_BLASTOISE.name],
		});
	});

	it('should behave correctly when LEAVE pokemon action is taken', () => {
		localStorage.setItem(
			USER_LOCAL_STORAGE_KEY,
			JSON.stringify({
				...user,
				pokemonsNames: [TEST_BLASTOISE.name],
			})
		);
		renderComponent(TEST_BLASTOISE);

		const leavePokemonButton = screen.getByText('Leave');

		userEvent.click(leavePokemonButton);

		expect(screen.queryByText('You own this Pokemon!')).not.toBeInTheDocument();
		expect(JSON.parse(localStorage.getItem(USER_LOCAL_STORAGE_KEY))).toEqual({
			...user,
			pokemonsNames: [],
		});
	});
});
