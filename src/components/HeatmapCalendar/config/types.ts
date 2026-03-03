import type { BasesPropertyId } from "obsidian";

export type ViewMode = "week-grid" | "month-grid";

export type LayoutDirection = "horizontal" | "vertical";

export type CellShape = "circle" | "square" | "rounded";

export const SUPPORTED_VALUE_TYPES = ["boolean", "list", "string", "number"] as const;
export type TrackType = typeof SUPPORTED_VALUE_TYPES[number];

export type ColorScheme = |
  "primary" |
  "semaphor" |
  "red" |
  "orange" |
  "yellow" |
  "green" |
  "cyan" |
  "blue" |
  "purple" |
  "magenta" |
  "custom";

export type ContentScheme = |
  'none' |
  'mood' |
  'food' |
  'tree' |
  'numerical' |
  'alphabetical';

  export type HeatmapCalendarConfig = {
    dateProperty?: BasesPropertyId;
    trackProperty?: BasesPropertyId;
    colorScheme: ColorScheme;
    contentScheme: ContentScheme;
    shape: CellShape;
    reverseColors?: boolean;
    startDate?: string;
    endDate?: string;
    layout?: LayoutDirection;
    viewMode: ViewMode;
    showDayLabels?: boolean;
    showMonthLabels?: boolean;
    showYearLabels?: boolean;
    showLegend?: boolean;
    minValue?: number;
    maxValue?: number;
    trackType: TrackType;
    customColors?: string;
    overflowColor?: string;
  };
