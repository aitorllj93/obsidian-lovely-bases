import { App, BasesQueryResult, BasesViewConfig } from "obsidian";

export type ReactViewProps = {
	app: App;
	config: BasesViewConfig;
	containerEl: HTMLElement;
	data: BasesQueryResult;
}
