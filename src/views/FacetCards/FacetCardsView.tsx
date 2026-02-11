import { estimateCardHeight } from "@/components/Card/helpers/estimate-card-height";
import { useCardConfig } from "@/components/Card/hooks/use-card-config";
import type { CardConfig } from "@/components/Card/types";
import { Container } from "@/components/Obsidian/Container";
import VirtualGrid from "@/components/VirtualGrid";
import type { ReactBaseViewProps } from "@/types";

const PADDING = 12;

export type FacetCardsConfig = CardConfig;

const FacetCardsView = ({ data, config, isEmbedded }: ReactBaseViewProps) => {
  const cardConfig = useCardConfig(config);
  const estimatedRowHeight = estimateCardHeight(cardConfig) + PADDING * 2;

  return (
    <Container isEmbedded={isEmbedded}>
      <VirtualGrid
        cardConfig={cardConfig}
        className={isEmbedded ? "max-h-screen" : "max-h-auto"}
        config={config}
        estimateRowHeight={estimatedRowHeight}
        items={data.data}
        minItemWidth={cardConfig.cardSize}
      />
    </Container>
  );
};

export default FacetCardsView;
