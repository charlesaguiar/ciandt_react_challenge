import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import useCarousel from 'hooks/useCarousel';

function Carousel({ children }) {
	const {
		carouselRef,
		hasReachedStart,
		hasReachedEnd,
		handleLeftClick,
		handleRightClick,
	} = useCarousel();

	return (
		<div className="relative">
			<div
				className="flex gap-4 overflow-x-scroll w-full scrollbar-hide"
				ref={carouselRef}
			>
				{children}
			</div>

			{!hasReachedStart ? (
				<div
					role="button"
					tabIndex={0}
					className="absolute bottom-[45%] left-[1em] max-w-fit bg-white rounded-full p-2 z-10 cursor-pointer shadow-xl transition-all hover:scale-125"
					onClick={handleLeftClick}
				>
					<BsChevronLeft color="black" size={28} />
				</div>
			) : null}

			{!hasReachedEnd ? (
				<div
					role="button"
					className="absolute bottom-[45%] left-[calc(100%-4em)] max-w-fit bg-white rounded-full p-2 z-10 cursor-pointer shadow-xl transition-all hover:scale-125"
					onClick={handleRightClick}
					tabIndex={0}
				>
					<BsChevronRight color="black" size={28} />
				</div>
			) : null}
		</div>
	);
}

export default Carousel;
