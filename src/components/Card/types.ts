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
	layout: "vertical" | "horizontal" | "overlay" | "polaroid";
	shape: "square" | "circle" | "rounded";
	cardSize: number;
	imageAspectRatio: number;
	imageFit: "cover" | "contain";
	imageProperty: BasesPropertyId | undefined;
	reverseContent: boolean;
	showTitle: boolean;
	showPropertyTitles: boolean;
	showContent: boolean;
	contentMaxLength: number;
	properties: BasesPropertyId[];
	hoverProperty: BasesPropertyId | undefined;
	hoverStyle: "overlay" | "tooltip" | "none";
	overlayContentVisibility: "always" | "hover";
	badgeProperty: BasesPropertyId | undefined;
	badgeIcon: string | undefined;
	badgeColor: string | undefined;
}
