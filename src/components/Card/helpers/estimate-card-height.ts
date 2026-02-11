
import type { CardConfig } from "../types";

export const DEFAULT_PADDING = 12;

const TITLE_HEIGHT = 30;
const PROPERTY_TITLE_HEIGHT = 15;
const PROPERTY_VALUE_HEIGHT = 30;

export function estimateCardHeight(cardConfig: CardConfig, padding = DEFAULT_PADDING): number {
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

  let verticalImageHeight = 0;

  if (cardConfig.imageProperty && cardConfig.imageAspectRatio) {
    verticalImageHeight = cardConfig.imageAspectRatio * cardConfig.cardSize;
  }

	return cardConfig.layout === "horizontal"
		? contentHeight
		: verticalImageHeight + contentHeight;
}
