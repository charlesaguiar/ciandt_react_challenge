import { toast } from 'react-toastify';
import { displayToast, DEFAULT_TOAST_PROPS } from '../toast';

jest.mock('react-toastify', () => ({
	...jest.requireActual('react-toastify'),
	toast: jest.fn(),
}));

describe('[displayToast]', () => {
	it('should call toast function with default options', () => {
		const content = 'Test';

		displayToast(content);

		expect(toast).toHaveBeenCalledWith(content, DEFAULT_TOAST_PROPS);
	});

	it('should call toast function with custom options', () => {
		const content = 'Test';
		const type = 'success';

		displayToast(content, { type });

		expect(toast).toHaveBeenCalledWith(content, {
			...DEFAULT_TOAST_PROPS,
			type,
		});
	});
});
