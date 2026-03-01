
import type { BasesEntry, BasesEntryGroup, BasesPropertyId } from "obsidian";
import { useState } from "react";

import { useObsidian } from "@/components/Obsidian/Context";
import type { KanbanMoveEvent } from "@/components/reui/kanban";
import { setProperty } from "@/lib/properties";

export const useKanban = (
  data: BasesEntryGroup[],
  groupByProperty?: BasesPropertyId,
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

  const handleValueChange = (columns: Record<string, BasesEntry[]>, evt: KanbanMoveEvent) => {
    setColumns(columns);

    if (!evt || !groupByProperty) {
      return;
    }

    if (evt.kind === 'DragEndEvent') {
      const targetContainer = evt.overContainer;
      const entry = columns[targetContainer][0]; // TODO: with sortable, it should be evt.overIndex

      setProperty(app, entry, groupByProperty, targetContainer);
    }
  }

  return {
    columns,
    onMove,
    handleValueChange,
  }
}
