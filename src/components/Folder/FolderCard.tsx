import type { BasesEntry, BasesViewConfig } from "obsidian";
import { type CSSProperties, forwardRef, type MouseEventHandler } from "react";

import Card from "@/components/Card";
import type { FacetsConfig } from "@/components/Facets/config";
import { cn } from "@/lib/utils";

const BASE_CARD_SIZE = 80;

type FolderCardProps = {
	entry: BasesEntry;
	config: BasesViewConfig;
	facetsConfig: FacetsConfig;
	delay: number;
	isVisible: boolean;
	index: number;
	totalCount: number;
	onClick?: MouseEventHandler<HTMLDivElement>;
	scaleFactor?: number;
};

const FolderCard = forwardRef<HTMLDivElement, FolderCardProps>(
	(
		{
			entry,
			config,
			facetsConfig,
			delay,
			isVisible,
			index,
			totalCount,
			scaleFactor = 1,
		},
		ref,
	) => {
		const middleIndex = (totalCount - 1) / 2;
		const factor = totalCount > 1 ? (index - middleIndex) / middleIndex : 0;

		const rotation = factor * 25;
		const translationX = factor * 85 * scaleFactor;
		const translationY = Math.abs(factor) * 12 * scaleFactor;

		const cardSize = BASE_CARD_SIZE * scaleFactor;

		const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
			event.stopPropagation();
		};

		return (
			<div
				ref={ref}
				className={cn("absolute cursor-pointer group/folder-card hover:z-90")}
				style={{
					width: cardSize,
					// height: cardHeight,
					transform: isVisible
						? `translateY(calc(${-100 * scaleFactor}px + ${translationY}px)) translateX(${translationX}px) rotate(${rotation}deg) scale(1)`
						: "translateY(0px) translateX(0px) rotate(0deg) scale(0.4)",
					opacity: isVisible ? 1 : 0,
					transition: `all 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
					zIndex: 10 + index,
					left: -cardSize / 2,
					// top: -cardHeight / 2,
          '--hover-background': "var(--primary)",
				} as CSSProperties}
				onClick={handleClick}
			>
				<div
					className={cn(
						"w-full h-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
						"group-hover/folder-card:-translate-y-6 group-hover/folder-card:shadow-2xl group-hover/folder-card:shadow-(--hover-background)/40 group-hover/folder-card:scale-150",
					)}
				>
					<Card
						entry={entry}
						config={config}
						contentClassName="w-full h-full group-hover/folder-card:shadow-(--hover-background)"
            {...facetsConfig}
            layoutItemSize={cardSize}
						cardAdaptToSize
            titlePosition="inside"
					/>
				</div>
			</div>
		);
	},
);

FolderCard.displayName = "FolderCard";

export default FolderCard;
