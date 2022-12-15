import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Layout() {
	return (
		<div>
			<Navbar />
			<main className="container p-4 lg:p-8 mx-auto">
				<Outlet />
			</main>
		</div>
	);
}
