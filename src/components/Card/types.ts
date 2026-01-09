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
