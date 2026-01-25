import type { ViewOption } from "obsidian";

import {
	detectLocale,
	type NamespacedTranslationKey,
	translate,
} from "@/lib/i18n";

import type { ProjectFoldersConfig } from "./types";

const locale = detectLocale();
const t = (key: NamespacedTranslationKey<"projectFolders">) =>
	translate(locale, "projectFolders", key);

export const DEFAULTS: ProjectFoldersConfig = {
	/* Data Properties */
	imageProperty: undefined,
	iconProperty: undefined,
	colorProperty: undefined,
	/* Display */
	colorizeFiles: false,
};

export const PROJECT_FOLDERS_OPTIONS: ViewOption[] = [
	{
		type: "group",
		displayName: t("options.dataProperties.title"),
		items: [
			{
				type: "property",
				displayName: t("options.dataProperties.imageProperty.title"),
				key: "imageProperty",
				default: DEFAULTS.imageProperty,
			},
			{
				type: "property",
				displayName: t("options.dataProperties.iconProperty.title"),
				key: "iconProperty",
				default: DEFAULTS.iconProperty,
			},
			{
				type: "property",
				displayName: t("options.dataProperties.colorProperty.title"),
				key: "colorProperty",
				default: DEFAULTS.colorProperty,
			},
		],
	},
	{
		type: "group",
		displayName: t("options.display.title"),
		items: [
			{
				type: "toggle",
				displayName: t("options.display.colorizeFiles.title"),
				key: "colorizeFiles",
				default: DEFAULTS.colorizeFiles,
			},
		],
	},
];
