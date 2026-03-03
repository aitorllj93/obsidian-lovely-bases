import type { HeatmapCalendarConfig } from "./types";

export const HEATMAP_CALENDAR_CONFIG_DEFAULTS: HeatmapCalendarConfig = {
  /* Data */
  dateProperty: undefined,
  trackProperty: undefined,
  trackType: "number",
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
  contentScheme: "none",
  shape: "rounded",
  reverseColors: false,
  customColors: undefined,
  overflowColor: undefined,
};
