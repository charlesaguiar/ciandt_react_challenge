import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';

import AuthProvider from '../../contexts/AuthContext';
import ProgressBar from '../ProgressBar';

const renderComponent = (props) => {
	const queryClient = new QueryClient();
	render(
		<AuthProvider>
			<QueryClientProvider client={queryClient}>
				<Router>
					<ProgressBar {...props} />
				</Router>
			</QueryClientProvider>
		</AuthProvider>
	);
};

describe('<ProgressBar />', () => {
	it('should render correctly for values <= 100', () => {
		const title = 'Stat';
		const value = 80;

		renderComponent({ title, value, color: 'red' });

		expect(screen.getByText(title.toUpperCase())).toBeInTheDocument();

		const progressBar = screen.getByTestId('progress-bar');

		expect(progressBar).toBeInTheDocument();
		expect(progressBar).toHaveStyle(`width: ${value}%`);
	});

	it('should render correctly for values > 100', () => {
		const title = 'Stat';
		const value = 180;
		renderComponent({ title, value, color: 'red' });
		expect(screen.getByTestId('progress-bar')).toHaveStyle('width: 100%');
	});
});
