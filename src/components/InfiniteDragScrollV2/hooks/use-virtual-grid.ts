import { Platform } from "obsidian";
import { useMemo } from "react";

import type { VirtualItem } from "../types";

// Safety constants to prevent memory leaks
// Reduced for mobile compatibility - even 50 items is enough for smooth scrolling
const MAX_VISIBLE_ITEMS = Platform.isMobile ? 50 : 200;
const MAX_BUFFER = Platform.isMobile ? 2 : 5; // Reduced from 5 to prevent excessive rendering on mobile

// Helper function to wrap index to valid range
const wrapIndex = (index: number, total: number): number => {
	if (total === 0) return 0;
	return ((index % total) + total) % total;
};

type UseVirtualGridParams = {
	totalItems: number;
	columns: number;
	cellWidth: number;
	cellHeight: number;
	gapX: number;
	gapY: number;
	scrollX: number;
	scrollY: number;
	viewportWidth: number;
	viewportHeight: number;
	masonry?: boolean;
	buffer?: number;
};

export const useVirtualGrid = ({
	totalItems,
	columns,
	cellWidth,
	cellHeight,
	gapX,
	gapY,
	scrollX,
	scrollY,
	viewportWidth,
	viewportHeight,
	masonry = false,
	buffer = 2,
}: UseVirtualGridParams): VirtualItem[] => {
	return useMemo(() => {
		// Safety guards - early validation to prevent invalid calculations
		if (totalItems === 0 || columns === 0) return [];
		if (viewportWidth <= 0 || viewportHeight <= 0) return [];
		if (cellWidth <= 0 || cellHeight <= 0) return [];

		// Cap buffer to prevent excessive rendering
		const safeBuffer = Math.min(Math.max(0, buffer), MAX_BUFFER);

		// Cell spacing including gap
		const cellSpacingX = cellWidth + gapX;
		const cellSpacingY = cellHeight + gapY;

		// Calculate masonry offset (only affects column positioning, not row spacing)
		const masonryOffset = masonry ? cellHeight * 0.5 : 0;

		// Calculate visible range of columns (infinite in both directions)
		const startCol = Math.floor(-scrollX / cellSpacingX) - safeBuffer;
		const endCol = Math.ceil((-scrollX + viewportWidth) / cellSpacingX) + safeBuffer;

		// Calculate visible range of rows (infinite in both directions)
		// Use larger buffer when masonry is enabled to account for offset items
		const masonryBuffer = masonry ? safeBuffer + 1 : safeBuffer;
		const startRow = Math.floor(-scrollY / cellSpacingY) - masonryBuffer;
		const endRow = Math.ceil((-scrollY + viewportHeight) / cellSpacingY) + masonryBuffer;

		const visibleItems: VirtualItem[] = [];

		// Iterate through visible columns and rows
		for (let virtualRow = startRow; virtualRow <= endRow; virtualRow++) {
			for (let virtualCol = startCol; virtualCol <= endCol; virtualCol++) {
				// Safety check: prevent runaway loops
				if (visibleItems.length >= MAX_VISIBLE_ITEMS) {
					return visibleItems;
				}

				// Wrap column to [0, columns-1] for index calculation
				const wrappedCol = wrapIndex(virtualCol, columns);

				// Calculate the virtual index in the infinite grid
				const virtualIndex = virtualRow * columns + wrappedCol;
				const realIndex = wrapIndex(virtualIndex, totalItems);

				// Calculate base position in grid coordinates
				const baseX = virtualCol * cellSpacingX;
				let baseY = virtualRow * cellSpacingY;

				// Apply masonry offset for even columns (in rendering coordinates)
				// Use virtualCol (not wrappedCol) to maintain consistent visual alignment
				if (masonry && virtualCol % 2 === 0) {
					baseY += masonryOffset;
				}

				// Calculate final position including scroll offset
				const x = baseX + scrollX;
				const y = baseY + scrollY;

				visibleItems.push({
					virtualCol,
					virtualRow,
					realIndex,
					x,
					y,
					key: `${realIndex}-${virtualCol}-${virtualRow}`,
				});
			}
		}

		return visibleItems;
	}, [
		totalItems,
		columns,
		cellWidth,
		cellHeight,
		gapX,
		gapY,
		scrollX,
		scrollY,
		viewportWidth,
		viewportHeight,
		masonry,
		buffer,
	]);
};
