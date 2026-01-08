import { App, BasesPropertyId, Keymap, TFile } from "obsidian";
import { useMemo, useRef, memo } from "react";

import {
	DraggableContainer,
	VirtualGrid,
	GridItem
} from '@/components/InfiniteDragScroll';
import { ReactViewProps } from "@/types";
import { getImageResourcePath } from "@/lib/links";

export const INFINITE_GALLERY_TYPE_ID = 'infinite-gallery';

type Image = {
	id: string;
	src: string;
	alt: string;
	file: TFile;
}

const useImages = (app: App, data: ReactViewProps['data'], imageProperty: BasesPropertyId): Image[] => {
	return useMemo(() => {
		return data.groupedData.flatMap((group) => {
			return group.entries.map((entry) => {
				const imageUrl = entry.getValue(imageProperty).toString();
				if (!imageUrl || imageUrl === 'null') return null;

				const imageSrc =
					imageUrl.startsWith('http') ? imageUrl :
					getImageResourcePath(app, imageUrl, entry.file.path);

				if (!imageSrc) return null;

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

const DRAG_THRESHOLD = 5;

const GalleryImage = memo(({ image, app, containerEl }: GalleryImageProps) => {
	const dragStartPos = useRef<{ x: number; y: number } | null>(null);
	const linkRef = useRef<HTMLAnchorElement>(null);

	const onPointerDown = (event: React.PointerEvent) => {
		dragStartPos.current = { x: event.clientX, y: event.clientY };
	};

	const onImageClick = (event: React.MouseEvent) => {
		const evt = event.nativeEvent;
		if (evt.button !== 0 && evt.button !== 1) return;

		if (dragStartPos.current) {
			const dx = Math.abs(event.clientX - dragStartPos.current.x);
			const dy = Math.abs(event.clientY - dragStartPos.current.y);
			if (dx > DRAG_THRESHOLD || dy > DRAG_THRESHOLD) {
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
			className="relative w-full h-full"
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
					loading="lazy"
					className="pointer-events-none absolute h-full w-full rounded-sm object-cover"
				/>
			</a>
	  </GridItem>
	)
}, (prevProps, nextProps) => {
	return (
		prevProps.image.id === nextProps.image.id &&
		prevProps.image.src === nextProps.image.src
	);
});

GalleryImage.displayName = "GalleryImage";

const InfiniteGallery = ({ app, config, containerEl, data }: ReactViewProps) => {
    const imageProperty = (String(config.get('imageProperty')) || 'note.cover') as BasesPropertyId;
	const images = useImages(app, data, imageProperty);

	// Cell dimensions matching original Tailwind classes
	// w-36 = 144px, h-54 = 216px (mobile)
	// md:w-64 = 256px, md:h-96 = 384px (desktop)
	// gap-x-14 = 56px (mobile), md:gap-x-28 = 112px (desktop)
	const cellWidth = 256;
	const cellHeight = 384;
	const gapX = 112;
	const gapY = 0; // Masonry doesn't use vertical gap, uses offset instead
	const columns = 6;

	return (
		<div className="lovely-bases h-full w-full">
			<DraggableContainer variant="masonry">
				<VirtualGrid
					items={images}
					columns={columns}
					cellWidth={cellWidth}
					cellHeight={cellHeight}
					gapX={gapX}
					gapY={gapY}
					renderItem={(image) => (
						<GalleryImage
							image={image}
							app={app}
							containerEl={containerEl}
						/>
					)}
				/>
			</DraggableContainer>
		</div>
	);
};

export default InfiniteGallery;
