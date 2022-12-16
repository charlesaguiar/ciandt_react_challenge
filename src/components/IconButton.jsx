export default function IconButton({ label, onClick, active = false, Icon }) {
	return (
		<button
			type="button"
			className={`flex items-center justify-center gap-4 ${
				active ? 'border-2 border-blue-500' : 'border border-gray-300'
			} p-2 rounded-full md:rounded-lg hover:border-blue-500 hover:bg-blue-50`}
			onClick={onClick}
		>
			{Icon}
			<span className="hidden md:block">{label}</span>
		</button>
	);
}
