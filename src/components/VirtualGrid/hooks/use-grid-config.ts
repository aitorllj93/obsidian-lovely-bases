import { type CSSProperties, useMemo } from "react";

const getCardWidth = (columns: number, gap: number, width: number): number => {
  if (!width) return 0;

  const totalGap = (columns - 1) * gap;

  return (width - totalGap) / columns;
};

export function useGridConfig(
  width: number,
  gap: number,
  minItemWidth: number,
) {
  return useMemo(() => {
    const inner = Math.max(0, width);
    const columnCount = inner === 0 ? 1 : Math.max(1, Math.floor((inner + gap) / (minItemWidth + gap)));

    const cardWidth = getCardWidth(columnCount, gap, width);
    const columnStyle: CSSProperties = {
      gridTemplateColumns: `repeat(${columnCount}, minmax(0, ${cardWidth}px))`,
      gap,
      marginBottom: gap,
    };

    return {
      columnCount,
      cardWidth,
      columnStyle,
    }
  }, [width, gap, minItemWidth])
}
