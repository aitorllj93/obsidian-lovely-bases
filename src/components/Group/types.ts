import type { BasesEntry, BasesPropertyId, TFile } from "obsidian";
import type { MouseEventHandler } from "react";

export type GroupItem = {
	title: string;
  file?: TFile;
	entries: BasesEntry[];
	onClick?: MouseEventHandler<HTMLDivElement>;
};

export type GroupBorder = "none" | "solid" | "dotted" | "dashed";
export type GroupShape = "folder" | "notebook";
export type GroupLayout = "sections" | "grid";
export type GroupClickOnGroup = "expand" | "navigate" | "none";
export type GroupTitlePosition = "inside" | "outside" | "none";
export type GroupCounterPosition = "inside" | "outside" | "none";

export type GroupConfig = {
  groupInferPropertiesFromLinkedNotes?: boolean;
  groupClickOnGroup?: GroupClickOnGroup;
  groupBorder?: GroupBorder;
  groupLayout?: GroupLayout;
  groupShape?: GroupShape;
  groupSpacing?: number;
  groupCounterPosition?: GroupCounterPosition;
  groupTitlePosition?: GroupTitlePosition;
  groupTitleProperty?: BasesPropertyId;
  groupSubtitleProperty?: BasesPropertyId;
  groupColorProperty?: BasesPropertyId;
  groupIconProperty?: BasesPropertyId;
};
