import type { BasesEntryGroup } from "obsidian";
import { useMemo } from "react";

import type { FacetsConfig } from "@/components/Facets/config";
import { useFacetsConfig } from "@/components/Facets/hooks/use-facets-config";
import Kanban from "@/components/Kanban";
import { Container } from "@/components/Obsidian/Container";
import { getGroupedData } from "@/lib/obsidian/groups";

import type { ReactBaseViewProps } from "@/types";

export type KanbanConfig = FacetsConfig;

const KanbanView = ({ config, data, isEmbedded }: ReactBaseViewProps) => {
  const facetsConfig = useFacetsConfig(config);
  const { groupUngroupedItemsDisplay } = facetsConfig;

  const items = useMemo(() => {
    return getGroupedData(data.groupedData, {
      groupUngroupedItemsDisplay: groupUngroupedItemsDisplay === 'inline' ? 'group' : groupUngroupedItemsDisplay,
      groupLayout: 'sections',
    }) as BasesEntryGroup[];
  }, [data, groupUngroupedItemsDisplay]);

  return (
    <Container isEmbedded={isEmbedded}>
      <Kanban
        config={config}
        data={items}
        facetsConfig={facetsConfig}
      />
    </Container>
  );
};

export default KanbanView;
