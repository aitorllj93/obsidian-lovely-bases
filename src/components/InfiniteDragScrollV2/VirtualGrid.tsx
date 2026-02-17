import  { type BasesEntry, type BasesViewConfig, Platform } from "obsidian";

import type { FacetsConfig } from "@/components/Facets/config";
import { cn } from "@/lib/utils";

import Facets from "../Facets";
import GridItem from "./GridItem";
import { useVirtualGrid } from "./hooks/use-virtual-grid";

type ScrollPosition = {
	x: number;
	y: number;
};

type VirtualGridProps = {
	items: BasesEntry[];
	facetsConfig: FacetsConfig;
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
	facetsConfig,
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
					<Facets
            className="mx-auto min-h-fit"
            data={items[realIndex]}
						config={config}
            isDraggable
            facetsConfig={{
              ...facetsConfig,
              layoutItemSize: cellWidth,
            }}
            initialAnimation={false}
					/>
				</GridItem>
			))}
		</div>
	);
};
