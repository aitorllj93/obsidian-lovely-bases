import type { BasesEntry, BasesEntryGroup } from "obsidian";

import type { GridColumn } from "@/lib/navigation/grid";

export type ColumnData = BasesEntry | BasesEntryGroup;

type Header = {
  type: "header";
  isExpanded: boolean;
  data: BasesEntryGroup;
}

type Item = {
  type: "item";
  data: ColumnData;
}

export type Column = GridColumn & (Header | Item);
