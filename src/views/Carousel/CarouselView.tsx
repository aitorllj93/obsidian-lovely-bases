
import { getCardConfig } from "@/components/Card/config/get-config";
import type { CardConfig } from "@/components/Card/types";
import Carousel from "@/components/Carousel";
import { Container } from "@/components/Obsidian/Container";
import type { ReactBaseViewProps } from "@/types";

export type CarouselConfig = CardConfig & {
	title?: string;
	subtitle?: string;
};

const PADDING = 32;

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
	const cardConfig = getCardConfig(config);
	const cardHeight = estimateCardHeight(cardConfig, PADDING);

	const title = config.get("title") as string | undefined;
	const subtitle = config.get("subtitle") as string | undefined;

	return (
		<Container
      isEmbedded={isEmbedded}
      style={{ overflowY: "auto" }}
		>
			<Carousel
				title={title}
				subtitle={subtitle}
				items={data.data}
				cardConfig={cardConfig}
				config={config}
				minItemWidth={cardConfig.cardSize}
				minItemHeight={cardHeight}
			/>
		</Container>
	);
};

export default CarouselView;
