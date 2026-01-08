import { BasesView, QueryController } from "obsidian";
import React from "react";
import { createRoot, Root } from "react-dom/client";

import { ReactViewProps } from "@/types";

export class ReactView extends BasesView {
	private containerEl: HTMLElement;
	private root: Root;

	constructor(
		public readonly type: string,
		private readonly Component: React.ComponentType<ReactViewProps>,
		controller: QueryController,
		parentEl: HTMLElement
	) {
		super(controller);
		this.containerEl = parentEl.createDiv(`bases-${this.type}-view-container`);
	}

	public onDataUpdated(): void {
		const { Component } = this;
		this.root?.unmount();
		this.containerEl.empty();
		this.root = createRoot(this.containerEl);

		this.root.render(
			<React.StrictMode>
				<Component app={this.app} containerEl={this.containerEl} config={this.config} data={this.data} />
			</React.StrictMode>
		);
	}
}
