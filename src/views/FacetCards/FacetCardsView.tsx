import { useMemo } from "react";

import type { FacetsConfig } from "@/components/Facets/config";
import { useFacetsConfig } from "@/components/Facets/hooks/use-facets-config";

import { Container } from "@/components/Obsidian/Container";
import VirtualGrid from "@/components/VirtualGrid";

import { getGroupedData } from "@/lib/obsidian/groups";

import type { ReactBaseViewProps } from "@/types";

export type FacetCardsConfig = FacetsConfig;

const FacetCardsView = ({ data, config, isEmbedded }: ReactBaseViewProps) => {
  const facetsConfig = useFacetsConfig(config);
  const { groupLayout, groupUngroupedItemsDisplay } = facetsConfig;
  const groupBy = (config as { groupBy?: string }).groupBy;

  const items = useMemo(() => {
    return groupBy === undefined
      ? data.data
      : getGroupedData(data.groupedData, { groupUngroupedItemsDisplay, groupLayout });
  }, [data, groupBy, groupLayout, groupUngroupedItemsDisplay]);

  return (
    <Container isEmbedded={isEmbedded}>
      <VirtualGrid
        facetsConfig={facetsConfig}
        className={
          isEmbedded
            ? "h-auto max-h-screen contain-none"
            : "h-full max-h-auto contain-strict"
        }
        config={config}
        items={items}
        minItemWidth={facetsConfig.layoutItemSize}
      />
    </Container>
  );
};

export default FacetCardsView;
