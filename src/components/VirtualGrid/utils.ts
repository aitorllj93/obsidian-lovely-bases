import { type BasesEntry, BasesEntryGroup } from "obsidian";
import type { CSSProperties } from "react";

import type { FacetsConfig } from "@/components/Facets/config";
import { chunk } from "@/lib/utils";
import type { Column, ColumnData, Direction, Position } from "./types";

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

export const getGridItemId = (item: BasesEntry | BasesEntryGroup) =>
  (item instanceof BasesEntryGroup ? item.key?.toString() : item.file.path) as string;



  const makeItem = (
    data: ColumnData,
    index: number,
    row: number,
    col: number
  ): Column => ({
    type: "item",
    key: getGridItemId(data),
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
      const uniqueId = getGridItemId(item);
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

export const getNextItemFromRows = (
  rows: Column[][],
  current: Position,
  direction: Direction,
): Position => {
  if (!rows.length) return { row: 0, col: 0 };

  const itemColsInRow = (r: number) =>
    rows[r].map(r => r.col) ?? [];

  const clampRow = (r: number) => Math.max(0, Math.min(r, rows.length - 1));

  const findNearestCol = (r: number, targetCol: number): number => {
    const cols = itemColsInRow(r);
    if (cols.length === 0) return 0;
    let best = cols[0];
    let bestDist = Math.abs(best - targetCol);
    for (let i = 1; i < cols.length; i++) {
      const d = Math.abs(cols[i] - targetCol);
      if (d < bestDist) {
        bestDist = d;
        best = cols[i];
      }
    }
    return best;
  };

  const getCols = (r: number) => rows[r]?.map(x => x.col) ?? [];

  const findRowWithItems = (start: number, step: number): number => {
    for (let r = start; r >= 0 && r < rows.length; r += step) {
      if (getCols(r).length) return r;
    }
    return -1;
  };

  const row = clampRow(current.row);
  const cols = getCols(row);
  if (cols.length === 0) {
    const down = findRowWithItems(row, +1);
    const up = findRowWithItems(row, -1);

    let pick = row;
    if (down === -1 && up === -1) pick = row;
    else if (down === -1) pick = up;
    else if (up === -1) pick = down;
    else pick = (row - up) <= (down - row) ? up : down; // empate → arriba

    const pickCols = getCols(pick);
    return { row: pick, col: pickCols[0] ?? 0 };
  }

  // normaliza col a una existente en la fila
  const col = cols.includes(current.col)
    ? current.col
    : findNearestCol(row, current.col);

  if (direction === "left" || direction === "right") {
    const sorted = cols.slice().sort((a, b) => a - b);
    const i = sorted.indexOf(col);
    const nextI =
      direction === "left" ? Math.max(0, i - 1) : Math.min(sorted.length - 1, i + 1);
    return { row, col: sorted[nextI] };
  }

  // top/bottom
  const step = direction === "up" ? -1 : +1;
  let targetRow = row + step;

  // salta filas sin items (headers/separadores)
  while (targetRow >= 0 && targetRow < rows.length && itemColsInRow(targetRow).length === 0) {
    targetRow += step;
  }

  if (targetRow < 0 || targetRow >= rows.length) {
    // borde: no se mueve
    return { row: row, col: col };
  }

  const targetCol = findNearestCol(targetRow, col);
  return { row: targetRow, col: targetCol };
}
