import type { BasesEntry, BasesEntryGroup } from "obsidian";

export type ColumnData = BasesEntry | BasesEntryGroup;

type CommonColumn = {
  /** Position in the general data array */
  index: number;
  /** Virtual Row Index */
  row: number;
  /** Position inside the Row */
  col: number;
  /** Unique stable id */
  key: string;
}

type HeaderColumn = CommonColumn & {
  type: "header";
  isExpanded: boolean;
  data: BasesEntryGroup;
}

type ItemColumn = CommonColumn & {
  type: "item";
  /** BasesEntry or BasesEntryGroup */
  data: ColumnData;
}

export type Column = HeaderColumn | ItemColumn;

export type ActiveItem = {
  rowIndex: number;
  colIndex: number;
}

export type Direction = 'left' | 'right' | 'up' | 'down';

export type Position = {
  row: number;
  col: number;
}
