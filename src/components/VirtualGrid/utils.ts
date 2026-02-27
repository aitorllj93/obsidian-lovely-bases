import { BasesEntryGroup } from "obsidian";
import type { CSSProperties } from "react";

import type { FacetsConfig } from "@/components/Facets/config";
import { getPositionId } from "@/lib/navigation/grid";
import { getIdentifier } from "@/lib/obsidian/entry";
import { chunk } from "@/lib/utils";
import type { Column, ColumnData } from "./types";

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


const makeItem = (
  data: ColumnData,
  index: number,
  row: number,
  col: number
): Column => ({
  type: "item",
  id: getPositionId({ col, row }),
  key: getIdentifier(data),
  index,
  row,
  col,
  data,
});

const makeHeader = (
  group: BasesEntryGroup,
  key: string,
  index: number,
  row: number,
  isExpanded: boolean,
): Column => ({
  type: "header",
  id: getPositionId({ col: 0, row }),
  key,
  index,
  row,
  col: 0,
  data: group,
  isExpanded,
});

export const getRows = (
  groupLayout: FacetsConfig["groupLayout"],
  items: ColumnData[],
  columnCount: number,
  collapsedSectionKeys?: Set<string>,
): Column[][] => {
  if (columnCount === 0) {
    return [];
  }

  let totalCols = 0;
  const cols = Math.max(1, columnCount);
  const collapsed = collapsedSectionKeys ?? new Set<string>();

  if (groupLayout !== "sections") {
    return chunk<ColumnData, Column>(items, cols,
      (data, index, row, col) =>
        makeItem(
          data,
          index,
          row,
          col
        ),
    );
  }

  const rows: Column[][] = [];
  let pendingRow: Column[] = [];

  const flushPending = () => {
    if (pendingRow.length) {
      rows.push(pendingRow);
      pendingRow = [];
    }
  };

  const pushEntryGrid = (entries: ColumnData[], baseRow: number) => {
    // Emite entries como grid de rows “item” empezando en baseRow.
    // Devuelve cuántas filas ha añadido.
    let localRow = 0;
    let col = 0;

    for (let i = 0; i < entries.length; i++) {
      if (col === 0) rows.push([]); // nueva fila
      const rowIndex = baseRow + localRow;
      rows[rows.length - 1].push(
        makeItem(
          entries[i],
          totalCols,
          rowIndex,
          col
        )
      );

      totalCols++;
      col++;
      if (col === cols) {
        col = 0;
        localRow++;
      }
    }

    return col === 0 ? localRow : localRow + 1;
  };

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    if (item instanceof BasesEntryGroup) {
      // Antes de meter header, vacía lo pendiente
      flushPending();

      const headerRowIndex = rows.length;
      const uniqueId = getIdentifier(item);
      rows.push([makeHeader(
        item,
        uniqueId,
        totalCols,
        headerRowIndex,
        !collapsedSectionKeys?.has(uniqueId)
      )]);

      const isCollapsed = collapsed.has(String(item.key));

      if (item.entries?.length && !isCollapsed) {
        const baseRow = rows.length; // la siguiente fila virtual tras el header
        pushEntryGrid(item.entries as ColumnData[], baseRow);
      }

      continue;
    }

    // Item suelto (no grupo) → va a pendingRow (en grid)
    const rowIndex = rows.length; // aún no se ha pusheado pendingRow, así que rows.length será su índice final
    const col = pendingRow.length;

    pendingRow.push(makeItem(item, totalCols, rowIndex, col));
    totalCols++;

    if (pendingRow.length === cols) {
      rows.push(pendingRow);
      pendingRow = [];
    }
  }

  flushPending();
  return rows;
};
