import Lottie from 'lottie-react';
import Animation from '../assets/animations/pokeball.json';

function Loading({ size = 40, loop = true }) {
	const animationSize = size;

	return (
		<Lottie
			animationData={Animation}
			autoPlay
			loop={loop}
			style={{ width: animationSize, height: animationSize }}
		/>
	);
}

export default Loading;
