import type { ViewOption } from "obsidian";

import { detectLocale,  type NamespacedTranslationKey, translate } from "@/lib/i18n";

import { HEATMAP_CALENDAR_CONFIG_DEFAULTS } from './defaults';

const locale = detectLocale();
const tColors = (key: NamespacedTranslationKey<'colors'>) => translate(locale, 'colors', key);
const t = (key: NamespacedTranslationKey<'heatmapCalendar'>) => translate(locale, 'heatmapCalendar', key);

export const HEATMAP_CALENDAR_OPTIONS: ViewOption[] = [
  {
    type: "group",
    displayName: t("options.data.title"),
    items: [
      {
        type: "property",
        displayName: t("options.data.dateProperty.title"),
        key: "dateProperty",
        default: HEATMAP_CALENDAR_CONFIG_DEFAULTS.dateProperty,
      },
      {
        type: "property",
        displayName: t("options.data.trackProperty.title"),
        key: "trackProperty",
        default: HEATMAP_CALENDAR_CONFIG_DEFAULTS.trackProperty,
      },
      {
        type: "dropdown",
        displayName: t("options.data.trackType.title"),
        key: "trackType",
        default: HEATMAP_CALENDAR_CONFIG_DEFAULTS.trackType,
        options: {
          "": t("options.data.trackType.autoDetect"),
          number: t("options.data.trackType.number"),
          boolean: t("options.data.trackType.boolean"),
          text: t("options.data.trackType.text"),
          list: t("options.data.trackType.list"),
        },
      },
    ],
  },
  {
    type: "group",
    displayName: t("options.dateRange.title"),
    items: [
      {
        type: "text",
        displayName: t("options.dateRange.startDate.title"),
        key: "startDate",
        default: HEATMAP_CALENDAR_CONFIG_DEFAULTS.startDate,
        placeholder: t("options.dateRange.startDate.placeholder"),
      },
      {
        type: "text",
        displayName: t("options.dateRange.endDate.title"),
        key: "endDate",
        default: HEATMAP_CALENDAR_CONFIG_DEFAULTS.endDate,
        placeholder: t("options.dateRange.endDate.placeholder"),
      },
    ],
  },
  {
    type: "group",
    displayName: t("options.display.title"),
    items: [
      {
        type: "dropdown",
        displayName: t("options.display.layout.title"),
        key: "layout",
        default: HEATMAP_CALENDAR_CONFIG_DEFAULTS.layout,
        options: {
          horizontal: t("options.display.layout.horizontal"),
          vertical: t("options.display.layout.vertical"),
        },
      },
      {
        type: "dropdown",
        displayName: t("options.display.viewMode.title"),
        key: "viewMode",
        default: HEATMAP_CALENDAR_CONFIG_DEFAULTS.viewMode,
        options: {
          "week-grid": t("options.display.viewMode.week-grid"),
          "month-grid": t("options.display.viewMode.month-grid"),
        },
      },
      {
        type: "toggle",
        displayName: t("options.display.showDayLabels.title"),
        key: "showDayLabels",
        default: HEATMAP_CALENDAR_CONFIG_DEFAULTS.showDayLabels,
      },
      {
        type: "toggle",
        displayName: t("options.display.showMonthLabels.title"),
        key: "showMonthLabels",
        default: HEATMAP_CALENDAR_CONFIG_DEFAULTS.showMonthLabels,
      },
      {
        type: "toggle",
        displayName: t("options.display.showYearLabels.title"),
        key: "showYearLabels",
        default: HEATMAP_CALENDAR_CONFIG_DEFAULTS.showYearLabels,
      },
      {
        type: "toggle",
        displayName: t("options.display.showLegend.title"),
        key: "showLegend",
        default: HEATMAP_CALENDAR_CONFIG_DEFAULTS.showLegend,
      },
    ],
  },
  {
    type: "group",
    displayName: t("options.valueRange.title"),
    items: [
      {
        type: "slider",
        displayName: t("options.valueRange.minValue.title"),
        key: "minValue",
        default: HEATMAP_CALENDAR_CONFIG_DEFAULTS.minValue,
        min: 0,
        max: 100,
        step: 1,
      },
      {
        type: "slider",
        displayName: t("options.valueRange.maxValue.title"),
        key: "maxValue",
        default: HEATMAP_CALENDAR_CONFIG_DEFAULTS.maxValue,
        min: 0,
        max: 100,
        step: 1,
      },
    ],
  },
  {
    type: "group",
    displayName: t("options.appearance.title"),
    items: [
      {
        type: "dropdown",
        displayName: t("options.appearance.shape.title"),
        key: "shape",
        default: HEATMAP_CALENDAR_CONFIG_DEFAULTS.shape,
        options: {
          circle: t("options.appearance.shape.circle"),
          square: t("options.appearance.shape.square"),
          rounded: t("options.appearance.shape.rounded"),
        },
      },
      {
        type: "dropdown",
        displayName: t("options.appearance.colorScheme.title"),
        key: "colorScheme",
        default: HEATMAP_CALENDAR_CONFIG_DEFAULTS.colorScheme,
        options: {
          primary: tColors("schemes.primary"),
          semaphor: tColors("schemes.semaphor"),
          red: tColors("palettes.red"),
          orange: tColors("palettes.orange"),
          yellow: tColors("palettes.yellow"),
          green: tColors("palettes.green"),
          cyan: tColors("palettes.cyan"),
          blue: tColors("palettes.blue"),
          purple: tColors("palettes.purple"),
          magenta: tColors("palettes.magenta"),
          custom: t("options.appearance.colorScheme.custom"),
        },
      },
      {
        type: "dropdown",
        displayName: t("options.appearance.colorScheme.title"),
        key: "contentScheme",
        default: HEATMAP_CALENDAR_CONFIG_DEFAULTS.contentScheme,
        options: {
          none: t("options.appearance.contentScheme.none"),
          mood: t("options.appearance.contentScheme.mood"),
          food: t("options.appearance.contentScheme.food"),
          tree: t("options.appearance.contentScheme.tree"),
          numerical: t("options.appearance.contentScheme.numerical"),
          alphabetical: t("options.appearance.contentScheme.alphabetical"),
        },
      },
      {
        type: "text",
        displayName: t("options.appearance.customColors.title"),
        key: "customColors",
        shouldHide: (config) => config.get('colorScheme') !== 'custom',
        default: HEATMAP_CALENDAR_CONFIG_DEFAULTS.customColors,
        placeholder: t("options.appearance.customColors.placeholder"),
      },
      {
        type: "toggle",
        displayName: t("options.appearance.reverseColors.title"),
        key: "reverseColors",
        default: HEATMAP_CALENDAR_CONFIG_DEFAULTS.reverseColors,
      },
      {
        type: "text",
        displayName: t("options.appearance.overflowColor.title"),
        key: "overflowColor",
        default: HEATMAP_CALENDAR_CONFIG_DEFAULTS.overflowColor,
        placeholder: t("options.appearance.overflowColor.placeholder"),
      },
    ],
  },
];
