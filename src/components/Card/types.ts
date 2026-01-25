import type { BasesEntry, BasesPropertyId, TFile, Value } from "obsidian";

export type ItemProperty = {
	displayName: string;
	id: BasesPropertyId;
	value: Value;
	isEmpty: boolean;
}

export type CardItem = {
	id: string;
	image?: string;
	title: string;
	entry: BasesEntry;
	file: TFile;
	properties: ItemProperty[];
	hoverProperty: ItemProperty | null;
}

export type CardConfig = {
  /* Layout & Display */
	layout: "vertical" | "horizontal" | "overlay" | "polaroid";
	overlayContentVisibility: "always" | "hover";
	cardSize: number;
	shape: "square" | "circle" | "rounded";
	tilt: "none" | "alternating";
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
