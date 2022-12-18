import { useRef } from 'react';
import Lottie from 'lottie-react';

import AnimationPokeball from 'assets/animations/pokeball.json';
import AnimationSquirtle from 'assets/animations/squirtle-loading.json';
import AnimationDiglett from 'assets/animations/diglett.json';

const AnimationsList = [AnimationDiglett, AnimationSquirtle, AnimationPokeball];
const randomAnimationIndex = Math.floor(Math.random() * AnimationsList.length);

export default function SignInHeader() {
	const animationRef = useRef(AnimationsList[randomAnimationIndex]);

	return (
		<div className="flex items-center flex-col sm:flex-row">
			<div className="flex items-center">
				<img
					className="w-[100px] h-full"
					src="img/pokedex.png"
					alt="logo-pokedex"
				/>
				<img
					className="w-[200px] h-full"
					src="img/pokedex_text.png"
					alt="logo-pokedex-text"
				/>
			</div>

			<Lottie
				animationData={animationRef.current}
				autoPlay
				loop
				style={{ width: 100, height: 100 }}
			/>
		</div>
	);
}
