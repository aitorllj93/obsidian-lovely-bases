import type { ViewOption } from "obsidian";

import { detectLocale, type NamespacedTranslationKey, translate } from "@/lib/i18n";

import type { CardConfig } from "./types";

const locale = detectLocale();
const t = (key: NamespacedTranslationKey<'card'>) => translate(locale, 'card', key);

export const DEFAULTS = {
  /* Layout & Display */
  layout: "vertical",
  overlayContentVisibility: "always",
  cardSize: 400,
  shape: "square",
  tilt: "none",
  /* Image */
  imageProperty: undefined,
  imageAspectRatio: 1.5,
  imageFit: "cover",
  reverseContent: false,
  /* Content */
  showTitle: true,
  showPropertyTitles: true,
  showContent: false,
  contentMaxLength: 200,
  /* Appearance */
  titleFont: undefined,
  contentFont: undefined,
  badgesFont: undefined,
  backgroundColorProperty: undefined,
  backgroundColorApplyTo: "image",
  iconProperty: undefined,
  /* Badges */
  badgeProperty: undefined,
  badgeIcon: undefined,
  badgeColor: undefined,
  /* Interactivity */
  linkProperty: undefined,
  hoverStyle: "none",
  hoverProperty: null,
  /* Internal */
  properties: [],
} satisfies CardConfig;



export const CARD_CONFIG_OPTIONS: ViewOption[] =  [
  {
    type: "group",
    displayName: t("options.layoutAndDisplay.title"),
    items: [
      {
        type: "dropdown",
        displayName: t("options.layoutAndDisplay.layout.title"),
        key: "layout",
        default: DEFAULTS.layout,
        options: {
          horizontal: t("options.layoutAndDisplay.layout.horizontal"),
          vertical: t("options.layoutAndDisplay.layout.vertical"),
          overlay: t("options.layoutAndDisplay.layout.overlay"),
          polaroid: t("options.layoutAndDisplay.layout.polaroid"),
        },
      },
      {
        type: "dropdown",
        displayName: t("options.layoutAndDisplay.contentVisibility.title"),
        key: "overlayContentVisibility",
        default: DEFAULTS.overlayContentVisibility,
        shouldHide: (config) => config.get("layout") !== "overlay",
        options: {
          always: t("options.layoutAndDisplay.contentVisibility.always"),
          hover: t("options.layoutAndDisplay.contentVisibility.hover"),
        },
      },
      {
        type: "slider",
        displayName: t("options.layoutAndDisplay.cardSize.title"),
        key: "cardSize",
        default: DEFAULTS.cardSize,
        min: 50,
        max: 800,
        step: 10,
      },
      {
        type: "dropdown",
        displayName: t("options.layoutAndDisplay.shape.title"),
        key: "shape",
        default: DEFAULTS.shape,
        options: {
          square: t("options.layoutAndDisplay.shape.square"),
          circle: t("options.layoutAndDisplay.shape.circle"),
          rounded: t("options.layoutAndDisplay.shape.rounded"),
        },
      },
      {
        type: "dropdown",
        displayName: t("options.layoutAndDisplay.tilt.title"),
        key: "tilt",
        default: DEFAULTS.tilt,
        options: {
          none: t("options.layoutAndDisplay.tilt.none"),
          alternating: t("options.layoutAndDisplay.tilt.alternating"),
        },
      },
    ],
  },
  {
    type: "group",
    displayName: t("options.image.title"),
    items: [
      {
        type: "property",
        displayName: t("options.image.imageProperty.title"),
        key: "imageProperty",
        default: DEFAULTS.imageProperty,
      },
      {
        type: "slider",
        displayName: t("options.image.imageAspectRatio.title"),
        key: "imageAspectRatio",
        default: DEFAULTS.imageAspectRatio,
        shouldHide: (config) => config.get("imageProperty") === undefined,
        min: 0.25,
        max: 2.5,
        step: 0.05,
      },
      {
        type: "dropdown",
        displayName: t("options.image.imageFit.title"),
        key: "imageFit",
        default: DEFAULTS.imageFit,
        shouldHide: (config) => config.get("imageProperty") === undefined,
        options: {
          cover: t("options.image.imageFit.cover"),
          contain: t("options.image.imageFit.contain"),
        },
      },
      {
        type: "toggle",
        displayName: t("options.image.reverseContent.title"),
        key: "reverseContent",
        default: DEFAULTS.reverseContent,
        shouldHide: (config) => config.get("imageProperty") === undefined,
      },
    ],
  },
  {
    type: "group",
    displayName: t("options.content.title"),
    items: [
      {
        type: "toggle",
        displayName: t("options.content.showTitle.title"),
        key: "showTitle",
        default: DEFAULTS.showTitle,
      },
      {
        type: "toggle",
        displayName: t("options.content.showPropertyTitles.title"),
        key: "showPropertyTitles",
        default: DEFAULTS.showPropertyTitles,
      },
      {
        type: "toggle",
        displayName: t("options.content.showContent.title"),
        key: "showContent",
        default: DEFAULTS.showContent,
      },
      {
        type: "slider",
        displayName: t("options.content.contentMaxLength.title"),
        key: "contentMaxLength",
        default: DEFAULTS.contentMaxLength,
        min: 0,
        max: 1000,
        step: 10,
        shouldHide: (config) => config.get("showContent") === false,
      },
    ],
  },
  {
    type: "group",
    displayName: t("options.appearance.title"),
    items: [
      {
        type: "text",
        displayName: t("options.appearance.titleFont.title"),
        key: "titleFont"
      },
      {
        type: "text",
        displayName: t("options.appearance.contentFont.title"),
        key: "contentFont"
      },
      {
        type: "text",
        displayName: t("options.appearance.badgesFont.title"),
        key: "badgesFont"
      },
      {
        type: "property",
        displayName: t("options.appearance.backgroundColorProperty.title"),
        key: "backgroundColorProperty",
      },
      {
        type: "dropdown",
        displayName: t("options.appearance.backgroundColorApplyTo.title"),
        shouldHide: (config) => !config.get('backgroundColorProperty'),
        key: "backgroundColorApplyTo",
        default: DEFAULTS.backgroundColorApplyTo,
        options: {
          image: t("options.appearance.backgroundColorApplyTo.image"),
          content: t("options.appearance.backgroundColorApplyTo.content"),
          both: t("options.appearance.backgroundColorApplyTo.both"),
        },
      },
      {
        type: "property",
        displayName: t("options.appearance.iconProperty.title"),
        key: "iconProperty",
      },
    ],
  },
  {
    type: "group",
    displayName: t("options.badges.title"),
    items: [
      {
        type: "property",
        displayName: t("options.badges.badgeProperty.title"),
        key: "badgeProperty",
      },
      {
        type: "text",
        displayName: t("options.badges.badgeIcon.title"),
        key: "badgeIcon",
        placeholder: "star, heart, check...",
        shouldHide: (config) => config.get("badgeProperty") === undefined,
      },
      {
        type: "text",
        displayName: t("options.badges.badgeColor.title"),
        key: "badgeColor",
        placeholder: "#D0A215",
        shouldHide: (config) => config.get("badgeProperty") === undefined,
      },
    ],
  },
  {
    type: "group",
    displayName: t("options.interactivity.title"),
    items: [
      {
        type: "property",
        displayName: t("options.interactivity.linkProperty.title"),
        key: "linkProperty",
        default: DEFAULTS.linkProperty,
      },
      {
        type: "dropdown",
        displayName: t("options.interactivity.hoverStyle.title"),
        key: "hoverStyle",
        default: DEFAULTS.hoverStyle,
        options: {
          none: t("options.interactivity.hoverStyle.none"),
          overlay: t("options.interactivity.hoverStyle.overlay"),
          // tooltip: "Tooltip",
        },
      },
      {
        type: "property",
        displayName: t("options.interactivity.hoverProperty.title"),
        key: "hoverProperty",
        default: DEFAULTS.hoverProperty,
        shouldHide: (config) => config.get("hoverStyle") === "none" || config.get("hoverStyle") === undefined,
      },
    ],
  },
]
