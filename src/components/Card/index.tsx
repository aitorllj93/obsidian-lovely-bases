import { cva } from "class-variance-authority";
import type { BasesEntry, BasesViewConfig } from "obsidian";
import { memo, useRef, useState } from "react";

import { useEntryHover } from "@/hooks/use-entry-hover";
import { useEntryOpen } from "@/hooks/use-entry-open";
import { cn } from "@/lib/utils";

import Badge from "./Badge";
import Content from "./Content";
import { DEFAULT_LAYOUT, DEFAULT_SHAPE } from "./config/constants";
import { compareCardConfig } from "./config/get-config";
import HoverOverlay from "./HoverOverlay";
import Image from "./Image";
import type { CardConfig } from "./types";

type Props = CardConfig & {
	className?: string;
	entry: BasesEntry;
	config: BasesViewConfig;
};

const cardVariants = cva(
	"relative bg-(--bases-cards-background) shadow-md overflow-hidden transition-shadow hover:shadow-lg cursor-pointer border border-border group box-border",
	{
		variants: {
      layout: {
        horizontal: "flex flex-row h-full",
        vertical: "flex flex-col h-full",
        overlay: "",
        polaroid: "flex flex-col h-full bg-card border-10 border-b-28 border-card",
      },
			shape: {
				square: "rounded",
				circle: "rounded-full",
				rounded: "rounded-[20%]",
			},
		},
		defaultVariants: {
			shape: DEFAULT_SHAPE,
      layout: DEFAULT_LAYOUT,
		},
	},
);

const Card = memo(
	({ className, entry, config, ...cardConfig }: Props) => {
		const [isHovered, setIsHovered] = useState(false);
		const dragStartPos = useRef<{ x: number; y: number } | null>(null);
		const linkRef = useRef<HTMLAnchorElement>(null);
		const entryId = entry.file.path;
		const handleEntryOpen = useEntryOpen(entryId);
		const handleEntryHover = useEntryHover(entryId, linkRef);

		const onPointerDown = (event: React.PointerEvent) => {
			dragStartPos.current = { x: event.clientX, y: event.clientY };
		};
		const onMouseEnter = () => setIsHovered(true);
		const onMouseLeave = () => setIsHovered(false);

    const classes = cardVariants({
      layout: cardConfig.layout,
      shape: cardConfig.shape,
    });

		const isOverlay = cardConfig.layout === "overlay";
		const showOverlayContent = isOverlay && (
			cardConfig.overlayContentVisibility === "always" || isHovered
		);

		return (
			<div
				data-testid="lovely-card"
				className={cn(
					classes,
					className,
				)}
				style={{
					width: cardConfig.cardSize,
					...(isOverlay && { "height": `${cardConfig.cardSize * cardConfig.imageAspectRatio}px` }),
				} as React.CSSProperties}
				onPointerDown={onPointerDown}
				onClick={handleEntryOpen}
				onMouseOver={handleEntryHover}
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

			{isOverlay ? (
				<>
					<Image entry={entry} cardConfig={cardConfig} isOverlayMode />
					<div className={cn(
						"absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent pointer-events-none transition-opacity duration-300 ease-out",
						showOverlayContent ? "opacity-100" : "opacity-0"
					)} />
					<div className={cn(
						"absolute bottom-0 left-0 right-0 transition-all duration-300 ease-out",
						showOverlayContent
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-4 pointer-events-none"
					)}>
						<Content entry={entry} cardConfig={cardConfig} config={config} isOverlayMode />
					</div>
					{cardConfig.badgeProperty && (
						<div className={cn(
							"transition-all duration-300 ease-out",
							showOverlayContent
								? "opacity-100 translate-y-0"
								: "opacity-0 -translate-y-4 pointer-events-none"
						)}>
							<Badge entry={entry} cardConfig={cardConfig} config={config} />
						</div>
					)}
				</>
			) : (
				<>
					{!cardConfig.reverseContent ? (
						<Image entry={entry} cardConfig={cardConfig} />
					) : (
						<Content entry={entry} cardConfig={cardConfig} config={config} />
					)}

					{cardConfig.reverseContent ? (
						<Image entry={entry} cardConfig={cardConfig} />
					) : (
						<Content entry={entry} cardConfig={cardConfig} config={config} />
					)}
					{cardConfig.badgeProperty && (
						<Badge entry={entry} cardConfig={cardConfig} config={config} />
					)}
				</>
			)}

				{isHovered && <HoverOverlay entry={entry} cardConfig={cardConfig} config={config} />}
			</div>
		);
	},
	(prevProps, nextProps) => {
		return (
			prevProps.entry === nextProps.entry &&
			prevProps.className === nextProps.className &&
			compareCardConfig(prevProps, nextProps)
		);
	},
);

Card.displayName = "Card";

export default Card;
