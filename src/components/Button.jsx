import Loading from 'components/Loading';

const VARIANT_CLASSES = {
	primary: 'bg-blue-500 text-white hover:bg-blue-800 disabled:bg-gray-200',
	secondary:
		'bg-white text-blue-500 hover:bg-blue-50 border-2 border-blue-700 disabled:border-gray-200 disabled:text-gray-300',
};

export default function Button({
	children,
	variant = 'primary',
	className = '',
	isLoading = false,
	...rest
}) {
	return (
		<button
			className={`flex items-center justify-center px-3 py-[6px] font-bold text-lg rounded-lg cursor-pointer ${VARIANT_CLASSES[variant]} ${className}`}
			type="button"
			{...rest}
		>
			{isLoading ? <Loading size={25} /> : children}
		</button>
	);
}
