import { addIcon, Plugin } from "obsidian";

import type { BaseViewDef } from '@/types';

import ICONS from "@/icons";
import VIEWS from "@/views";

export default class LovelyBasesPlugin extends Plugin {
	async onload(): Promise<void> {
    for (const [id, content] of ICONS) {
      this.registerCustomIcon(id, content)
    }
    for (const view of VIEWS) {
      this.registerBasesViewFromDefinition(view);
    }
	}

  private registerCustomIcon(iconId: string, svgContent: string): void {
    addIcon(
			iconId,
			svgContent
		);
  }

  private registerBasesViewFromDefinition(def: BaseViewDef): void {
    this.registerBasesView(def.id, {
      name: def.name,
      icon: def.icon,
      factory: def.factory,
      options: def.options,
    });
  }
}
