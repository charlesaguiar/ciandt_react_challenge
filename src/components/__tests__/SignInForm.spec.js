import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';

import AuthProvider from '../../contexts/AuthContext';
import SignInForm from '../SignInForm';

import { USER_LOCAL_STORAGE_KEY } from '../../constants';

const renderComponent = () => {
	const queryClient = new QueryClient();
	render(
		<AuthProvider>
			<QueryClientProvider client={queryClient}>
				<Router>
					<SignInForm />
				</Router>
			</QueryClientProvider>
		</AuthProvider>
	);
};

describe('<SignInForm />', () => {
	it('should render correctly', () => {
		renderComponent();

		expect(screen.getByPlaceholderText('Trainer name')).toBeInTheDocument();
		expect(screen.getByText('Start collecting pokemóns!')).toBeInTheDocument();
	});

	it('should validate empty trainer name', () => {
		renderComponent();

		const submitButton = screen.getByText('Start collecting pokemóns!');

		userEvent.click(submitButton);

		expect(
			screen.getByText('Trainer name must be provided.')
		).toBeInTheDocument();
	});

	it('should set trainer in local storage if valid name is provided', () => {
		renderComponent();

		const trainerName = 'Ash Ketchum';
		const input = screen.getByPlaceholderText('Trainer name');
		const submitButton = screen.getByText('Start collecting pokemóns!');

		userEvent.type(input, trainerName);

		userEvent.click(submitButton);

		expect(
			JSON.parse(localStorage.getItem(USER_LOCAL_STORAGE_KEY))
		).toStrictEqual({
			name: trainerName,
		});
	});
});
