import { BasesPropertyId } from "obsidian";
import { useMemo } from "react";

import {
	DraggableContainer,
	GridBody,
	GridItem
} from '@/components/InfiniteDragScroll';
import { ReactViewProps } from "@/types";

export const INFINITE_GALLERY_TYPE_ID = 'infinite-gallery';

const useImages = (data: ReactViewProps['data'], imageProperty: BasesPropertyId) => {
	return useMemo(() => {
		return data.groupedData.flatMap((group) => {
			return group.entries.map((entry) => {
				const imageUrl = entry.getValue(imageProperty)?.toString();
				if (!imageUrl) return null;

				const imageSrc =
					imageUrl.startsWith('http') ? imageUrl :
					entry.file.vault.adapter.getResourcePath(imageUrl);
				return {
					id: entry.file.path,
					src: imageSrc,
					alt: entry.file.name,
				};
			}).filter(Boolean);
		});
	}, [data, imageProperty]);
};

const InfiniteGallery = ({ config, data }: ReactViewProps) => {
    const imageProperty = (String(config.get('imageProperty')) || 'note.cover') as BasesPropertyId;
	const images = useImages(data, imageProperty);

	return (
		<div className="lovely-bases">
		<DraggableContainer variant="masonry">
		 <GridBody>
		   {images.map((image) => (
			 <GridItem
			   key={image.id}
			   className="relative h-54 w-36 md:h-96 md:w-64"
			 >
			   <img
				 src={image.src}
				 alt={image.alt}
				 className="pointer-events-none absolute h-full w-full object-cover"

			   />
			 </GridItem>
		   ))}
		 </GridBody>
	   </DraggableContainer></div>
	 );
};

export default InfiniteGallery;
