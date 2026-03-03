
import type { TFile } from "obsidian";
import { useMemo } from "react";

import { generateColorScale } from "@/lib/colors";
import {
  differenceInWeeks,
  endOfWeek,
  startOfWeek,
  subYears,
} from "@/lib/date";
import type { EntryClickEventHandler } from "@/types";

import { DayLabels } from "./components/DayLabels";
import { HeatmapGrid } from "./components/HeatmapGrid";
import { Legend } from "./components/Legend";
import { MonthGridView } from "./components/MonthGridView";
import { MonthLabels } from "./components/MonthLabels";
import { YearLabels } from "./components/YearLabels";
import type { CellShape, ColorScheme, ContentScheme, LayoutDirection, TrackType, ViewMode } from "./config";
import { HEATMAP_CALENDAR_CONFIG_DEFAULTS } from "./config";
import { COLOR_SCHEMES, CONTENT_SCHEMES, MAX_WEEKS } from "./constants";
import { useHeatmapData } from "./hooks/useHeatmapData";


export type Occurrence = {
  date: string;
  dateObj?: Date;
  count: number;
  file: TFile;
};

type Props = {
  data: Occurrence[];
  startDate?: Date;
  endDate?: Date;
  classNames?: string[];
  colorScheme?: ColorScheme;
  contentScheme?: ContentScheme;
  reverseColors?: boolean;
  layout?: LayoutDirection;
  viewMode?: ViewMode;
  showDayLabels?: boolean;
  showMonthLabels?: boolean;
  showYearLabels?: boolean;
  showLegend?: boolean;
  minValue?: number;
  maxValue?: number;
  trackType?: TrackType;
  shape?: CellShape;
  customColors?: string[];
  overflowColor?: string;
  onEntryClick?: EntryClickEventHandler;
};

export const HeatmapCalendar = ({
  data,
  startDate = subYears(new Date(), 1),
  endDate = new Date(),
  colorScheme = HEATMAP_CALENDAR_CONFIG_DEFAULTS.colorScheme,
  contentScheme = HEATMAP_CALENDAR_CONFIG_DEFAULTS.contentScheme,
  reverseColors = false,
  layout = HEATMAP_CALENDAR_CONFIG_DEFAULTS.layout,
  viewMode = HEATMAP_CALENDAR_CONFIG_DEFAULTS.viewMode,
  shape = HEATMAP_CALENDAR_CONFIG_DEFAULTS.shape,
  showDayLabels = true,
  showMonthLabels = true,
  showYearLabels = false,
  showLegend = true,
  minValue,
  maxValue,
  trackType,
  customColors,
  overflowColor,
  onEntryClick,
}: Props) => {
  const displayStartDate = startOfWeek(startDate);
  const displayEndDate = endOfWeek(endDate);
  const weeks = Math.min(
    Math.ceil(differenceInWeeks(displayEndDate, displayStartDate) + 1),
    MAX_WEEKS,
  );

  const occurrences = useHeatmapData(data, trackType);

  const classNames = useMemo(() => {
    let colors: string[];
    if (customColors?.length) {
      colors = customColors.length === 0 ? COLOR_SCHEMES.primary : generateColorScale(customColors, 6);
    } else {
      colors = COLOR_SCHEMES[colorScheme] as string[];
    }

    if (reverseColors) {
      // we need to keep the first color as bg-background-secondary and reverse the rest
      colors = [colors[0], ...colors.slice(1).reverse()];
    }

    // For boolean tracking, use only 2 colors (empty and filled)
    if (trackType === "boolean") {
      colors = [colors[0], colors[colors.length - 1]];
    }

    return colors;
  }, [colorScheme, reverseColors, customColors, trackType]);
  const contents = CONTENT_SCHEMES[contentScheme];

  // MonthGridView is a standalone view mode that doesn't use the week-grid layout system
  if (viewMode === "month-grid") {
    return (
      <div className="p-4 flex flex-col items-center">
        <MonthGridView
          occurrences={occurrences}
          startDate={displayStartDate}
          endDate={displayEndDate}
          classNames={classNames}
          contents={contents}
          minValue={minValue}
          maxValue={maxValue}
          overflowColor={overflowColor}
          showDayLabels={showDayLabels}
          layout={layout}
          onEntryClick={onEntryClick}
          rangeStartDate={startDate}
          rangeEndDate={endDate}
          shape={shape}
        />
        <Legend
          classNames={classNames}
          contents={contents}
          overflowColor={overflowColor}
          shape={shape}
        />
      </div>
    );
  }

  // Week-grid layout (horizontal or vertical)
  const isVertical = layout === "vertical";
  const mainContainerClass = isVertical
    ? "flex flex-col max-w-full"
    : "flex max-w-full";
  const labelsContainerClass = isVertical ? "flex gap-2" : "flex flex-col gap-2";

  const renderLabels = () => {
    if (!showYearLabels && !showMonthLabels) {
      return null;
    }

    return (
      <div className={labelsContainerClass}>
        {showYearLabels && (<YearLabels
          startDate={startDate}
          endDate={endDate}
          layout={layout}
          weeks={weeks}
        />)}
        {showMonthLabels && (<MonthLabels
          weeks={weeks}
          startDate={startDate}
          endDate={endDate}
          layout={layout}
          />
        )}
      </div>
    );

  };

  return (
    <div className="p-4 flex flex-col items-center">
      <div className={mainContainerClass}>
        {isVertical ? (
          <div className="flex flex-col">
            {showDayLabels && (
              <div className="flex gap-2 mb-2 items-start overflow-visible">
                {showYearLabels && <div className="w-10 shrink-0" />}
                {showMonthLabels && <div className="w-7 shrink-0" />}
                <div className="flex-1 overflow-visible">
                  <DayLabels
                    layout={layout}
                    showMonthLabels={showMonthLabels}
                    showYearLabels={showYearLabels}
                  />
                </div>
              </div>
            )}
            <div className="flex gap-2">
              {renderLabels()}
              <HeatmapGrid
                occurrences={occurrences}
                startDate={displayStartDate}
                weeks={weeks}
                classNames={classNames}
                contents={contents}
                layout={layout}
                minValue={minValue}
                maxValue={maxValue}
                overflowColor={overflowColor}
                onEntryClick={onEntryClick}
                rangeStartDate={startDate}
                rangeEndDate={endDate}
                shape={shape}
              />
            </div>
          </div>
        ) : (
          <>
            {showDayLabels && (
              <DayLabels
                layout={layout}
                showMonthLabels={showMonthLabels}
                showYearLabels={showYearLabels}
              />
            )}
            <div>
              {renderLabels()}
              <HeatmapGrid
                occurrences={occurrences}
                startDate={displayStartDate}
                weeks={weeks}
                classNames={classNames}
                contents={contents}
                layout={layout}
                minValue={minValue}
                maxValue={maxValue}
                overflowColor={overflowColor}
                onEntryClick={onEntryClick}
                rangeStartDate={startDate}
                rangeEndDate={endDate}
                shape={shape}
              />
            </div>
          </>
        )}
      </div>
      {showLegend && <Legend
        classNames={classNames}
        contents={contents}
        overflowColor={overflowColor}
        shape={shape}
      />}
    </div>
  );
};
