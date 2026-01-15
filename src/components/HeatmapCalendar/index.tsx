"use client";

import { startOfYear } from "date-fns";
import type { TFile } from "obsidian";
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
  date?: Date;
  classNames?: string[];
  colorScheme?: keyof typeof COLOR_SCHEMES;
  reverseColors?: boolean;
  onClick?: (item: Occurrence) => void;
};

export const HeatmapCalendar = ({
  data,
  date = new Date(),
  colorScheme = "primary",
  reverseColors = false,
  onClick,
}: Props) => {
  const startDate = startOfYear(date);
  const weeks = 53;

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
          <MonthLabels startDate={startDate} weeks={weeks} />
          <HeatmapGrid
            occurrences={occurrences}
            startDate={startDate}
            weeks={weeks}
            classNames={classNames}
            onClick={onClick}
          />
        </div>
      </div>
      <Legend classNames={classNames} />
    </div>
  );
};
