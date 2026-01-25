import { cva } from "class-variance-authority";
import type { BasesEntry, BasesViewConfig } from "obsidian";
import { memo, useCallback, useRef, useState } from "react";

import { useEntryHover } from "@/hooks/use-entry-hover";
import { useEntryOpen } from "@/hooks/use-entry-open";
import { useEntryImage } from "@/hooks/use-image";
import { cn } from "@/lib/utils";

import Badge from "./Badge";
import Content from "./Content";
import { DEFAULTS } from "./constants";
import HoverOverlay from "./HoverOverlay";
import { compareCardConfig } from "./helpers/compare-config";
import { useCardColors } from "./hooks/use-card-colors";
import Image from "./Image";
import type { CardConfig } from "./types";

type Props = CardConfig & {
	className?: string;
	entry: BasesEntry;
	config: BasesViewConfig;
	isDraggable?: boolean;
};

const cardVariants = cva(
	"relative shadow-md overflow-hidden transition-all hover:shadow-lg cursor-pointer border group box-border",
	{
		variants: {
      layout: {
        horizontal: "flex flex-row h-full bg-(--bases-cards-background) border-border",
        vertical: "flex flex-col h-full bg-(--bases-cards-background) border-border",
        overlay: "bg-(--bases-cards-background) border-border",
        polaroid: "flex flex-col h-full border-10 border-b-28",
      },
			shape: {
				square: "rounded",
				circle: "rounded-full",
				rounded: "rounded-[20%]",
			},
			tilt: {
				none: "",
				alternating: "shadow-xl even:rotate-3 odd:-rotate-2 hover:rotate-0 ease-out duration-300",
			},
      withBgColor: {
        true: "",
        false: "",
      },
		},
    compoundVariants: [
      {
        layout: "polaroid",
        withBgColor: true,
        class: "bg-card border-card",
      },
    ],
		defaultVariants: {
			shape: DEFAULTS.shape,
      layout: DEFAULTS.layout,
			tilt: DEFAULTS.tilt,
      withBgColor: false,
		},
	},
);

const DRAG_THRESHOLD = 5;

const Card = memo(
	({ className, entry, config, isDraggable = false, ...cardConfig }: Props) => {
    const [isHovered, setIsHovered] = useState(false);
		const dragStartPos = useRef<{ x: number; y: number } | null>(null);
		const linkRef = useRef<HTMLAnchorElement>(null);
		const entryId = entry.file.path;
		const handleEntryOpen = useEntryOpen(entry, config, cardConfig.linkProperty);
		const handleEntryHover = useEntryHover(entryId, linkRef);
    const image = useEntryImage(entry, cardConfig.imageProperty);
    const colors = useCardColors(entry, cardConfig, image);

		const onPointerDown = (event: React.PointerEvent) => {
			dragStartPos.current = { x: event.clientX, y: event.clientY };
		};

		const handleClick = useCallback((event: React.MouseEvent) => {
			if (isDraggable && dragStartPos.current) {
				const dx = Math.abs(event.clientX - dragStartPos.current.x);
				const dy = Math.abs(event.clientY - dragStartPos.current.y);
				if (dx > DRAG_THRESHOLD || dy > DRAG_THRESHOLD) {
					dragStartPos.current = null;
					return;
				}
			}

			handleEntryOpen(event);
		}, [handleEntryOpen, isDraggable]);

		const onMouseEnter = () => setIsHovered(true);
		const onMouseLeave = () => setIsHovered(false);

    const classes = cardVariants({
      layout: cardConfig.layout,
      shape: cardConfig.shape,
      tilt: cardConfig.tilt,
      withBgColor: !colors.contentBackground,
    });

		const isOverlay = cardConfig.layout === "overlay";
		const showOverlayContent = isOverlay && (
			cardConfig.overlayContentVisibility === "always" || isHovered
		);

		return (
			<div
				data-testid="lovely-card"
        data-layout={cardConfig.layout}
				className={cn(
					classes,
					className,
				)}
				style={{
					width: cardConfig.cardSize,
          ...(cardConfig.layout === "polaroid" ? { backgroundColor: colors.contentBackground, borderColor: colors.contentBackground } : undefined),
					...(isOverlay && { "height": `${cardConfig.cardSize * cardConfig.imageAspectRatio}px` }),
				} as React.CSSProperties}
				onPointerDown={onPointerDown}
				onClick={handleClick}
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
					<Image
            entry={entry}
            cardConfig={cardConfig}
            colors={colors}
            config={config}
            image={image}
            isOverlayMode />
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
						<Content
              entry={entry}
              cardConfig={cardConfig}
              colors={colors}
              config={config}
              isOverlayMode />
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
						<Image
              entry={entry}
              cardConfig={cardConfig}
              colors={colors}
              config={config}
              image={image} />
					) : (
						<Content
              entry={entry}
              cardConfig={cardConfig}
              colors={colors}
              config={config} />
					)}

					{cardConfig.reverseContent ? (
						<Image entry={entry} cardConfig={cardConfig} config={config} image={image} colors={colors} />
					) : (
						<Content
              entry={entry}
              cardConfig={cardConfig}
              colors={colors}
              config={config} />
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
			prevProps.isDraggable === nextProps.isDraggable &&
			compareCardConfig(prevProps, nextProps)
		);
	},
);

Card.displayName = "Card";

export default Card;
