import { type App, type BasesEntry, Keymap, type TFile } from "obsidian";
import { memo, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import HoverOverlay from "./HoverOverlay";
import PropertyList from "./PropertyList";
import type { ItemProperty } from "./types";

type CardItem = {
	id: string;
	image?: string;
	title: string;
	entry: BasesEntry;
	file: TFile;
	properties: ItemProperty[];
	hoverProperty: ItemProperty | null;
};

type Props = {
	layout: "horizontal" | "vertical";
	item: CardItem;
	cardSize: number;
	imageFit: "cover" | "contain";
	imageAspectRatio: number;
	imageWidthPercent: number;
	showPropertyTitles: boolean;
	hoverStyle: "overlay" | "tooltip" | "none";
	app: App;
	containerEl: HTMLElement;
};

const Card = memo(
	({
		layout,
		item,
		cardSize,
		imageFit,
		imageWidthPercent,
		showPropertyTitles,
		hoverStyle,
		app,
		containerEl,
	}: Props) => {
		const [isHovered, setIsHovered] = useState(false);
		const dragStartPos = useRef<{ x: number; y: number } | null>(null);
		const linkRef = useRef<HTMLAnchorElement>(null);

		const onPointerDown = (event: React.PointerEvent) => {
			dragStartPos.current = { x: event.clientX, y: event.clientY };
		};

		const onClick = (event: React.MouseEvent) => {
			const evt = event.nativeEvent;
			if (evt.button !== 0 && evt.button !== 1) return;

			evt.preventDefault();
			const path = item.file.path;
			const modEvent = Keymap.isModEvent(evt);
			void app.workspace.openLinkText(path, "", modEvent);
		};

		const onMouseOver = (event: React.MouseEvent) => {
			app.workspace.trigger("hover-link", {
				event: event.nativeEvent,
				source: "bases",
				hoverParent: containerEl,
				targetEl: linkRef.current,
				linktext: item.file.path,
			});
		};

		const onMouseEnter = () => setIsHovered(true);
		const onMouseLeave = () => setIsHovered(false);

		return (
			<div
				className={cn(
					"relative bg-card rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg cursor-pointer border border-border",
					layout === "horizontal" ? "flex flex-row" : "flex flex-col",
				)}
				onPointerDown={onPointerDown}
				onClick={onClick}
				onMouseOver={onMouseOver}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
			>
				{/** biome-ignore lint/a11y/useAnchorContent: this is a workaround */}
        {/** biome-ignore lint/a11y/useValidAnchor: as seen in Obsidian examples */}
        <a
					ref={linkRef}
					className="pointer-events-none absolute inset-0 z-0"
					draggable={false}
				/>

				<div
					className="relative shrink-0 bg-muted"
					style={{
						...(layout === "horizontal"
							? { width: `${imageWidthPercent}%`, height: "100%" }
							: { width: "100%", height: `${imageWidthPercent}%` }),
					}}
				>
					{item.image ? (
						<img
							src={item.image}
							alt={item.title}
							draggable={false}
							loading="lazy"
							className={cn(
								"pointer-events-none h-full w-full",
								imageFit === "cover" ? "object-cover" : "object-contain",
							)}
						/>
					) : (
						<div className="flex items-center justify-center h-full w-full">
							<span className="text-muted-foreground text-sm">No Image</span>
						</div>
					)}
				</div>

				<div
					className="flex flex-col flex-1 min-h-0 overflow-hidden"
					style={{
						...(layout === "horizontal"
							? { width: `${100 - imageWidthPercent}%` }
							: { height: `${100 - imageWidthPercent}%` }),
					}}
				>
					<h3
						className={cn(
							"font-semibold mt-2 mb-0 line-clamp-2 p-(--input-padding) shrink-0",
							cardSize < 300
								? "text-base"
								: cardSize < 400
									? "text-lg"
									: "text-xl",
						)}
					>
						{item.title}
					</h3>

					<div className="flex-1 min-h-0">
						<PropertyList
							app={app}
							properties={item.properties}
							showTitles={showPropertyTitles}
							cardSize={cardSize}
						/>
					</div>
				</div>

				{isHovered && item.hoverProperty && hoverStyle !== "none" && (
					<HoverOverlay
						renderContext={app.renderContext}
						property={item.hoverProperty}
						style={hoverStyle}
						cardSize={cardSize}
					/>
				)}
			</div>
		);
	},
	(prevProps, nextProps) => {
		return (
			prevProps.item.id === nextProps.item.id &&
			prevProps.cardSize === nextProps.cardSize &&
			prevProps.showPropertyTitles === nextProps.showPropertyTitles &&
			prevProps.imageWidthPercent === nextProps.imageWidthPercent &&
			prevProps.imageFit === nextProps.imageFit &&
			prevProps.hoverStyle === nextProps.hoverStyle &&
			prevProps.item.hoverProperty === nextProps.item.hoverProperty &&
			prevProps.item.properties.every((prop, index) => {
				return (
					prop.value.toString() ===
						nextProps.item.properties[index].value.toString() &&
					prop.displayName === nextProps.item.properties[index].displayName
				);
			})
		);
	},
);

Card.displayName = "Card";

export default Card;
