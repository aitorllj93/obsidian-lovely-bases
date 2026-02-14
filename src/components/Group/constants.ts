import type { ViewOption } from "obsidian";

import { detectLocale, type NamespacedTranslationKey, translate } from "@/lib/i18n";

import type { GroupConfig } from "./types";

const locale = detectLocale();
const t = (key: NamespacedTranslationKey<'group'>) => translate(locale, 'group', key);

export const DEFAULTS = {
  groupLayout: "sections",
	groupIconProperty: undefined,
	groupColorProperty: undefined,
  groupTitleProperty: undefined,
  groupSubtitleProperty: undefined,
  groupInferPropertiesFromLinkedNotes: false,
  groupClickOnGroup: "expand",
  groupBorder: "none",
  groupShape: "folder",
  groupSpacing: 50,
  groupTitlePosition: "inside",
  groupCounterPosition: "none",
  groupUngroupedItemsDisplay: "group",
} satisfies GroupConfig;

export const GROUP_CONFIG_OPTIONS: ViewOption[] =  [
  {
    type: "group",
    displayName: t("options.layoutAndDisplay.title"),
    items: [
      {
        type: "dropdown",
        displayName: t("options.layoutAndDisplay.groupLayout.title"),
        key: "groupLayout",
        default: DEFAULTS.groupLayout,
        options: {
          sections: t("options.layoutAndDisplay.groupLayout.sections"),
          grid: t("options.layoutAndDisplay.groupLayout.grid"),
        },
      },
      {
        type: "dropdown",
        displayName: t("options.layoutAndDisplay.groupShape.title"),
        key: "groupShape",
        default: DEFAULTS.groupShape,
        shouldHide: (config) => config.get("groupLayout") !== "sections",
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
        shouldHide: (config) => config.get("groupLayout") !== "sections",
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
        shouldHide: (config) => config.get("groupLayout") !== "sections",
        min: 0,
        max: 100,
        step: 1,
      },
      {
        type: "dropdown",
        displayName: t("options.layoutAndDisplay.groupTitlePosition.title"),
        key: "groupTitlePosition",
        default: DEFAULTS.groupTitlePosition,
        shouldHide: (config) => config.get("groupLayout") !== "sections",
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
      {
        type: "dropdown",
        displayName: "groupUngroupedItemsDisplay",
        key: "groupUngroupedItemsDisplay",
        default: DEFAULTS.groupUngroupedItemsDisplay,
        options: {
          group: "group",
          inline: "inline",
          hidden: "hidden",
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
