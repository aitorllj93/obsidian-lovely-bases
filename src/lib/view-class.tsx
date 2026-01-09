import { BasesView, type QueryController } from "obsidian";
import React from "react";
import { createRoot, type Root } from "react-dom/client";

import type { ReactBaseViewProps } from "@/types";
import { ObsidianProvider } from "@/components/Obsidian/Context";

export class ReactBasesView extends BasesView {
	// private containerEl: HTMLElement;
	private root: Root;

	constructor(
		public readonly type: string,
		// biome-ignore lint/correctness/noUnusedPrivateClassMembers: Used on onDataUpdated
		private readonly Component: React.ComponentType<ReactBaseViewProps>,
		controller: QueryController,
		private readonly parentEl: HTMLElement,
	) {
		super(controller);
		// this.containerEl = parentEl.createDiv(`bases-${this.type}-view-container`);
	}

	public onDataUpdated(): void {
		const { Component } = this;
		this.root?.unmount();
		this.parentEl.empty();
		this.root = createRoot(this.parentEl);

		this.root.render(
			<React.StrictMode>
				<ObsidianProvider
					value={{
						app: this.app,
						component: this,
						config: this.config,
						containerEl: this.parentEl,
						data: this.data,
					}}
				>
					<Component
						app={this.app}
						component={this}
						containerEl={this.parentEl}
						config={this.config}
						data={this.data}
					/>
				</ObsidianProvider>
			</React.StrictMode>,
		);
	}

	public onunload(): void {
		this.root?.unmount();
		this.parentEl.empty();
	}
}
