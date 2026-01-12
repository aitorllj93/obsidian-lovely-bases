
import type { BasesPropertyId, BasesViewConfig } from "obsidian";

import type { CardConfig } from "@/components/Card/types";

import {
	DEFAULT_CARD_SIZE,
	DEFAULT_HOVER_STYLE,
	DEFAULT_IMAGE_ASPECT_RATIO,
	DEFAULT_LAYOUT,
	DEFAULT_REVERSE_CONTENT,
	DEFAULT_SHOW_PROPERTY_TITLES,
	DEFAULT_SHOW_TITLE,
} from "./constants";

export function getCardConfig(config: BasesViewConfig): CardConfig {
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

export function compareCardConfig(a: CardConfig, b: CardConfig): boolean {
	return (
		a.layout === b.layout &&
		a.cardSize === b.cardSize &&
		a.imageAspectRatio === b.imageAspectRatio &&
		a.imageFit === b.imageFit &&
		a.imageProperty === b.imageProperty &&
		a.reverseContent === b.reverseContent &&
		a.showTitle === b.showTitle &&
		a.showPropertyTitles === b.showPropertyTitles &&
		a.hoverProperty === b.hoverProperty &&
		a.hoverStyle === b.hoverStyle &&
		a.properties.length === b.properties.length &&
		a.properties.every((p, i) => p === b.properties[i])
	);
}
