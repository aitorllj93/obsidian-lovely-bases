import type { CSSProperties } from "react";

const getItemWidth = (columns: number, gap: number, width: number): number => {
  if (!width) return 0;

  const totalGap = (columns - 1) * gap;

  return (width - totalGap) / columns;
};

export const getGridConfig = (
  width: number,
  gap: number,
  minItemWidth: number,
) => {
  const inner = Math.max(0, width);
  const columnCount =
    inner === 0
      ? 1
      : Math.max(1, Math.floor((inner + gap) / (minItemWidth + gap)));

  const itemWidth = getItemWidth(columnCount, gap, width);
  const columnStyle: CSSProperties = {
    gridTemplateColumns: `repeat(${columnCount}, minmax(0, ${itemWidth}px))`,
    gap: `${gap}px`,
  };

  return {
    columnCount,
    itemWidth,
    columnStyle,
  };
};
