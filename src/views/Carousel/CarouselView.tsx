
import type { BasesPropertyId, BasesViewConfig } from "obsidian";

import { useCardConfig } from "@/components/Card/hooks/use-card-config";
import type { CardConfig } from "@/components/Card/types";
import Carousel from "@/components/Carousel";
import { Container } from "@/components/Obsidian/Container";
import { useConfig } from "@/hooks/use-config";
import type { ReactBaseViewProps } from "@/types";

type LayoutConfig = {
  groupTitleProperty?: BasesPropertyId;
  groupSubtitleProperty?: BasesPropertyId;
};

export type CarouselConfig = LayoutConfig & CardConfig;

const PADDING = 32;

const useCarouselConfig = (config: BasesViewConfig): CarouselConfig => {
  const cardConfig = useCardConfig(config);
  const layoutConfig = useConfig<LayoutConfig>(config, {
    groupTitleProperty: undefined,
    groupSubtitleProperty: undefined,
  });

  return { ...cardConfig, ...layoutConfig };
}

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

const CarouselView = ({ data, config, isEmbedded }: ReactBaseViewProps) => {
  const viewConfig = useCarouselConfig(config);
  const cardHeight = estimateCardHeight(viewConfig, PADDING);

  return (
    <Container isEmbedded={isEmbedded} style={{ overflowY: "auto" }}>
      {data.groupedData.map((group) => (
        <Carousel
          key={group.key?.toString() ?? ""}
          titleProperty={viewConfig.groupTitleProperty}
          subtitleProperty={viewConfig.groupSubtitleProperty}
          items={group.entries}
          cardConfig={viewConfig}
          config={config}
          minItemWidth={viewConfig.cardSize}
          minItemHeight={cardHeight}
        />
      ))}
    </Container>
  );
};

export default CarouselView;
