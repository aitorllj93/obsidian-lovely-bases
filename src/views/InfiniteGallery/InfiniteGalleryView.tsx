import { type App, type BasesPropertyId, Keymap, type TFile } from "obsidian";
import { memo, useCallback, useMemo, useRef } from "react";

import {
	DraggableContainer,
	GridItem,
	VirtualGrid,
} from "@/components/InfiniteDragScroll";
import { getImageResourcePath } from "@/lib/links";
import { cn } from "@/lib/utils";
import type { ReactBaseViewProps } from "@/types";

export const INFINITE_GALLERY_TYPE_ID = "infinite-gallery";

type Item = {
	id: string;
	image?: string;
	title: string;
	file: TFile;
};

type Config = {
	layout: "default" | "masonry" | "polaroid";
	cardSize: number; // from 50 to 800
	imageProperty: BasesPropertyId;
	imageFit: "cover" | "contain";
	aspectRatio: number; // from 0.25 to 2.5
	shape: "square" | "circle" | "rounded" | "squircle";
};

const useItems = (
	app: App,
	data: ReactBaseViewProps["data"],
	imageProperty: BasesPropertyId,
): Item[] => {
	return useMemo(() => {
		return data.groupedData.flatMap((group) => {
			return group.entries
				.map((entry) => {
					const imageUrl = entry.getValue(imageProperty).toString();
					if (!imageUrl || imageUrl === "null")
						return {
							id: entry.file.path,
							title: entry.file.name,
							file: entry.file,
						};

					const imageSrc = imageUrl.startsWith("http")
						? imageUrl
						: getImageResourcePath(app, imageUrl, entry.file.path);

					if (!imageSrc) return null;

					const title = entry.file.basename.replace(/\.[^.]+$/, "");

					return {
						id: entry.file.path,
						image: imageSrc,
						title,
						file: entry.file,
					};
				})
				.filter(Boolean);
		});
	}, [data, imageProperty, app]);
};

type GalleryItemProps = {
	item: Item;
	imageFit: "cover" | "contain";
	app: App;
	containerEl: HTMLElement;
	cardSize: number;
	shape: "square" | "circle" | "rounded" | "squircle";
};

const DRAG_THRESHOLD = 5;

const getTitleSizeClass = (cardSize: number) => {
	if (cardSize < 100) return "text-sm";
	if (cardSize < 200) return "text-base";
	if (cardSize < 300) return "text-lg";
	if (cardSize < 400) return "text-xl";
	if (cardSize < 500) return "text-2xl";
	if (cardSize < 600) return "text-3xl";
	if (cardSize < 700) return "text-4xl";
	return "text-5xl";
};

const getShapeClass = (shape: "square" | "circle" | "rounded" | "squircle") => {
	if (shape === "square") return "rounded-sm";
	if (shape === "circle") return "rounded-full";
	if (shape === "rounded") return "rounded-lg";
	if (shape === "squircle") return "rounded-[50%] corner-squircle ";
	return "rounded-xl";
};

const GalleryItem = memo(
	({ imageFit, item, app, containerEl, cardSize, shape }: GalleryItemProps) => {
		const dragStartPos = useRef<{ x: number; y: number } | null>(null);
		const linkRef = useRef<HTMLAnchorElement>(null);

		const titleSize = getTitleSizeClass(cardSize);
		const shapeClass = getShapeClass(shape);

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
			const path = item.file.path;
			const modEvent = Keymap.isModEvent(evt);
			void app.workspace.openLinkText(path, "", modEvent);
		};

		const onImageMouseOver = (event: React.MouseEvent) => {
			app.workspace.trigger("hover-link", {
				event: event.nativeEvent,
				source: "bases",
				hoverParent: containerEl,
				targetEl: linkRef.current,
				linktext: item.file.path,
			});
		};

		return (
			<GridItem
				className="relative w-full h-full"
				onPointerDown={onPointerDown}
				onClick={onImageClick}
				onMouseOver={onImageMouseOver}
			>
				{/** biome-ignore lint/a11y/useValidAnchor: as seen in Obsidian examples */}
				<a
					ref={linkRef}
					className="pointer-events-none absolute h-full w-full select-none"
					draggable={false}
				>
					{item.image && (
						<img
							src={item.image}
							alt={item.title}
							draggable={false}
							loading="lazy"
							className={cn(
								"pointer-events-none absolute h-full w-full",
								shapeClass,
								imageFit === "cover" ? "object-cover" : "object-contain",
							)}
						/>
					)}
					{!item.image && (
						<div
							className={cn(
								"pointer-events-none absolute h-full w-full rounded-sm bg-card flex justify-center",
								shapeClass,
							)}
						>
							<h3
								className={cn(
									"font-medium text-card-foreground px-4",
									titleSize,
								)}
							>
								{item.title}
							</h3>
						</div>
					)}
				</a>
			</GridItem>
		);
	},
	(prevProps, nextProps) => {
		return (
			prevProps.item.id === nextProps.item.id &&
			prevProps.item.title === nextProps.item.title
		);
	},
);

GalleryItem.displayName = "GalleryItem";

const InfiniteGalleryView = ({
	app,
	config,
	containerEl,
	data,
}: ReactBaseViewProps) => {
	const layout = (config.get("layout") ?? "masonry") as Config["layout"];
	const imageProperty = (String(config.get("imageProperty")) ??
		"note.cover") as Config["imageProperty"];
	const cardSize = (config.get("cardSize") ?? 200) as Config["cardSize"];
	const imageFit = (config.get("imageFit") ?? "cover") as Config["imageFit"];
	const aspectRatio = (config.get("aspectRatio") ??
		1.5) as Config["aspectRatio"];
	const shape = (config.get("shape") ?? "square") as Config["shape"];

	const items = useItems(app, data, imageProperty);

	// Cell dimensions matching original Tailwind classes
	// w-36 = 144px, h-54 = 216px (mobile)
	// md:w-64 = 256px, md:h-96 = 384px (desktop)
	// gap-x-14 = 56px (mobile), md:gap-x-28 = 112px (desktop)
	const cellWidth = cardSize;
	const cellHeight = cardSize * aspectRatio;
	const gapX = cardSize / 2;
	const gapY = 0; // Masonry doesn't use vertical gap, uses offset instead
	const columns = Math.floor(containerEl.clientWidth / cellWidth);

	// Memoized render function to prevent unnecessary re-renders during scroll
	const renderItem = useCallback(
		(item: Item) => (
			<GalleryItem
				item={item}
				app={app}
				containerEl={containerEl}
				cardSize={cardSize}
				imageFit={imageFit}
				shape={shape}
			/>
		),
		[app, containerEl, cardSize, imageFit, shape],
	);

	return (
		<div className="lovely-bases h-full w-full">
			<DraggableContainer variant={layout}>
				<VirtualGrid
					items={items}
					columns={columns}
					cellWidth={cellWidth}
					cellHeight={cellHeight}
					gapX={gapX}
					gapY={gapY}
					renderItem={renderItem}
				/>
			</DraggableContainer>
		</div>
	);
};

export default InfiniteGalleryView;
