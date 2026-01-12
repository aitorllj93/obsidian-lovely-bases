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

type Props = {
	className?: string;
	entry: BasesEntry;
	cardConfig: CardConfig;
	config: BasesViewConfig;
};

const Card = memo(
	({ className, entry, cardConfig, config }: Props) => {
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

		return (
			<div
				className={cn(
					"relative h-full bg-(--bases-cards-background) rounded shadow-md overflow-hidden transition-shadow hover:shadow-lg cursor-pointer border border-border",
					cardConfig.layout === "horizontal" ? "flex flex-row" : "flex flex-col",
					className,
				)}
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
			compareCardConfig(prevProps.cardConfig, nextProps.cardConfig)
		);
	},
);

Card.displayName = "Card";

export default Card;
