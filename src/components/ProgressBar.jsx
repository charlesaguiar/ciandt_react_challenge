export default function ProgressBar({ title, value, color }) {
	return (
		<>
			{title ? <span className="mb-1">{title.toUpperCase()}</span> : null}
			<div className="relative w-100 h-[8px] rounded-full border border-gray-300 mb-3">
				<div
					className="h-full"
					style={{
						width: `${Math.ceil(value > 100 ? 100 : value)}%`,
						backgroundColor: color,
					}}
				/>
			</div>
		</>
	);
}
