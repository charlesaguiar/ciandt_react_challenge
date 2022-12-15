import { Link } from 'react-router-dom';
import { MdChevronRight } from 'react-icons/md';

export default function Breadcrumbs({ items }) {
	return (
		<div className="flex gap-2 items-center mb-4">
			{items.map((item) =>
				item.active ? (
					<span>{item.label}</span>
				) : (
					<>
						<Link
							to={item.url}
							className="underline text-gray-500 hover:text-gray-900"
						>
							<span>{item.label}</span>
						</Link>
						<MdChevronRight size={20} />
					</>
				)
			)}
		</div>
	);
}
