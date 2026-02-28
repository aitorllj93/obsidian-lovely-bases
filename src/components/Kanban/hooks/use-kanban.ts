
import type { BasesEntry, BasesEntryGroup } from "obsidian";
import { useState } from "react";

import { useObsidian } from "@/components/Obsidian/Context";
import type { KanbanMoveEvent } from "@/components/reui/kanban";
import { setProperty } from "@/lib/properties";

export const useKanban = (
  data: BasesEntryGroup[],
  groupByProperty?: string,
) => {
  const { app } = useObsidian();
  const [columns, setColumns] = useState<Record<string, BasesEntry[]>>(data.reduce(
    (acc, cur) => cur.hasKey() ?
      Object.assign(acc, {
        [cur.key?.toString() ?? ''] : cur.entries
      }) : acc,
      {} as Record<string, BasesEntry[]>
  ))

  const onMove = (evt: KanbanMoveEvent) => {
    if (!groupByProperty) return;

    const entry = columns[evt.activeContainer][evt.activeIndex];
    const targetContainer = evt.overContainer;

    setProperty(app, entry, groupByProperty, targetContainer);
  }

  return {
    columns,
    onMove,
    setColumns,
  }
}
