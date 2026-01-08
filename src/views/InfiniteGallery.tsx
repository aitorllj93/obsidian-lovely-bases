import { App, BasesPropertyId, Keymap, TFile } from "obsidian";
import { useMemo, useRef } from "react";

import {
	DraggableContainer,
	GridBody,
	GridItem
} from '@/components/InfiniteDragScroll';
import { ReactViewProps } from "@/types";

export const INFINITE_GALLERY_TYPE_ID = 'infinite-gallery';

type Image = {
	id: string;
	src: string;
	alt: string;
	file: TFile;
}

const useImages = (data: ReactViewProps['data'], imageProperty: BasesPropertyId): Image[] => {
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
					file: entry.file,
				};
			}).filter(Boolean);
		});
	}, [data, imageProperty]);
};

type GalleryImageProps = {
	image: Image;
	app: App;
	containerEl: HTMLElement;
}

const DRAG_THRESHOLD = 5; // píxeles de movimiento para considerar que fue drag

const GalleryImage = ({ image, app, containerEl }: GalleryImageProps) => {
	const dragStartPos = useRef<{ x: number; y: number } | null>(null);
	const linkRef = useRef<HTMLAnchorElement>(null);

	const onPointerDown = (event: React.PointerEvent) => {
		dragStartPos.current = { x: event.clientX, y: event.clientY };
	};

	const onImageClick = (event: React.MouseEvent) => {
		const evt = event.nativeEvent;
		if (evt.button !== 0 && evt.button !== 1) return;

		// Comparar posición actual con la inicial para detectar drag
		if (dragStartPos.current) {
			const dx = Math.abs(event.clientX - dragStartPos.current.x);
			const dy = Math.abs(event.clientY - dragStartPos.current.y);
			if (dx > DRAG_THRESHOLD || dy > DRAG_THRESHOLD) {
				// Fue un drag, no abrir el link
				dragStartPos.current = null;
				return;
			}
		}

		evt.preventDefault();
		const path = image.file.path;
		const modEvent = Keymap.isModEvent(evt);
		void app.workspace.openLinkText(path, '', modEvent);
	};

	const onImageMouseOver = (event: React.MouseEvent) => {
		app.workspace.trigger('hover-link', {
		  event: event.nativeEvent,
		  source: 'bases',
		  hoverParent: containerEl,
		  targetEl: linkRef.current,
		  linktext: image.file.path,
		});
	};

	return (
		<GridItem
			key={image.id}
			className="relative h-54 w-36 md:h-96 md:w-64"
			onPointerDown={onPointerDown}
			onClick={onImageClick}
			onMouseOver={onImageMouseOver}>
			<a
				ref={linkRef}
				className="pointer-events-none absolute h-full w-full select-none"
				draggable={false}>
				<img
					src={image.src}
					alt={image.alt}
					draggable={false}
					className="pointer-events-none absolute h-full w-full object-cover"
				/>
			</a>
	  </GridItem>
	)
}

const InfiniteGallery = ({ app, config, containerEl, data }: ReactViewProps) => {
    const imageProperty = (String(config.get('imageProperty')) || 'note.cover') as BasesPropertyId;
	const images = useImages(data, imageProperty);

	return (
		<div className="lovely-bases">
		<DraggableContainer variant="masonry">
		 <GridBody>
		   {images.map((image) => (
				<GalleryImage key={image.id} image={image} app={app} containerEl={containerEl} />
		   ))}
		 </GridBody>
	   </DraggableContainer></div>
	 );
};

export default InfiniteGallery;
