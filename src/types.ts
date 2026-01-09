import type { App, BasesQueryResult, BasesViewConfig, BasesViewFactory, Component, ViewOption } from "obsidian";

export type ReactBaseViewProps = {
	app: App;
  component: Component;
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
