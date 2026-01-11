import { BasesView, type QueryController } from "obsidian";
import React from "react";
import { createRoot, type Root } from "react-dom/client";

import { ObsidianProvider } from "@/components/Obsidian/Context";
import type { ReactBaseViewProps } from "@/types";

export class ReactBasesView extends BasesView {
	private containerEl: HTMLElement;
	private root: Root;

	constructor(
		public readonly type: string,
		// biome-ignore lint/correctness/noUnusedPrivateClassMembers: Used on onDataUpdated
		private readonly Component: React.ComponentType<ReactBaseViewProps>,
		controller: QueryController,
		private readonly parentEl: HTMLElement,
	) {
		super(controller);
		this.containerEl = parentEl.createDiv(`bases-${this.type}-view-container`);
	}

	public onDataUpdated(): void {
		const { Component } = this;

		// Only create the root once - reuse it for subsequent updates
		if (!this.root) {
			this.root = createRoot(this.containerEl);
		}

		const isDevelopment = process.env.NODE_ENV === "development";
    const isEmbedded = this.isEmbedded();

		const content = (
			<ObsidianProvider
				value={{
					app: this.app,
					component: this,
					containerEl: this.parentEl,
					isEmbedded,
				}}
			>
				<Component
					app={this.app}
					component={this}
					containerEl={this.parentEl}
					config={this.config}
					data={this.data}
					isEmbedded={isEmbedded}
				/>
			</ObsidianProvider>
		);

		this.root.render(isDevelopment ? <React.StrictMode>{content}</React.StrictMode> : content);
	}

	public onunload(): void {
		this.root?.unmount();
		this.containerEl.empty();
	}

  private isEmbedded(): boolean {
    const leafContent = this.containerEl.closest<HTMLElement>(".workspace-leaf-content");
    const leafType = leafContent?.dataset?.type;

    if (leafType) {
      return leafType !== 'bases';
    }

    return !!this.containerEl.closest(
			".internal-embed, .markdown-embed, .cm-embed-block, .markdown-embed-content",
		);
  }
}
