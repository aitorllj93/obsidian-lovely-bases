import type { ViewOption } from "obsidian";

import {
  detectLocale,
  type NamespacedTranslationKey,
  translate,
} from "@/lib/i18n";

import type { RadarChartConfig } from "./types";

const locale = detectLocale();
const tColors = (key: NamespacedTranslationKey<'colors'>) => translate(locale, 'colors', key);
const t = (key: NamespacedTranslationKey<"radarChart">) =>
  translate(locale, "radarChart", key);

export const DEFAULTS: RadarChartConfig = {
  /* Data */
  aggregationFunction: "average",
  /* Value Range */
  minValue: 0,
  maxValue: 100,
  /* Display */
  showAxisLabels: true,
  showAxisTicks: true,
  showLegend: true,
  legendPosition: "bottom",
  /* Appearance */
  colorScheme: "primary",
  customColors: undefined,
  fillOpacity: 0.3,
};

export const RADAR_CHART_OPTIONS: ViewOption[] = [
  {
    type: "group",
    displayName: t("options.data.title"),
    items: [
      {
        type: "dropdown",
        displayName: t("options.data.aggregationFunction.title"),
        key: "aggregationFunction",
        default: DEFAULTS.aggregationFunction,
        options: {
          average: t("options.data.aggregationFunction.average"),
          median: t("options.data.aggregationFunction.median"),
          sum: t("options.data.aggregationFunction.sum"),
          max: t("options.data.aggregationFunction.max"),
          min: t("options.data.aggregationFunction.min"),
        },
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
        max: 1000,
        step: 1,
      },
    ],
  },
  {
    type: "group",
    displayName: t("options.display.title"),
    items: [
      {
        type: "toggle",
        displayName: t("options.display.showAxisLabels.title"),
        key: "showAxisLabels",
        default: DEFAULTS.showAxisLabels,
      },
      {
        type: "toggle",
        displayName: t("options.display.showAxisTicks.title"),
        key: "showAxisTicks",
        default: DEFAULTS.showAxisTicks,
      },
      {
        type: "toggle",
        displayName: t("options.display.showLegend.title"),
        key: "showLegend",
        default: DEFAULTS.showLegend,
      },
      {
        type: "dropdown",
        displayName: t("options.display.legendPosition.title"),
        key: "legendPosition",
        default: DEFAULTS.legendPosition,
        shouldHide: (config) => !config.get("showLegend"),
        options: {
          top: t("options.display.legendPosition.top"),
          bottom: t("options.display.legendPosition.bottom"),
          left: t("options.display.legendPosition.left"),
          right: t("options.display.legendPosition.right"),
        },
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
          primary: tColors("schemes.primary"),
          semaphor: tColors("schemes.semaphor"),
          rainbow: tColors("schemes.rainbow"),
          contrast: tColors("schemes.contrast"),
          red: tColors("palettes.red"),
          orange: tColors("palettes.orange"),
          yellow: tColors("palettes.yellow"),
          green: tColors("palettes.green"),
          cyan: tColors("palettes.cyan"),
          blue: tColors("palettes.blue"),
          purple: tColors("palettes.purple"),
          magenta: tColors("palettes.magenta"),
        },
      },
      {
        type: "text",
        displayName: t("options.appearance.customColors.title"),
        key: "customColors",
        default: DEFAULTS.customColors,
        placeholder: t("options.appearance.customColors.placeholder"),
      },
      {
        type: "slider",
        displayName: t("options.appearance.fillOpacity.title"),
        key: "fillOpacity",
        default: DEFAULTS.fillOpacity,
        min: 0,
        max: 1,
        step: 0.05,
      },
    ],
  },
];
