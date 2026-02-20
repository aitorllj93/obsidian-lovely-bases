import type { BasesPropertyId } from "obsidian";

import type { MediaObject } from "@/lib/media";
import type { ExternalMediaObject } from "@/lib/external-media";

export type CardConfig = {
  /* Layout & Display */
	layout: "vertical" | "horizontal" | "overlay" | "polaroid";
	overlayContentVisibility: "always" | "hover";
	cardSize: number;
	shape: "square" | "circle" | "rounded";
	tilt: "none" | "left" | "right" | "alternating";
  spacing: number;
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
  adaptToSize: boolean;
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
  mediaBackground?: string;
  mediaForeground?: string;
  contentBackground?: string;
  titleForeground?: string;
  contentForeground?: string;
  linkForeground?: string;
}

export type CardImage = {
  url?: string;
  isColor?: boolean;
}

export type CardMediaType = MediaObject['type'] | ExternalMediaObject['type'];
export type CardMedia = MediaObject | ExternalMediaObject;
