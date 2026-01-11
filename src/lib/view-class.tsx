import { BasesView, type QueryController } from "obsidian";
import React from "react";
import { createRoot, type Root } from "react-dom/client";

import { ObsidianProvider } from "@/components/Obsidian/Context";
import { AppProvider } from "@/contexts/app";
import { ConfigProvider } from "@/contexts/config";
import type { ReactBaseViewProps } from "@/types";
import { ContainerElProvider } from "@/contexts/container-el";

export class ReactBasesView extends BasesView {
	private containerEl: HTMLElement;
	private root: Root;

	private isEmbedded: boolean;

	constructor(
		public readonly type: string,
		// biome-ignore lint/correctness/noUnusedPrivateClassMembers: Used on onDataUpdated
		private readonly Component: React.ComponentType<ReactBaseViewProps>,
		controller: QueryController,
		private readonly parentEl: HTMLElement,
	) {
		super(controller);
		this.containerEl = parentEl.createDiv(`bases-${this.type}-view-container`);
		this.isEmbedded = !!this.containerEl.closest(
			".internal-embed, .markdown-embed, .cm-embed-block, .markdown-embed-content",
		);
	}

	public onDataUpdated(): void {
		const { Component } = this;

		// Only create the root once - reuse it for subsequent updates
		if (!this.root) {
			this.root = createRoot(this.containerEl);
		}

		this.root.render(
			<React.StrictMode>
				<ObsidianProvider
					value={{
						app: this.app,
						component: this,
						config: this.config,
						containerEl: this.parentEl,
						data: this.data,
						isEmbedded: this.isEmbedded,
					}}
				>
					<AppProvider value={this.app}>
						<ConfigProvider value={this.config}>
							<ContainerElProvider value={this.parentEl}>
								<Component
									app={this.app}
									component={this}
									containerEl={this.parentEl}
									config={this.config}
									data={this.data}
									isEmbedded={this.isEmbedded}
								/>
							</ContainerElProvider>
						</ConfigProvider>
					</AppProvider>
				</ObsidianProvider>
			</React.StrictMode>,
		);
	}

	public onunload(): void {
		this.root?.unmount();
		this.containerEl.empty();
	}
}
