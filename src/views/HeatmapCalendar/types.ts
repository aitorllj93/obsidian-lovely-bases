import type { BasesPropertyId } from "obsidian";

import type { TrackType } from "@/components/HeatmapCalendar/hooks/useHeatmapData";
import type { COLOR_SCHEMES } from "@/components/HeatmapCalendar/utils";


export type HeatmapCalendarConfig = {
  dateProperty: BasesPropertyId;
  trackProperty: BasesPropertyId;
  colorScheme?: keyof typeof COLOR_SCHEMES;
  reverseColors?: boolean;
  startDate?: string;
  endDate?: string;
  layout?: "horizontal" | "vertical";
  viewMode?: "week-grid" | "month-grid";
  showDayLabels?: boolean;
  showMonthLabels?: boolean;
  showYearLabels?: boolean;
  showLegend?: boolean;
  minValue?: number;
  maxValue?: number;
  trackType?: TrackType;
  customColors?: string;
  overflowColor?: string;
};
