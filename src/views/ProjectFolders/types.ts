import type { BasesPropertyId } from "obsidian";

export type ProjectFoldersConfig = {
	/* Data Properties */
	imageProperty?: BasesPropertyId;
	iconProperty?: BasesPropertyId;
	colorProperty?: BasesPropertyId;
	/* Display */
	colorizeFiles?: boolean;
}
