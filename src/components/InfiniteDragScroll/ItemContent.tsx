import { type BasesEntry, type BasesPropertyId, Keymap } from "obsidian";
import { memo, useRef } from "react";

import { useEntryImage } from "@/hooks/use-image";
import { useEntryTitle } from "@/hooks/use-title";
import { cn } from "@/lib/utils";

import { useObsidian } from "../Obsidian/Context";
import { GridItem } from "./GridItem";


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



export type ItemConfig = {
  imageProperty: BasesPropertyId | undefined;
	imageFit: "cover" | "contain";
	cardSize: number;
	aspectRatio: number;
	shape: "square" | "circle" | "rounded" | "squircle";
}

type Props = ItemConfig & {
	item: BasesEntry;
  tabIndex?: number;
};

const DRAG_THRESHOLD = 5;

const ItemContent = memo(
	({ imageFit, item, imageProperty, cardSize, shape, tabIndex }: Props) => {
    const { app, containerEl } = useObsidian();
    const dragStartPos = useRef<{ x: number; y: number } | null>(null);
		const linkRef = useRef<HTMLAnchorElement>(null);

		const titleSize = getTitleSizeClass(cardSize);
		const shapeClass = getShapeClass(shape);

    const title = useEntryTitle(item);
    const image = useEntryImage(item, imageProperty);

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
        tabIndex={tabIndex}
			>
				{/** biome-ignore lint/a11y/useValidAnchor: as seen in Obsidian examples */}
				<a
					ref={linkRef}
					className="pointer-events-none absolute h-full w-full select-none"
					draggable={false}
				>
					{image && (
						<img
							src={image}
							alt={title}
							draggable={false}
							loading="lazy"
							className={cn(
								"pointer-events-none absolute h-full w-full",
								shapeClass,
								imageFit === "cover" ? "object-cover" : "object-contain",
							)}
						/>
					)}
					{!image && (
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
								{title}
							</h3>
						</div>
					)}
				</a>
			</GridItem>
		);
	},
	(prevProps, nextProps) => {
		return (
			prevProps.item.file.path === nextProps.item.file.path &&
			prevProps.item.file.name === nextProps.item.file.name &&
			prevProps.imageProperty === nextProps.imageProperty &&
			prevProps.imageFit === nextProps.imageFit &&
			prevProps.cardSize === nextProps.cardSize &&
			prevProps.shape === nextProps.shape &&
			prevProps.tabIndex === nextProps.tabIndex
		);
	},
);

ItemContent.displayName = "ItemContent";

export default ItemContent;
