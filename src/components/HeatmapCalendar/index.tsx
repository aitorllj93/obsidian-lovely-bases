"use client";

import type { TFile } from "obsidian";

import {
  differenceInWeeks,
  endOfWeek,
  startOfWeek,
} from "@/lib/date";
import type { EntryClickEventHandler } from "@/types";

import { DayLabels } from "./components/DayLabels";
import { HeatmapGrid } from "./components/HeatmapGrid";
import { Legend } from "./components/Legend";
import { MonthLabels } from "./components/MonthLabels";
import { useHeatmapData } from "./hooks/useHeatmapData";
import { COLOR_SCHEMES } from "./utils";

export type Occurrence = {
  date: string; // ISO date string (e.g., "2025-09-13")
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
  onEntryClick?: EntryClickEventHandler;
};

export const HeatmapCalendar = ({
  data,
  startDate = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
  endDate = new Date(),
  colorScheme = "primary",
  reverseColors = false,
  onEntryClick,
}: Props) => {
  const displayStartDate = startOfWeek(startDate);
  const displayEndDate = endOfWeek(endDate);
  const weeks = Math.ceil(
    differenceInWeeks(displayEndDate, displayStartDate) + 1,
  );

  const occurrences = useHeatmapData(data);

  let classNames = COLOR_SCHEMES[colorScheme] as string[];
  if (reverseColors) {
    // we need to keep the first color as bg-card and reverse the rest
    classNames = [classNames[0], ...classNames.slice(1).reverse()];
  }

  return (
    <div className="p-4 flex flex-col items-center">
      <div className="flex max-w-full">
        <DayLabels />
        <div>
          <MonthLabels startDate={displayStartDate} weeks={weeks} />
          <HeatmapGrid
            occurrences={occurrences}
            startDate={displayStartDate}
            weeks={weeks}
            classNames={classNames}
            onEntryClick={onEntryClick}
          />
        </div>
      </div>
      <Legend classNames={classNames} />
    </div>
  );
};
