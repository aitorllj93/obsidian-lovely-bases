

import type { HeatmapCalendarConfig } from "../../HeatmapCalendarView";

export const DEFAULT_HEATMAP_BASE_CONFIG: HeatmapCalendarConfig = {
  dateProperty: 'file.name',
  trackProperty: 'note.dietQuality',
  colorScheme: 'primary',
  date: new Date().toString(),
};

export const FULL_HEATMAP_BASE_CONFIG: HeatmapCalendarConfig = {
  dateProperty: 'file.name',
  trackProperty: 'note.dietQuality',
  colorScheme: 'semaphor',
  date: '2027'
};

export const THIRTEEN_WEEKS_HEATMAP_BASE_CONFIG: HeatmapCalendarConfig = {
  dateProperty: 'file.name',
  trackProperty: 'note.dietQuality',
  colorScheme: 'green',
  date: '2027',
  weeks: 13,
};

export const RED_HEATMAP_BASE_CONFIG: HeatmapCalendarConfig = {
  dateProperty: 'file.name',
  trackProperty: 'note.dietQuality',
  colorScheme: 'red',
  date: new Date().getFullYear().toString(),
};

export const ORANGE_HEATMAP_BASE_CONFIG: HeatmapCalendarConfig = {
  dateProperty: 'file.name',
  trackProperty: 'note.dietQuality',
  colorScheme: 'orange',
  date: new Date().getFullYear().toString(),
};

export const YELLOW_HEATMAP_BASE_CONFIG: HeatmapCalendarConfig = {
  dateProperty: 'file.name',
  trackProperty: 'note.dietQuality',
  colorScheme: 'yellow',
  date: new Date().getFullYear().toString(),
};

export const GREEN_HEATMAP_BASE_CONFIG: HeatmapCalendarConfig = {
  dateProperty: 'file.name',
  trackProperty: 'note.dietQuality',
  colorScheme: 'green',
  date: new Date().getFullYear().toString(),
};

export const CYAN_HEATMAP_BASE_CONFIG: HeatmapCalendarConfig = {
  dateProperty: 'file.name',
  trackProperty: 'note.dietQuality',
  colorScheme: 'cyan',
  date: new Date().getFullYear().toString(),
};

export const BLUE_HEATMAP_BASE_CONFIG: HeatmapCalendarConfig = {
  dateProperty: 'file.name',
  trackProperty: 'note.dietQuality',
  colorScheme: 'blue',
  date: new Date().getFullYear().toString(),
};

export const PURPLE_HEATMAP_BASE_CONFIG: HeatmapCalendarConfig = {
  dateProperty: 'file.name',
  trackProperty: 'note.dietQuality',
  colorScheme: 'purple',
  date: new Date().getFullYear().toString(),
};

export const MAGENTA_HEATMAP_BASE_CONFIG: HeatmapCalendarConfig = {
  dateProperty: 'file.name',
  trackProperty: 'note.dietQuality',
  colorScheme: 'purple',
  date: new Date().getFullYear().toString(),
};
