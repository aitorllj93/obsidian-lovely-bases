import { Plugin } from "obsidian";

import type { BaseViewDef } from '@/types';
import VIEWS from "@/views";

export default class LovelyBasesPlugin extends Plugin {
	async onload(): Promise<void> {
    for (const view of VIEWS) {
      this.registerBasesViewFromDefinition(view);
    }
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
