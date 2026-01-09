import type { App, BasesQueryResult, BasesViewConfig, BasesViewFactory, ViewOption } from "obsidian";

export type ReactBaseViewProps = {
	app: App;
	config: BasesViewConfig;
	containerEl: HTMLElement;
	data: BasesQueryResult;
}

export type BaseViewDef = {
  id: string;
  name: string;
  icon: string;
  factory: BasesViewFactory;
  options: () => ViewOption[];
}
