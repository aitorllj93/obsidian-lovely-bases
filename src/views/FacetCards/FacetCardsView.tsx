import { useCardConfig } from "@/components/Card/hooks/use-card-config";
import type { CardConfig } from "@/components/Card/types";
import { Container } from "@/components/Obsidian/Container";
import VirtualGrid from "@/components/VirtualGrid";
import type { ReactBaseViewProps } from "@/types";

export const FACET_CARDS_TYPE_ID = "facet-cards";

const PADDING = 12;

export type FacetCardsConfig = CardConfig;

function estimateCardHeight(cardConfig: CardConfig, padding = PADDING): number {
  const TITLE_HEIGHT = 30;
  const PROPERTY_TITLE_HEIGHT = 15;
  const PROPERTY_VALUE_HEIGHT = 30;

  let contentHeight = padding;

  if (cardConfig.showTitle) {
    contentHeight += TITLE_HEIGHT;
  }

  if (cardConfig.properties.length > 0) {
    let propertyHeight = PROPERTY_VALUE_HEIGHT;
    if (cardConfig.showPropertyTitles) {
      propertyHeight += PROPERTY_TITLE_HEIGHT;
    }
    contentHeight += propertyHeight * cardConfig.properties.length;
  }

  const verticalImageHeight = cardConfig.imageAspectRatio * cardConfig.cardSize;

  return cardConfig.layout === "horizontal"
    ? contentHeight
    : verticalImageHeight + contentHeight;
}

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
