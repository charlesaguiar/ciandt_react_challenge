import { useCallback, useRef, useState } from 'react';
import useDragCarousel from './useDragCarousel';
import useEventListener from './useEventListener';

const useCarousel = () => {
	const [hasReachedStart, setHasReachedStart] = useState(true);
	const [hasReachedEnd, setHasReachedEnd] = useState(false);

	const carouselRef = useRef();

	const handleRightClick = useCallback(() => {
		if (carouselRef?.current) {
			carouselRef.current.scrollLeft += carouselRef.current.offsetWidth;
		}
	}, []);

	const handleLeftClick = useCallback(() => {
		if (carouselRef?.current) {
			carouselRef.current.scrollLeft -= carouselRef.current.offsetWidth;
		}
	}, []);

	const onCarouselScroll = useCallback((event) => {
		const carousel = event.target;

		if (carousel.scrollLeft === 0) {
			setHasReachedStart(true);
			return;
		}

		if (
			Math.trunc(carousel.offsetWidth + carousel.scrollLeft + 1) >=
			Math.trunc(carousel.scrollWidth)
		) {
			setHasReachedEnd(true);
			return;
		}

		setHasReachedStart(false);
		setHasReachedEnd(false);
	}, []);

	useEventListener('scroll', onCarouselScroll, carouselRef);
	useDragCarousel(carouselRef);

	return {
		carouselRef,
		hasReachedStart,
		hasReachedEnd,
		handleLeftClick,
		handleRightClick,
	};
};

export default useCarousel;
