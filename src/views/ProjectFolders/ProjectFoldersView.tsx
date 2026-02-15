import { useMemo } from "react";

import type { FacetsConfig } from "@/components/Facets/config";
import { useFacetsConfig } from "@/components/Facets/hooks/use-facets-config";
import { Container } from "@/components/Obsidian/Container";
import VirtualGrid from "@/components/VirtualGrid";
import { getGroupedData } from "@/lib/obsidian/groups";
import type { ReactBaseViewProps } from "@/types";

export type ProjectFoldersConfig = FacetsConfig;

const ProjectFoldersView = ({ config, data, isEmbedded }: ReactBaseViewProps) => {
	const facetsConfig = useFacetsConfig(config);
  const { groupUngroupedItemsDisplay } = facetsConfig;

  const items = useMemo(() => {
    return getGroupedData(data.groupedData, { groupUngroupedItemsDisplay });
  }, [data, groupUngroupedItemsDisplay]);

	return (
    <Container isEmbedded={isEmbedded}>
      <VirtualGrid
        facetsConfig={facetsConfig}
        className={isEmbedded ? "h-auto max-h-screen contain-none" : "h-full max-h-auto contain-strict"}
        config={config}
        items={items}
        minItemWidth={facetsConfig.layoutItemSize}
      />
    </Container>
	);
};

export default ProjectFoldersView;
