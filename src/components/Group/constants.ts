import type { ViewOption } from "obsidian";

import { detectLocale, type NamespacedTranslationKey, translate } from "@/lib/i18n";

import type { GroupConfig } from "./types";

const locale = detectLocale();
const t = (key: NamespacedTranslationKey<'group'>) => translate(locale, 'group', key);

export const DEFAULTS = {
	groupIconProperty: undefined,
	groupColorProperty: undefined,
groupTitleProperty: undefined,
  groupSubtitleProperty: undefined,
  groupInferPropertiesFromLinkedNotes: false,
  groupClickOnGroup: "expand",
  groupBorder: "none",
  groupShape: "folder",
  groupSpacing: 0,
  groupTitlePosition: "inside",
  groupCounterPosition: "none",
} satisfies GroupConfig;

export const GROUP_CONFIG_OPTIONS: ViewOption[] =  [
  {
    type: "group",
    displayName: t("options.layoutAndDisplay.title"),
    items: [
      {
        type: "dropdown",
        displayName: t("options.layoutAndDisplay.groupShape.title"),
        key: "groupShape",
        default: DEFAULTS.groupShape,
        options: {
          folder: t("options.layoutAndDisplay.groupShape.folder"),
          notebook: t("options.layoutAndDisplay.groupShape.notebook"),
        },
      },
      {
        type: "dropdown",
        displayName: t("options.layoutAndDisplay.groupBorder.title"),
        key: "groupBorder",
        default: DEFAULTS.groupBorder,
        options: {
          none: t("options.layoutAndDisplay.groupBorder.none"),
          solid: t("options.layoutAndDisplay.groupBorder.solid"),
          dotted: t("options.layoutAndDisplay.groupBorder.dotted"),
          dashed: t("options.layoutAndDisplay.groupBorder.dashed"),
        },
      },
      {
        type: "slider",
        displayName: t("options.layoutAndDisplay.groupSpacing.title"),
        key: "groupSpacing",
        default: DEFAULTS.groupSpacing,
        min: 0,
        max: 100,
        step: 1,
      },
      {
        type: "dropdown",
        displayName: t("options.layoutAndDisplay.groupTitlePosition.title"),
        key: "groupTitlePosition",
        default: DEFAULTS.groupTitlePosition,
        options: {
          inside: t("options.layoutAndDisplay.groupTitlePosition.inside"),
          outside: t("options.layoutAndDisplay.groupTitlePosition.outside"),
          none: t("options.layoutAndDisplay.groupTitlePosition.none"),
        },
      },
      {
        type: "dropdown",
        displayName: t("options.layoutAndDisplay.groupCounterPosition.title"),
        key: "groupCounterPosition",
        default: DEFAULTS.groupCounterPosition,
        options: {
          inside: t("options.layoutAndDisplay.groupCounterPosition.inside"),
          outside: t("options.layoutAndDisplay.groupCounterPosition.outside"),
          none: t("options.layoutAndDisplay.groupCounterPosition.none"),
        },
      },
    ],
  },
  {
    type: "group",
    displayName: t("options.appearance.title"),
    items: [
      {
        type: "property",
        displayName: t("options.appearance.colorProperty.title"),
        key: "groupColorProperty",
      },
      {
        type: "property",
        displayName: t("options.appearance.iconProperty.title"),
        key: "groupIconProperty",
      },
      {
        type: "toggle",
        displayName: t("options.appearance.inferPropertiesFromLinkedNotes.title"),
        key: "groupInferPropertiesFromLinkedNotes",
        default: DEFAULTS.groupInferPropertiesFromLinkedNotes,
      },
    ],
  },
  {
    type: "group",
    displayName: t("options.behavior.title"),
    items: [
      {
        type: "dropdown",
        displayName: t("options.behavior.clickOnGroup.title"),
        key: "groupClickOnGroup",
        default: DEFAULTS.groupClickOnGroup,
        options: {
          expand: t("options.behavior.clickOnGroup.expand"),
          navigate: t("options.behavior.clickOnGroup.navigate"),
          none: t("options.behavior.clickOnGroup.none"),
        },
      },
    ],
  },
]
