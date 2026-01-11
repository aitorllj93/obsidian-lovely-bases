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
	layout: "vertical" | "horizontal";
	cardSize: number;
	imageAspectRatio: number;
	imageFit: "cover" | "contain";
	imageProperty: BasesPropertyId | undefined;
	reverseContent: boolean;
	showTitle: boolean;
	showPropertyTitles: boolean;
	properties: BasesPropertyId[];
	hoverProperty: BasesPropertyId | undefined;
	hoverStyle: "overlay" | "tooltip" | "none";
}
