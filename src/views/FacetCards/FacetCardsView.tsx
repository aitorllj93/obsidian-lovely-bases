
import { getCardConfig } from "@/components/Card/config/get-config";
import type { CardConfig } from "@/components/Card/types";
import { Container } from "@/components/Container";
import VirtualGrid from "@/components/VirtualGrid";
import type { ReactBaseViewProps } from "@/types";

export const FACET_CARDS_TYPE_ID = "facet-cards";

const PADDING = 12;

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
	const cardConfig = getCardConfig(config);
	const estimatedRowHeight = estimateCardHeight(cardConfig) + (PADDING * 2);

	return (
    <Container isEmbedded={isEmbedded} embeddedStyles={{ height: "60vh", overflowY: "auto" }}>
			<VirtualGrid
				minItemWidth={cardConfig.cardSize}
        cardConfig={cardConfig}
        config={config}
				items={data.data}
				estimateRowHeight={estimatedRowHeight}
			/>
		</Container>
	);
};

export default FacetCardsView;
