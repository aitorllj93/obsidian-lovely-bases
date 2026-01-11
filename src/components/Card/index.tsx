import { memo, useRef, useState } from "react";

import { useConfigValue } from "@/hooks/use-config-value";
import { useEntryHover } from "@/hooks/use-entry-hover";
import { useEntryOpen } from "@/hooks/use-entry-open";
import { cn } from "@/lib/utils";

import Content from "./Content";
import HoverOverlay from "./HoverOverlay";
import Image from "./Image";

type Props = {
	className?: string;
	entryId: string;
};

const Card = memo(
	({ className, entryId }: Props) => {
		const [isHovered, setIsHovered] = useState(false);
		const dragStartPos = useRef<{ x: number; y: number } | null>(null);
		const linkRef = useRef<HTMLAnchorElement>(null);
		const handleEntryOpen = useEntryOpen(entryId);
		const handleEntryHover = useEntryHover(entryId, linkRef);

		const layout = useConfigValue<"vertical" | "horizontal">(
			"layout",
			"vertical",
		);
		const reverseContent = useConfigValue<boolean>("reverseContent", false);

		const onPointerDown = (event: React.PointerEvent) => {
			dragStartPos.current = { x: event.clientX, y: event.clientY };
		};

		const onMouseEnter = () => setIsHovered(true);
		const onMouseLeave = () => setIsHovered(false);

		return (
			<div
				className={cn(
					"relative h-full bg-(--bases-cards-background) rounded shadow-md overflow-hidden transition-shadow hover:shadow-lg cursor-pointer border border-border",
					layout === "horizontal" ? "flex flex-row" : "flex flex-col",
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

				{!reverseContent ? (
					<Image entryId={entryId} />
				) : (
					<Content entryId={entryId} />
				)}

				{reverseContent ? (
					<Image entryId={entryId} />
				) : (
					<Content entryId={entryId} />
				)}

				{isHovered && <HoverOverlay entryId={entryId} />}
			</div>
		);
	},
	(prevProps, nextProps) => {
		return (
			prevProps.entryId === nextProps.entryId &&
			prevProps.className === nextProps.className
		);
	},
);

Card.displayName = "Card";

export default Card;
