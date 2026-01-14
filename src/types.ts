import type { BasesQueryResult, BasesViewConfig, BasesViewFactory, ViewOption } from "obsidian";

export type ReactBaseViewProps = {
	config: BasesViewConfig;
	data: BasesQueryResult;
  isEmbedded: boolean;
}

export type BaseViewDef = {
  id: string;
  name: string;
  icon: string;
  factory: BasesViewFactory;
  options: () => ViewOption[];
}
