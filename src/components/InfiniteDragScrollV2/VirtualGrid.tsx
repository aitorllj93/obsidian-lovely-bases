import  { type BasesEntry, type BasesViewConfig, Platform } from "obsidian";

import { cn } from "@/lib/utils";

import Card from "../Card";
import type { CardConfig } from "../Card/types";

import GridItem from "./GridItem";
import { useVirtualGrid } from "./hooks/use-virtual-grid";

type ScrollPosition = {
	x: number;
	y: number;
};

type VirtualGridProps = {
	items: BasesEntry[];
	cardConfig: CardConfig;
	config: BasesViewConfig;
	columns: number;
	cellWidth: number;
	cellHeight: number;
	gapX: number;
	gapY: number;
	scrollPosition: ScrollPosition;
	viewportWidth: number;
	viewportHeight: number;
	masonry?: boolean;
	className?: string;
};

export const VirtualGrid = ({
	items,
	cardConfig,
	config,
	columns,
	cellWidth,
	cellHeight,
	gapX,
	gapY,
	scrollPosition,
	viewportWidth,
	viewportHeight,
	masonry = false,
	className,
}: VirtualGridProps) => {
	// Calculate visible items using safe virtualization hook
	// Use buffer of 1 to minimize memory usage on mobile
	const visibleItems = useVirtualGrid({
		totalItems: items.length,
		columns,
		cellWidth,
		cellHeight,
		gapX,
		gapY,
		scrollX: scrollPosition.x,
		scrollY: scrollPosition.y,
		viewportWidth,
		viewportHeight,
		masonry,
		buffer: Platform.isMobile ? 1 : 3,
	});

	return (
		<div className={cn("absolute inset-0", className)}>
			{visibleItems.map(({ key, realIndex, x, y }) => (
				<GridItem
					key={key}
					x={x}
					y={y}
					width={cellWidth}
					height={cellHeight}
				>
					<Card
						entry={items[realIndex]}
						config={config}
						isDraggable={true}
						className="w-full h-full"
						{...cardConfig}
					/>
				</GridItem>
			))}
		</div>
	);
};
