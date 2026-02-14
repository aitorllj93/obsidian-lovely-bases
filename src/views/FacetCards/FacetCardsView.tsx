import { useMemo } from "react";

import { useCardConfig } from "@/components/Card/hooks/use-card-config";
import type { CardConfig } from "@/components/Card/types";

import { useGroupConfig } from "@/components/Group/hooks/use-group-config";
import type { GroupConfig } from "@/components/Group/types";

import { Container } from "@/components/Obsidian/Container";
import VirtualGrid from "@/components/VirtualGrid";

import { getGroupedData } from "@/lib/obsidian/groups";

import type { ReactBaseViewProps } from "@/types";

export type FacetCardsConfig = CardConfig & GroupConfig;

const FacetCardsView = ({ data, config, isEmbedded }: ReactBaseViewProps) => {
  const cardConfig = useCardConfig(config);
  const groupConfig = useGroupConfig(config);

  const items = useMemo(() => {
   return (config as { groupBy?: string }).groupBy === undefined
    ? data.data
    : getGroupedData(data.groupedData, groupConfig);
  }, [config, data, groupConfig]);

  return (
    <Container isEmbedded={isEmbedded}>
      <VirtualGrid
        cardConfig={cardConfig}
        className={isEmbedded ? "h-auto max-h-screen contain-none" : "h-full max-h-auto contain-strict"}
        config={config}
        groupConfig={groupConfig}
        items={items}
        minItemWidth={cardConfig.cardSize}
      />
    </Container>
  );
};

export default FacetCardsView;
