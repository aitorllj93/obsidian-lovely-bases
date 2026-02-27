import { BasesEntryGroup } from "obsidian";

import type { FacetsConfig } from "@/components/Facets/config";
import { getPositionId } from "@/lib/navigation/grid";
import { getIdentifier } from "@/lib/obsidian/entry";

import type { Column, ColumnData } from "./types";

const makeItem = (
  data: ColumnData,
  index: number,
  row: number,
  col: number
): Column => ({
  type: "item",
  key: getIdentifier(data),
  id: getPositionId({ row, col }),
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
  id: getPositionId({ row, col: 0 }),
  row,
  col: 0,
  data: group,
  isExpanded,
});

export const getRows = (
  groupLayout: FacetsConfig["groupLayout"],
  items: ColumnData[],
  collapsedSectionKeys?: Set<string>,
): Column[][] => {
  let totalCols = 0;
  const collapsed = collapsedSectionKeys ?? new Set<string>();

  if (groupLayout !== "sections") {
    return [
      items.map((item, index) => {
        const next = makeItem(
          item,
          totalCols,
          0,
          index,
        );
        totalCols++;
        return next;
      })
    ];
  }

  const rows: Column[][] = [];
  let pendingRow: Column[] = [];

  const flushPending = () => {
    if (pendingRow.length) {
      rows.push(pendingRow);
      pendingRow = [];
    }
  };

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    if (item instanceof BasesEntryGroup) {
      flushPending();

      const uniqueId = getIdentifier(item);
      rows.push([makeHeader(
        item,
        uniqueId,
        totalCols,
        rows.length,
        !collapsedSectionKeys?.has(uniqueId)
      )]);
      totalCols++;

      const isCollapsed = collapsed.has(String(item.key));

      if (item.entries?.length && !isCollapsed) {
        rows.push(item.entries.map((item, index) => {
          const next = makeItem(
            item,
            totalCols,
            rows.length,
            index,
          );
          totalCols++;
          return next;
        }))
      }
      flushPending();

      continue;
    }

    pendingRow.push(makeItem(
      item,
      totalCols,
      rows.length,
      pendingRow.length,
    ));
    totalCols++;
  }

  flushPending();
  return rows;
};
