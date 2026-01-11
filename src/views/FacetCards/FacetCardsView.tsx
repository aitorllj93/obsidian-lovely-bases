
import type { BasesPropertyId } from "obsidian";

import {
	DEFAULT_CARD_SIZE,
	DEFAULT_HOVER_STYLE,
	DEFAULT_IMAGE_ASPECT_RATIO,
	DEFAULT_LAYOUT,
	DEFAULT_REVERSE_CONTENT,
	DEFAULT_SHOW_PROPERTY_TITLES,
	DEFAULT_SHOW_TITLE,
} from "@/components/Card/constants";
import type { CardConfig } from "@/components/Card/types";
import VirtualGrid from "@/components/VirtualGrid";
import type { ReactBaseViewProps } from "@/types";

export const FACET_CARDS_TYPE_ID = "facet-cards";

const PADDING = 12;

function getCardConfig(config: ReactBaseViewProps["config"]): CardConfig {
	return {
		layout: (config.get("layout") as CardConfig["layout"]) ?? DEFAULT_LAYOUT,
		cardSize: (config.get("cardSize") as number) ?? DEFAULT_CARD_SIZE,
		imageAspectRatio: (config.get("imageAspectRatio") as number) ?? DEFAULT_IMAGE_ASPECT_RATIO,
		imageFit: (config.get("imageFit") as CardConfig["imageFit"]) ?? "cover",
		imageProperty: config.get("imageProperty") as BasesPropertyId | undefined,
		reverseContent: (config.get("reverseContent") as boolean) ?? DEFAULT_REVERSE_CONTENT,
		showTitle: (config.get("showTitle") as boolean) ?? DEFAULT_SHOW_TITLE,
		showPropertyTitles: (config.get("showPropertyTitles") as boolean) ?? DEFAULT_SHOW_PROPERTY_TITLES,
		properties: config.getOrder(),
		hoverProperty: config.get("hoverProperty") as BasesPropertyId | undefined,
		hoverStyle: (config.get("hoverStyle") as CardConfig["hoverStyle"]) ?? DEFAULT_HOVER_STYLE,
	};
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

const FacetCardsView = ({ data, config, isEmbedded }: ReactBaseViewProps) => {
	const cardConfig = getCardConfig(config);
	const estimatedRowHeight = estimateCardHeight(cardConfig) + (PADDING * 2);

	return (
		<div
			className="lovely-bases"
			style={{
				height: "100%",
				width: "100%",
				...(isEmbedded ? { height: "60vh", overflowY: "auto" } : {}),
			}}
		>
			<VirtualGrid
				minItemWidth={cardConfig.cardSize}
        cardConfig={cardConfig}
        config={config}
				items={data.data}
				estimateRowHeight={estimatedRowHeight}
			/>
		</div>
	);
};

export default FacetCardsView;
