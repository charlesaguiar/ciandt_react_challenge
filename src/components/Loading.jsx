import Lottie from 'lottie-react';
import Animation from 'assets/animations/ditto.json';

function Loading({ size = 40, loop = true }) {
	const animationSize = size;

	return (
		<div
			data-testid="loading"
			className="flex min-h-full justify-center items-center"
		>
			<Lottie
				animationData={Animation}
				autoPlay
				loop={loop}
				style={{ width: animationSize, height: animationSize }}
			/>
		</div>
	);
}

export default Loading;
