import { type BasesEntry, BasesEntryGroup } from "obsidian";
import type { CSSProperties } from "react";
import type { FacetsConfig } from "@/components/Facets/config";
import { chunk } from "@/lib/utils";

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

export const getRows = (
  groupLayout: FacetsConfig['groupLayout'],
  items: (BasesEntry | BasesEntryGroup)[],
  columnCount: number,
  collapsedSectionKeys?: Set<string>,
) => {
  if (groupLayout !== 'sections') {
    return chunk(items, columnCount);
  }

  const rows: (BasesEntry | BasesEntryGroup)[][] = [];
  let currentRow: (BasesEntry | BasesEntryGroup)[] = [];

  for (const item of items) {
    if (item instanceof BasesEntryGroup) {
      // flush current row
      if (currentRow.length > 0) {
        rows.push(currentRow);
        currentRow = [];
      }

      rows.push([item]);

      if (item.entries?.length && !collapsedSectionKeys.has(item.key.toString())) {
        rows.push(...chunk(item.entries, columnCount));
      }

      continue;
    }

    currentRow.push(item);

    if (currentRow.length === columnCount) {
      rows.push(currentRow);
      currentRow = [];
    }
  }

  // flush final
  if (currentRow.length > 0) {
    rows.push(currentRow);
  }

  return rows;

}
