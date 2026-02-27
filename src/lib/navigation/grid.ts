import type { Virtualizer } from "@tanstack/react-virtual";
import type { RefObject } from "react";

import type { Direction } from "./types";

export type { Direction } from "./types";

export type GridPosition = {
  row: number;
  col: number;
}

export type GridColumn = GridPosition & {
  /** Combination of row and col (eg. 0-1) */
  id: string;
  /** Position in the general data array */
  index: number;
  /** Unique stable id */
  key: string;
}

/** Generates a position id (eg. 0-1) from a Grid Position */
export const getPositionId = <T extends GridPosition = GridPosition>(col: T): string =>
  `${col.row}-${col.col}`;

export const getNextItem = <T extends GridColumn = GridColumn>(
  rows: T[][],
  current: GridPosition,
  direction: Direction,
): GridPosition => {
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

export const scrollToPosition = (
  pos: GridPosition,
  behavior: 'auto' | 'smooth' = 'auto',
  container?: Virtualizer<HTMLDivElement, Element> | RefObject<HTMLDivElement | null>,
): HTMLElement | null => {
  const elementId = `row-${getPositionId(pos)}`;
  let element: HTMLElement | null = null;

  if (container && 'scrollToIndex' in container) {
    // if there's virtualizer, use the built-in scroll method
    container.scrollToIndex(pos.row, {
      align: "center",
      behavior,
    });
    element = document.getElementById(elementId);

    return element;
  }

  if (container && 'current' in container) {
    element = document.getElementById(elementId);

    if (element) {
      container.current?.scrollTo({
        left: element.offsetLeft,
        behavior,
      });
    }

    return element;
  }

  element = document.getElementById(elementId);
  if (!element) {
    return null;
  }

  const parent = element.parentElement;

  element.scrollIntoView({
    block: 'nearest',
    inline: 'start',
    behavior,
  });
  if (parent) {
    parent.scrollIntoView({
      block: 'center',
      inline: 'start',
      behavior,
    })
    parent.scroll({
      left: element.offsetLeft,
      behavior,
    })
  } else {
    element.scrollIntoView({
      block: 'nearest',
      inline: 'start',
      behavior,
    });
  }

  return element;
}
