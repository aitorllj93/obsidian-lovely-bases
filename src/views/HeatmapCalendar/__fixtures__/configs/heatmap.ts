import { FORMATS, format, subWeeks, subYears } from "@/lib/date";
import type { HeatmapCalendarConfig } from "../../HeatmapCalendarView";

export const DEFAULT_HEATMAP_BASE_CONFIG: HeatmapCalendarConfig = {
  dateProperty: "file.name",
  trackProperty: "note.dietQuality",
  colorScheme: "primary",
  reverseColors: false,
  startDate: format(subYears(new Date(), 1), FORMATS.DATE_ISO),
  endDate: format(new Date(), FORMATS.DATE_ISO),
};

export const FULL_HEATMAP_BASE_CONFIG: HeatmapCalendarConfig = {
  dateProperty: "file.name",
  trackProperty: "note.dietQuality",
  colorScheme: "semaphor",
  reverseColors: false,
  startDate: format(subYears(new Date(), 1), FORMATS.DATE_ISO),
  endDate: format(new Date(), FORMATS.DATE_ISO),
};

export const THIRTEEN_WEEKS_HEATMAP_BASE_CONFIG: HeatmapCalendarConfig = {
  dateProperty: "file.name",
  trackProperty: "note.dietQuality",
  colorScheme: "green",
  reverseColors: false,
  startDate: format(subWeeks(new Date(), 13), FORMATS.DATE_ISO),
  endDate: format(new Date(), FORMATS.DATE_ISO),
};

export const REVERSE_COLORS_HEATMAP_BASE_CONFIG: HeatmapCalendarConfig = {
  dateProperty: "file.name",
  trackProperty: "note.dietQuality",
  colorScheme: "red",
  reverseColors: true,
  startDate: format(subWeeks(new Date(), 4), FORMATS.DATE_ISO),
  endDate: format(new Date(), FORMATS.DATE_ISO),
};

export const RED_HEATMAP_BASE_CONFIG: HeatmapCalendarConfig = {
  dateProperty: "file.name",
  trackProperty: "note.dietQuality",
  colorScheme: "red",
  reverseColors: false,
  startDate: format(subYears(new Date(), 1), FORMATS.DATE_ISO),
  endDate: format(new Date(), FORMATS.DATE_ISO),
};

export const ORANGE_HEATMAP_BASE_CONFIG: HeatmapCalendarConfig = {
  dateProperty: "file.name",
  trackProperty: "note.dietQuality",
  colorScheme: "orange",
  reverseColors: false,
  startDate: format(subYears(new Date(), 1), FORMATS.DATE_ISO),
  endDate: format(new Date(), FORMATS.DATE_ISO),
};

export const YELLOW_HEATMAP_BASE_CONFIG: HeatmapCalendarConfig = {
  dateProperty: "file.name",
  trackProperty: "note.dietQuality",
  colorScheme: "yellow",
  reverseColors: false,
  startDate: format(subYears(new Date(), 1), FORMATS.DATE_ISO),
  endDate: format(new Date(), FORMATS.DATE_ISO),
};

export const GREEN_HEATMAP_BASE_CONFIG: HeatmapCalendarConfig = {
  dateProperty: "file.name",
  trackProperty: "note.dietQuality",
  colorScheme: "green",
  reverseColors: false,
  startDate: format(subYears(new Date(), 1), FORMATS.DATE_ISO),
  endDate: format(new Date(), FORMATS.DATE_ISO),
};

export const CYAN_HEATMAP_BASE_CONFIG: HeatmapCalendarConfig = {
  dateProperty: "file.name",
  trackProperty: "note.dietQuality",
  colorScheme: "cyan",
  reverseColors: false,
  startDate: format(subYears(new Date(), 1), FORMATS.DATE_ISO),
  endDate: format(new Date(), FORMATS.DATE_ISO),
};

export const BLUE_HEATMAP_BASE_CONFIG: HeatmapCalendarConfig = {
  dateProperty: "file.name",
  trackProperty: "note.dietQuality",
  colorScheme: "blue",
  reverseColors: false,
  startDate: format(subYears(new Date(), 1), FORMATS.DATE_ISO),
  endDate: format(new Date(), FORMATS.DATE_ISO),
};

export const PURPLE_HEATMAP_BASE_CONFIG: HeatmapCalendarConfig = {
  dateProperty: "file.name",
  trackProperty: "note.dietQuality",
  colorScheme: "purple",
  reverseColors: false,
  startDate: format(subYears(new Date(), 1), FORMATS.DATE_ISO),
  endDate: format(new Date(), FORMATS.DATE_ISO),
};

export const MAGENTA_HEATMAP_BASE_CONFIG: HeatmapCalendarConfig = {
  dateProperty: "file.name",
  trackProperty: "note.dietQuality",
  colorScheme: "magenta",
  reverseColors: false,
  startDate: format(subYears(new Date(), 1), FORMATS.DATE_ISO),
  endDate: format(new Date(), FORMATS.DATE_ISO),
};
