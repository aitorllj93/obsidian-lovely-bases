import type { ViewOption } from "obsidian";
import { detectLocale,  type NamespacedTranslationKey, translate } from "@/lib/i18n";
import type { HeatmapCalendarConfig } from "./types";

const locale = detectLocale();
const tCommon = (key: NamespacedTranslationKey<'common'>) => translate(locale, 'common', key);
const t = (key: NamespacedTranslationKey<'heatmapCalendar'>) => translate(locale, 'heatmapCalendar', key);

export const DEFAULTS: HeatmapCalendarConfig = {
  /* Data */
  dateProperty: undefined,
  trackProperty: undefined,
  trackType: undefined,
  /* Date Range */
  startDate: undefined,
  endDate: undefined,
  /* Layout & Display */
  layout: "horizontal",
  viewMode: "week-grid",
  showDayLabels: true,
  showMonthLabels: true,
  showYearLabels: false,
  showLegend: true,
  /* Value Range */
  minValue: 0,
  maxValue: 10,
  /* Appearance */
  colorScheme: "primary",
  reverseColors: false,
  customColors: undefined,
  overflowColor: undefined,
};

export const HEATMAP_CALENDAR_OPTIONS: ViewOption[] = [
  {
    type: "group",
    displayName: t("options.data.title"),
    items: [
      {
        type: "property",
        displayName: t("options.data.dateProperty.title"),
        key: "dateProperty",
        default: DEFAULTS.dateProperty,
      },
      {
        type: "property",
        displayName: t("options.data.trackProperty.title"),
        key: "trackProperty",
        default: DEFAULTS.trackProperty,
      },
      {
        type: "dropdown",
        displayName: t("options.data.trackType.title"),
        key: "trackType",
        default: DEFAULTS.trackType,
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
        default: DEFAULTS.startDate,
        placeholder: t("options.dateRange.startDate.placeholder"),
      },
      {
        type: "text",
        displayName: t("options.dateRange.endDate.title"),
        key: "endDate",
        default: DEFAULTS.endDate,
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
        default: DEFAULTS.layout,
        options: {
          horizontal: t("options.display.layout.horizontal"),
          vertical: t("options.display.layout.vertical"),
        },
      },
      {
        type: "dropdown",
        displayName: t("options.display.viewMode.title"),
        key: "viewMode",
        default: DEFAULTS.viewMode,
        options: {
          "week-grid": t("options.display.viewMode.week-grid"),
          "month-grid": t("options.display.viewMode.month-grid"),
        },
      },
      {
        type: "toggle",
        displayName: t("options.display.showDayLabels.title"),
        key: "showDayLabels",
        default: DEFAULTS.showDayLabels,
      },
      {
        type: "toggle",
        displayName: t("options.display.showMonthLabels.title"),
        key: "showMonthLabels",
        default: DEFAULTS.showMonthLabels,
      },
      {
        type: "toggle",
        displayName: t("options.display.showYearLabels.title"),
        key: "showYearLabels",
        default: DEFAULTS.showYearLabels,
      },
      {
        type: "toggle",
        displayName: t("options.display.showLegend.title"),
        key: "showLegend",
        default: DEFAULTS.showLegend,
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
        default: DEFAULTS.minValue,
        min: 0,
        max: 100,
        step: 1,
      },
      {
        type: "slider",
        displayName: t("options.valueRange.maxValue.title"),
        key: "maxValue",
        default: DEFAULTS.maxValue,
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
        displayName: t("options.appearance.colorScheme.title"),
        key: "colorScheme",
        default: DEFAULTS.colorScheme,
        options: {
          primary: tCommon("options.colors.schemes.primary"),
          semaphor: tCommon("options.colors.schemes.semaphor"),
          red: tCommon("options.colors.palettes.red"),
          orange: tCommon("options.colors.palettes.orange"),
          yellow: tCommon("options.colors.palettes.yellow"),
          green: tCommon("options.colors.palettes.green"),
          cyan: tCommon("options.colors.palettes.cyan"),
          blue: tCommon("options.colors.palettes.blue"),
          purple: tCommon("options.colors.palettes.purple"),
          magenta: tCommon("options.colors.palettes.magenta"),
        },
      },
      {
        type: "toggle",
        displayName: t("options.appearance.reverseColors.title"),
        key: "reverseColors",
        default: DEFAULTS.reverseColors,
      },
      {
        type: "text",
        displayName: t("options.appearance.customColors.title"),
        key: "customColors",
        default: DEFAULTS.customColors,
        placeholder: t("options.appearance.customColors.placeholder"),
      },
      {
        type: "text",
        displayName: t("options.appearance.overflowColor.title"),
        key: "overflowColor",
        default: DEFAULTS.overflowColor,
        placeholder: t("options.appearance.overflowColor.placeholder"),
      },
    ],
  },
];
