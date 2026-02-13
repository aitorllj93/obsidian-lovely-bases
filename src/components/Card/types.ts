import type { BasesPropertyId } from "obsidian";

export type CardConfig = {
  /* Layout & Display */
	layout: "vertical" | "horizontal" | "overlay" | "polaroid";
	overlayContentVisibility: "always" | "hover";
	cardSize: number;
	shape: "square" | "circle" | "rounded";
	tilt: "none" | "left" | "right" | "alternating";
  /* Image */
	imageProperty: BasesPropertyId | undefined;
	imageAspectRatio: number;
	imageFit: "cover" | "contain";
	reverseContent: boolean;
  /* Content */
	showTitle: boolean;
	showPropertyTitles: boolean;
	showContent: boolean;
	contentMaxLength: number;
  contentMaxHeight: number;
  /* Appearance */
  titleFont: string | undefined;
  contentFont: string | undefined;
  badgesFont: string | undefined;
  backgroundColorProperty: BasesPropertyId | undefined;
  backgroundColorApplyTo: "image" | "content" | "both";
  iconProperty: BasesPropertyId | undefined;
  /* Badges */
	badgeProperty: BasesPropertyId | undefined;
	badgeIcon: string | undefined;
	badgeColor: string | undefined;
  /* Interactivity */
  linkProperty: BasesPropertyId | undefined;
	hoverStyle: "overlay" | "tooltip" | "none";
	hoverProperty: BasesPropertyId | undefined;
  /** Internal */
	properties: BasesPropertyId[];
}

export type CardColors = {
  imageBackground: string | null;
  imageForeground: string | null;
  contentBackground: string | null;
  titleForeground: string | null;
  contentForeground: string | null;
  linkForeground: string | null;
}

export type CardImage = {
  url?: string;
  isColor?: boolean;
}
