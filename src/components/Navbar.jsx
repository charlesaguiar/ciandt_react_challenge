import Lottie from 'lottie-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MdCatchingPokemon, MdOutlineLogout } from 'react-icons/md';

import { useAuthContext } from '../contexts/AuthContext';

import AnimationPokeball from '../assets/animations/pokeball.json';
import Avatar from './Avatar';
import IconButton from './IconButton';

export default function Navbar() {
	const navigate = useNavigate();
	const location = useLocation();
	const { signOut } = useAuthContext();

	return (
		<header className="inline-block sticky top-0 z-10 w-full bg-gray-50">
			<nav className="flex items-center justify-between shadow-lg h-nav px-4 md:px-6 lg:px-8">
				<Link to="/">
					<div data-testid="logo" className="flex gap-2 items-center">
						<Lottie
							animationData={AnimationPokeball}
							autoPlay
							loop
							style={{ width: 50, height: 50 }}
						/>
						<img
							className="w-[200px] h-full hidden md:block"
							src="img/pokedex_text.png"
							alt="logo-pokedex-text"
						/>
					</div>
				</Link>
				<div className="flex gap-4 items-center">
					<IconButton
						label="My Pokemons"
						onClick={() => navigate('/my-pokemons')}
						active={location.pathname === '/my-pokemons'}
						Icon={<MdCatchingPokemon size="24" />}
					/>
					<IconButton
						label="Signout"
						onClick={signOut}
						Icon={<MdOutlineLogout size="24" />}
					/>
					<Avatar />
				</div>
			</nav>
		</header>
	);
}
