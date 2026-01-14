import { useMemo } from "react";

import type { VirtualItem, variants } from "../types";

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
  variant?: variants;
  buffer?: number;
};

// Hook to calculate visible items in virtual grid
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
  variant,
  buffer = 2,
}: UseVirtualGridParams): VirtualItem[] => {
  return useMemo(() => {
    if (totalItems === 0 || viewportWidth === 0 || viewportHeight === 0 || columns === 0)
      return [];

    // Cell spacing including gap
    const cellSpacingX = cellWidth + gapX;
    const cellSpacingY = cellHeight + gapY;

    // For masonry, account for the offset
    const masonryOffset =
      variant === "masonry" || variant === "polaroid" ? cellHeight * 0.6 : 0;
    const effectiveCellSpacingY =
      cellSpacingY + (masonryOffset > 0 ? masonryOffset / 2 : 0);

    // Calculate visible range of columns (infinite in both directions)
    const startCol = Math.floor(-scrollX / cellSpacingX) - buffer;
    const endCol =
      Math.ceil((-scrollX + viewportWidth) / cellSpacingX) + buffer;

    // Calculate visible range of rows (infinite in both directions)
    const startRow = Math.floor(-scrollY / effectiveCellSpacingY) - buffer;
    const endRow =
      Math.ceil((-scrollY + viewportHeight) / effectiveCellSpacingY) + buffer;

    const visibleItems: VirtualItem[] = [];

    // Iterate through ALL visible columns and rows (infinite grid)
    for (let virtualRow = startRow; virtualRow <= endRow; virtualRow++) {
      for (let virtualCol = startCol; virtualCol <= endCol; virtualCol++) {
        // Wrap column to [0, columns-1] for index calculation
        const wrappedCol = wrapIndex(virtualCol, columns);

        // Calculate the virtual index in the infinite grid
        const virtualIndex = virtualRow * columns + wrappedCol;
        const realIndex = wrapIndex(virtualIndex, totalItems);

        // Calculate position in grid coordinates
        const gridX = virtualCol * cellSpacingX;
        let gridY = virtualRow * effectiveCellSpacingY;

        // Apply masonry offset for columns with even wrapped index
        if (
          (variant === "masonry" || variant === "polaroid") &&
          wrappedCol % 2 === 0
        ) {
          gridY += masonryOffset;
        }

        // Store base grid position (without scroll offset)
        // The scroll offset will be applied reactively via useTransform
        visibleItems.push({
          virtualCol,
          virtualRow,
          realIndex,
          baseX: gridX,
          baseY: gridY,
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
    variant,
    buffer,
  ]);
};
