import { type App, Keymap } from "obsidian";
import { memo, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import Content from "./Content";
import HoverOverlay from "./HoverOverlay";
import Image from "./Image";
import type { CardItem } from "./types";


type Props = {
  className?: string;
	layout: "horizontal" | "vertical";
	item: CardItem;
	cardSize: number;
	imageFit: "cover" | "contain";
	imageAspectRatio: number;
	showPropertyTitles: boolean;
  showTitle: boolean;
	hoverStyle: "overlay" | "tooltip" | "none";
	app: App;
	containerEl: HTMLElement;
  reverseContent: boolean;
};

const Card = memo(
	({
		className,
		layout,
		item,
		cardSize,
		imageFit,
		imageAspectRatio,
		showPropertyTitles,
    showTitle,
		hoverStyle,
		app,
		containerEl,
    reverseContent,
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
					"relative h-full bg-card rounded shadow-md overflow-hidden transition-shadow hover:shadow-lg cursor-pointer border border-border",
					layout === "horizontal" ? "flex flex-row" : "flex flex-col",
          className,
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

				{!reverseContent ? (
          <Image cardSize={cardSize} layout={layout} imageAspectRatio={imageAspectRatio} item={item} imageFit={imageFit} />
        ) : (
          <Content layout={layout} cardSize={cardSize} item={item} showPropertyTitles={showPropertyTitles} app={app} showTitle={showTitle} />
        )}

        {reverseContent ? (
          <Image cardSize={cardSize} layout={layout} imageAspectRatio={imageAspectRatio} item={item} imageFit={imageFit} />
        ) : (
          <Content layout={layout} cardSize={cardSize} item={item} showPropertyTitles={showPropertyTitles} app={app} showTitle={showTitle} />
        )}

				{isHovered && item.hoverProperty && hoverStyle !== "none" && (
					<HoverOverlay
						renderContext={app.renderContext}
						property={item.hoverProperty}
						style={hoverStyle}
            showTitle={showPropertyTitles}
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
