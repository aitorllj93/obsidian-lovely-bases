import { addIcon, Plugin } from "obsidian";

import ICONS from "@/icons";
import  { type LovelyBasesSettings, SETTINGS_DEFAULTS } from "@/settings";
import type { BaseViewDef } from '@/types';
import VIEWS from "@/views";

const DELAY_FOR_RELEASE_NOTES = 1500;

export default class LovelyBasesPlugin extends Plugin {
	settings: LovelyBasesSettings;

	async onload(): Promise<void> {
    await this.loadSettings();

    for (const [id, content] of ICONS) {
      this.registerIcon(id, content)
    }
    for (const view of VIEWS) {
      this.registerBasesViewFromDefinition(view);
    }

    this.checkForVersionUpdate();
	}

  private registerIcon(iconId: string, svgContent: string): void {
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

  private async checkForVersionUpdate(): Promise<void> {
		try {
			const currentVersion = this.manifest.version;
			let lastSeenVersion = this.settings.lastSeenVersion;

      if (!lastSeenVersion) {
        this.settings.lastSeenVersion = lastSeenVersion = currentVersion;
        await this.saveSettings();
      }

      if (lastSeenVersion === currentVersion) {
        return;
      }

      if (!this.settings.showReleaseNotes) {
        return;
      }

      setTimeout(async () => {
        await this.showReleaseNotes();
        this.settings.lastSeenVersion = currentVersion;
        await this.saveSettings();
      }, DELAY_FOR_RELEASE_NOTES);
		} catch (error) {
			console.error("Error checking for version update:", error);
		}
	}

  private async loadSettings() {
		const data = await this.loadData();
    this.settings = {
      ...SETTINGS_DEFAULTS,
      ...data,
    }
  }

  private async saveSettings() {
    await this.saveData(this.settings);
  }

  private async showReleaseNotes() {
    console.log('showReleaseNotes');

  }
}
