import { toast } from 'react-toastify';

export const DEFAULT_TOAST_PROPS = {
	position: 'top-right',
	autoClose: 5000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
	theme: 'light',
};

export const displayToast = (content, options) => {
	return toast(content, {
		...DEFAULT_TOAST_PROPS,
		...options,
	});
};
