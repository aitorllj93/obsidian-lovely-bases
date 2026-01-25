
import type { CardConfig } from "../types";

export function compareCardConfig(a: Partial<CardConfig>, b: Partial<CardConfig>): boolean {
	return (
    /* Internal */
		a.properties.length === b.properties.length &&
		a.properties.every((p, i) => p === b.properties[i]) &&

    /* Layout & Display */
		a.layout === b.layout &&
		a.overlayContentVisibility === b.overlayContentVisibility &&
		a.cardSize === b.cardSize &&
		a.shape === b.shape &&
		a.tilt === b.tilt &&

    /* Image */
		a.imageProperty === b.imageProperty &&
		a.imageAspectRatio === b.imageAspectRatio &&
		a.imageFit === b.imageFit &&
		a.reverseContent === b.reverseContent &&

    /* Content */
    a.showTitle === b.showTitle &&
		a.showPropertyTitles === b.showPropertyTitles &&
		a.showContent === b.showContent &&
		a.contentMaxLength === b.contentMaxLength &&

    /* Appearance */
    a.titleFont === b.titleFont &&
    a.contentFont === b.contentFont &&
    a.badgesFont === b.badgesFont &&
    a.backgroundColorProperty === b.backgroundColorProperty &&
    a.backgroundColorApplyTo === b.backgroundColorApplyTo &&
    a.iconProperty === b.iconProperty &&

    /* Badges */
    a.badgeProperty === b.badgeProperty &&
		a.badgeIcon === b.badgeIcon &&
		a.badgeColor === b.badgeColor &&

    /* Interactivity */
    a.linkProperty === b.linkProperty &&
    a.hoverProperty === b.hoverProperty &&
		a.hoverStyle === b.hoverStyle
	);
}
