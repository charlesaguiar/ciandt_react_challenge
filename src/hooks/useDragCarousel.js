import { useCallback, useRef } from 'react';
import useEventListener from './useEventListener';

const useDragCarousel = (carouselRef) => {
	const isPressedRef = useRef(false);
	const startX = useRef();
	const scrollLeft = useRef();

	const reset = useCallback(() => {
		if (!carouselRef.current) return;

		isPressedRef.current = false;
		carouselRef.current.style.scrollBehavior = 'smooth';
		carouselRef.current.style.cursor = 'grab';
	}, [carouselRef]);

	const handleMouseDown = useCallback(
		(e) => {
			if (!carouselRef?.current) return;

			isPressedRef.current = true;
			carouselRef.current.style.scrollBehavior = 'unset';
			carouselRef.current.style.cursor = 'grabbing';

			startX.current = e.pageX - (carouselRef.current?.offsetLeft || 0);
			scrollLeft.current = carouselRef.current.scrollLeft;
		},
		[carouselRef]
	);

	const handleMouseMove = useCallback(
		(e) => {
			if (!isPressedRef.current || !carouselRef?.current) return;

			e.preventDefault();

			const sx = startX.current || 0;
			const sl = scrollLeft.current || 0;

			const x = e.pageX - carouselRef.current.offsetLeft;
			const walk = (x - sx) * 2;
			carouselRef.current.scrollLeft = sl - walk;
		},
		[carouselRef]
	);

	useEventListener('mousedown', handleMouseDown, carouselRef);
	useEventListener('mouseleave', reset, carouselRef);
	useEventListener('mouseup', reset, carouselRef);
	useEventListener('mousemove', handleMouseMove, carouselRef);
};

export default useDragCarousel;
