"use client";

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
import { type TrackType, useHeatmapData } from "./hooks/useHeatmapData";
import { COLOR_SCHEMES } from "./utils";

const MAX_WEEKS = 520;

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
  colorScheme?: keyof typeof COLOR_SCHEMES;
  reverseColors?: boolean;
  layout?: "horizontal" | "vertical";
  viewMode?: "week-grid" | "month-grid";
  showDayLabels?: boolean;
  showMonthLabels?: boolean;
  showYearLabels?: boolean;
  showLegend?: boolean;
  minValue?: number;
  maxValue?: number;
  trackType?: TrackType;
  customColors?: string[];
  overflowColor?: string;
  onEntryClick?: EntryClickEventHandler;
};

export const HeatmapCalendar = ({
  data,
  startDate = subYears(new Date(), 1),
  endDate = new Date(),
  colorScheme = "primary",
  reverseColors = false,
  layout = "horizontal",
  viewMode = "week-grid",
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
      // we need to keep the first color as bg-card and reverse the rest
      colors = [colors[0], ...colors.slice(1).reverse()];
    }

    // For boolean tracking, use only 2 colors (empty and filled)
    if (trackType === "boolean") {
      colors = [colors[0], colors[colors.length - 1]];
    }

    return colors;
  }, [colorScheme, reverseColors, customColors, trackType]);

  // MonthGridView is a standalone view mode that doesn't use the week-grid layout system
  if (viewMode === "month-grid") {
    return (
      <div className="p-4 flex flex-col items-center">
        <MonthGridView
          occurrences={occurrences}
          startDate={displayStartDate}
          endDate={displayEndDate}
          classNames={classNames}
          minValue={minValue}
          maxValue={maxValue}
          overflowColor={overflowColor}
          showDayLabels={showDayLabels}
          layout={layout}
          onEntryClick={onEntryClick}
          rangeStartDate={startDate}
          rangeEndDate={endDate}
        />
        <Legend classNames={classNames} overflowColor={overflowColor} />
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
          startDate={displayStartDate}
          endDate={displayEndDate}
          layout={layout}
          weeks={weeks}
        />)}
        {showMonthLabels && (<MonthLabels
          startDate={displayStartDate}
          weeks={weeks}
            endDate={displayEndDate}
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
                layout={layout}
                minValue={minValue}
                maxValue={maxValue}
                overflowColor={overflowColor}
                onEntryClick={onEntryClick}
                rangeStartDate={startDate}
                rangeEndDate={endDate}
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
                layout={layout}
                minValue={minValue}
                maxValue={maxValue}
                overflowColor={overflowColor}
                onEntryClick={onEntryClick}
                rangeStartDate={startDate}
                rangeEndDate={endDate}
              />
            </div>
          </>
        )}
      </div>
      {showLegend && <Legend classNames={classNames} overflowColor={overflowColor} />}
    </div>
  );
};
