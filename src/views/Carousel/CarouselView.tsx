import { useMemo } from "react";

import Carousel from "@/components/Carousel";
import type { FacetsConfig } from "@/components/Facets/config";
import { useFacetsConfig } from "@/components/Facets/hooks/use-facets-config";
import { Container } from "@/components/Obsidian/Container";

import { getGroupedData, type GroupBy } from "@/lib/obsidian/groups";
import type { ReactBaseViewProps } from "@/types";

export type CarouselConfig = FacetsConfig;

const CarouselView = ({ data, config, isEmbedded }: ReactBaseViewProps) => {
  const facetsConfig = useFacetsConfig(config);
  const { groupLayout, groupUngroupedItemsDisplay } = facetsConfig;
  const groupBy = (config as { groupBy?: GroupBy }).groupBy;

  const items = useMemo(() => {
    return groupBy === undefined
      ? data.data
      : getGroupedData(data.groupedData, { groupUngroupedItemsDisplay, groupLayout });
  }, [data, groupBy, groupLayout, groupUngroupedItemsDisplay]);

  return (
    <Container isEmbedded={isEmbedded}>
      <Carousel
        facetsConfig={facetsConfig}
        config={config}
        items={items}
      />
    </Container>
  );
};

export default CarouselView;
