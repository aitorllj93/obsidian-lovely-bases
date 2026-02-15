
import type { FacetsConfig } from "@/components/Facets/config";

export const DEFAULT_PADDING = 12;

const TITLE_HEIGHT = 30;
const PROPERTY_TITLE_HEIGHT = 15;
const PROPERTY_VALUE_HEIGHT = 30;

export function estimateCardHeight(facetsConfig: FacetsConfig, padding = DEFAULT_PADDING): number {
	let contentHeight = padding;

	if (facetsConfig.titlePosition === 'inside') {
		contentHeight += TITLE_HEIGHT;
	}

	if (facetsConfig.properties.length > 0) {
		let propertyHeight = PROPERTY_VALUE_HEIGHT;
		if (facetsConfig.contentShowPropertyTitles) {
			propertyHeight += PROPERTY_TITLE_HEIGHT;
		}
		contentHeight += propertyHeight * facetsConfig.properties.length;
	}

  if (facetsConfig.contentShowMarkdown) {
    contentHeight += facetsConfig.contentMarkdownMaxHeight;
  }

  if (
    facetsConfig.cardLayout !== "horizontal" &&
    facetsConfig.imageProperty &&
    facetsConfig.imageAspectRatio
  ) {
    contentHeight += facetsConfig.imageAspectRatio * facetsConfig.layoutItemSize;
  }

	return contentHeight;
}
