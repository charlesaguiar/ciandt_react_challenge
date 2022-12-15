export default function ChartCard({ children }) {
	return (
		<div className="flex flex-col gap-2 p-3 border border-gray-300 shadow-lg rounded-lg w-1/2">
			{children}
		</div>
	);
}
