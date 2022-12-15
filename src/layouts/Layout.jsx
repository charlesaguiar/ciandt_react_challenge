import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Layout() {
	return (
		<div>
			<Navbar />
			<main className="container p-8">
				<Outlet />
			</main>
		</div>
	);
}
