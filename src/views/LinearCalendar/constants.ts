import type { ViewOption } from "obsidian";
import { detectLocale, type NamespacedTranslationKey, translate } from "@/lib/i18n";
import type { LinearCalendarConfig } from "./types";

const locale = detectLocale();
const t = (key: NamespacedTranslationKey<'linearCalendar'>) => translate(locale, 'linearCalendar', key);

export const DEFAULTS: LinearCalendarConfig = {
  /* Data */
  startDateProperty: undefined,
  endDateProperty: undefined,
  titleProperty: undefined,
  /* Date Range */
  date: undefined,
  focus: "full",
  /* Appearance */
  colorProperty: undefined,
  iconProperty: undefined,
};

export const LINEAR_CALENDAR_OPTIONS: ViewOption[] = [
  {
    type: "group",
    displayName: t("options.data.title"),
    items: [
      {
        type: "property",
        displayName: t("options.data.startDateProperty.title"),
        key: "startDateProperty",
        default: DEFAULTS.startDateProperty,
      },
      {
        type: "property",
        displayName: t("options.data.endDateProperty.title"),
        key: "endDateProperty",
        default: DEFAULTS.endDateProperty,
      },
      {
        type: "property",
        displayName: t("options.data.titleProperty.title"),
        key: "titleProperty",
        default: DEFAULTS.titleProperty,
      },
    ],
  },
  {
    type: "group",
    displayName: t("options.dateRange.title"),
    items: [
      {
        type: "text",
        displayName: t("options.dateRange.referenceDate.title"),
        key: "date",
        default: DEFAULTS.date,
        placeholder: t("options.dateRange.referenceDate.placeholder"),
      },
      {
        type: "dropdown",
        displayName: t("options.dateRange.focus.title"),
        key: "focus",
        default: DEFAULTS.focus,
        options: {
          full: t("options.dateRange.focus.full"),
          half: t("options.dateRange.focus.half"),
          quarter: t("options.dateRange.focus.quarter"),
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
        key: "colorProperty",
        default: DEFAULTS.colorProperty,
      },
      {
        type: "property",
        displayName: t("options.appearance.iconProperty.title"),
        key: "iconProperty",
        default: DEFAULTS.iconProperty,
      },
    ],
  },
];
