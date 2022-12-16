import { Link } from 'react-router-dom';
import { MdChevronRight } from 'react-icons/md';

export default function Breadcrumbs({ items }) {
	return (
		<div className="flex gap-2 items-center mb-4 text-sm">
			{items.map((item) =>
				item.active ? (
					<span key={item.label}>{item.label}</span>
				) : (
					<div key={item.label} className="flex gap-2 items-center">
						<Link
							to={item.url}
							className="underline text-gray-500 hover:text-gray-900"
						>
							<span>{item.label}</span>
						</Link>
						<MdChevronRight size={20} />
					</div>
				)
			)}
		</div>
	);
}
