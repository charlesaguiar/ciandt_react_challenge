import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';

import { USER_LOCAL_STORAGE_KEY } from 'constants';
import AuthProvider from 'contexts/AuthContext';

import Navbar from '../Navbar';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockNavigate,
}));

const renderComponent = () => {
	const queryClient = new QueryClient();
	render(
		<AuthProvider>
			<QueryClientProvider client={queryClient}>
				<Router>
					<Navbar />
				</Router>
			</QueryClientProvider>
		</AuthProvider>
	);
};

describe('<Navbar />', () => {
	it('should render correctly', () => {
		renderComponent();

		expect(screen.getByText('My Pokemons')).toBeInTheDocument();
		expect(screen.getByText('Signout')).toBeInTheDocument();
		expect(screen.getByTestId('logo')).toBeInTheDocument();
	});

	it('should navigate to my pokemons when user clicks on my-pokemons button', () => {
		renderComponent();

		const button = screen.getByText('My Pokemons');
		userEvent.click(button);
		expect(mockNavigate).toHaveBeenCalledWith('/my-pokemons');
	});

	it('should sign user out when signout button gets clicked', () => {
		localStorage.setItem(
			USER_LOCAL_STORAGE_KEY,
			JSON.stringify({ name: 'Ash Ketchum' })
		);
		renderComponent();

		expect(JSON.parse(localStorage.getItem(USER_LOCAL_STORAGE_KEY))).toEqual({
			name: 'Ash Ketchum',
		});

		const button = screen.getByText('Signout');
		userEvent.click(button);

		expect(JSON.parse(localStorage.getItem(USER_LOCAL_STORAGE_KEY))).toBeNull();
	});
});
