import type { BasesEntry, BasesViewConfig } from "obsidian";
import { memo, useRef, useState } from "react";

import { useEntryHover } from "@/hooks/use-entry-hover";
import { useEntryOpen } from "@/hooks/use-entry-open";
import { cn } from "@/lib/utils";

import Content from "./Content";
import HoverOverlay from "./HoverOverlay";
import Image from "./Image";
import type { CardConfig } from "./types";
import { compareCardConfig } from "./config/get-config";
import { cva } from "class-variance-authority";
import { DEFAULT_LAYOUT, DEFAULT_SHAPE } from "./config/constants";

type Props = CardConfig & {
	className?: string;
	entry: BasesEntry;
	config: BasesViewConfig;
};

const cardVariants = cva(
	"relative h-full bg-(--bases-cards-background) shadow-md overflow-hidden transition-shadow hover:shadow-lg cursor-pointer border border-border",
	{
		variants: {
      layout: {
        horizontal: "flex flex-row",
        vertical: "flex flex-col",
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

		return (
			<div
				className={cn(
					classes,
					className,
				)}
        style={{
          width: cardConfig.cardSize,
        }}
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
