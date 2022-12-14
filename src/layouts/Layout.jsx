import React from 'react';
import { Link, Outlet } from 'react-router-dom';

import Logo from '../assets/react.svg';
import Avatar from '../components/Avatar';

export default function Layout() {
	return (
		<div>
			<header>
				<nav className="flex items-center justify-between shadow-lg h-nav px-4 md:px-6 lg:px-8">
					<Link to="/">
						<div className="flex gap-4 items-center">
							<img src={Logo} alt="app-logo" />
							<strong className="hidden sm:block">MyPokedex</strong>
						</div>
					</Link>
					<div>
						<Avatar />
					</div>
				</nav>
			</header>
			<main className="container p-8">
				<Outlet />
			</main>
		</div>
	);
}
