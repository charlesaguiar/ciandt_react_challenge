import { useCallback, useMemo, useState } from 'react';
import _ from 'lodash';

import Subtitle from 'components/Typography/Subtitle';
import Carousel from 'components/Carousel';

import { getPokemonGalleryImages } from 'utils/pokemon';

export default function PokemonGallery({ pokemon }) {
	const [selectedImageIndex, setSelectedImageIndex] = useState(0);

	const gallery = useMemo(() => {
		if (!pokemon) return [];
		return _.uniqBy(
			[
				{ url: pokemon.sprites.other.dream_world.front_default },
				...getPokemonGalleryImages(pokemon),
			],
			'url'
		);
	}, [pokemon]);

	const getSelectedImageCssClasses = useCallback(
		(index) => {
			return index === selectedImageIndex
				? 'border-2 border-blue-300 shadow-lg'
				: '';
		},
		[selectedImageIndex]
	);

	return (
		<>
			<Subtitle>Gallery</Subtitle>
			<img
				className="w-full mx-auto mb-10 max-w-[250px] h-[320px]"
				src={gallery[selectedImageIndex]?.url}
				alt={pokemon.name}
			/>
			<Carousel>
				{gallery.map((image, index) => (
					<button
						type="button"
						onClick={() => setSelectedImageIndex(index)}
						className={`flex justify-center p-2 border border-gray-300 rounded-xl w-full min-w-[150px] max-h-[150px] ${getSelectedImageCssClasses(
							index
						)}`}
						key={image.url}
					>
						<img
							className="w-full h-full"
							src={image.url}
							alt="pokemon_image"
						/>
					</button>
				))}
			</Carousel>
		</>
	);
}
