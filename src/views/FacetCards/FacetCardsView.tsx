import { useCardConfig } from "@/components/Card/hooks/use-card-config";
import type { CardConfig } from "@/components/Card/types";
import { Container } from "@/components/Obsidian/Container";
import VirtualGrid from "@/components/VirtualGrid";
import type { ReactBaseViewProps } from "@/types";

export type FacetCardsConfig = CardConfig;

const FacetCardsView = ({ data, config, isEmbedded }: ReactBaseViewProps) => {
  const cardConfig = useCardConfig(config);

  return (
    <Container isEmbedded={isEmbedded}>
      <VirtualGrid
        cardConfig={cardConfig}
        className={isEmbedded ? "max-h-screen" : "max-h-auto"}
        config={config}
        items={data.data}
        measureAfterRaf={0}
        minItemWidth={cardConfig.cardSize}
      />
    </Container>
  );
};

export default FacetCardsView;
