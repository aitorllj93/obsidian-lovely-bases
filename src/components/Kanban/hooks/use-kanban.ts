
import type { BasesEntry, BasesEntryGroup, BasesPropertyId } from "obsidian";
import { useState } from "react";

import type { GroupLayoutDirection } from "@/components/Facets/config";
import { useObsidian } from "@/components/Obsidian/Context";
import type { KanbanMoveEvent } from "@/components/reui/kanban";
import { setProperty } from "@/lib/properties";

export const useKanban = (
  data: BasesEntryGroup[],
  groupByProperty?: BasesPropertyId,
  groupLayoutDirection?: GroupLayoutDirection,
) => {
  const { app } = useObsidian();
  const [columns, setColumns] = useState<Record<string, BasesEntry[]>>(data.reduce(
    (acc, cur) => cur.hasKey() ?
      Object.assign(acc, {
        [cur.key?.toString() ?? ''] : cur.entries
      }) : acc,
      {} as Record<string, BasesEntry[]>
  ));

  const direction: 'column' | 'row' = groupLayoutDirection === 'vertical' ?
    'column' : 'row';

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
    direction,
    handleValueChange,
  }
}
