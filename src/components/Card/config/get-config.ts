
import type { BasesPropertyId, BasesViewConfig } from "obsidian";

import type { CardConfig } from "@/components/Card/types";

import {
	DEFAULT_BADGE_COLOR,
	DEFAULT_BADGE_ICON,
	DEFAULT_BADGE_PROPERTY,
	DEFAULT_CARD_SIZE,
	DEFAULT_CONTENT_MAX_LENGTH,
	DEFAULT_HOVER_STYLE,
	DEFAULT_IMAGE_ASPECT_RATIO,
	DEFAULT_LAYOUT,
	DEFAULT_OVERLAY_CONTENT_VISIBILITY,
	DEFAULT_REVERSE_CONTENT,
	DEFAULT_SHAPE,
	DEFAULT_SHOW_CONTENT,
	DEFAULT_SHOW_PROPERTY_TITLES,
	DEFAULT_SHOW_TITLE,
	DEFAULT_TILT,
} from "./constants";

export function getCardConfig(config: BasesViewConfig): CardConfig {
	return {
		layout: (config.get("layout") as CardConfig["layout"]) ?? DEFAULT_LAYOUT,
    shape: (config.get("shape") as CardConfig["shape"]) ?? DEFAULT_SHAPE,
		cardSize: (config.get("cardSize") as number) ?? DEFAULT_CARD_SIZE,
		imageAspectRatio: (config.get("imageAspectRatio") as number) ?? DEFAULT_IMAGE_ASPECT_RATIO,
		imageFit: (config.get("imageFit") as CardConfig["imageFit"]) ?? "cover",
		imageProperty: config.get("imageProperty") as BasesPropertyId | undefined,
		reverseContent: (config.get("reverseContent") as boolean) ?? DEFAULT_REVERSE_CONTENT,
		showTitle: (config.get("showTitle") as boolean) ?? DEFAULT_SHOW_TITLE,
		showPropertyTitles: (config.get("showPropertyTitles") as boolean) ?? DEFAULT_SHOW_PROPERTY_TITLES,
		showContent: (config.get("showContent") as boolean) ?? DEFAULT_SHOW_CONTENT,
		contentMaxLength: (config.get("contentMaxLength") as number) ?? DEFAULT_CONTENT_MAX_LENGTH,
		properties: config.getOrder(),
		hoverProperty: config.get("hoverProperty") as BasesPropertyId | undefined,
		hoverStyle: (config.get("hoverStyle") as CardConfig["hoverStyle"]) ?? DEFAULT_HOVER_STYLE,
		overlayContentVisibility: (config.get("overlayContentVisibility") as CardConfig["overlayContentVisibility"]) ?? DEFAULT_OVERLAY_CONTENT_VISIBILITY,
		badgeProperty: config.get("badgeProperty") as BasesPropertyId | undefined ?? DEFAULT_BADGE_PROPERTY,
		badgeIcon: config.get("badgeIcon") as string | undefined ?? DEFAULT_BADGE_ICON,
		badgeColor: config.get("badgeColor") as string | undefined ?? DEFAULT_BADGE_COLOR,
		tilt: (config.get("tilt") as CardConfig["tilt"]) ?? DEFAULT_TILT,
	};
}

export function compareCardConfig(a: CardConfig, b: CardConfig): boolean {
	return (
		a.layout === b.layout &&
		a.shape === b.shape &&
		a.cardSize === b.cardSize &&
		a.imageAspectRatio === b.imageAspectRatio &&
		a.imageFit === b.imageFit &&
		a.imageProperty === b.imageProperty &&
		a.reverseContent === b.reverseContent &&
		a.showTitle === b.showTitle &&
		a.showPropertyTitles === b.showPropertyTitles &&
		a.showContent === b.showContent &&
		a.contentMaxLength === b.contentMaxLength &&
		a.hoverProperty === b.hoverProperty &&
		a.hoverStyle === b.hoverStyle &&
		a.overlayContentVisibility === b.overlayContentVisibility &&
		a.badgeProperty === b.badgeProperty &&
		a.badgeIcon === b.badgeIcon &&
		a.badgeColor === b.badgeColor &&
		a.tilt === b.tilt &&
		a.properties.length === b.properties.length &&
		a.properties.every((p, i) => p === b.properties[i])
	);
}
