import { cva } from "class-variance-authority";
import { useMemo } from "react";

import {
  addDays,
  eachDayOfInterval,
  endOfWeek,
  startOfWeek,
} from "@/lib/date";
import type { EntryClickEventHandler } from "@/types";

import type { CellShape, LayoutDirection } from "../config";

import type { Occurrence } from "../index";
import { WeekDay } from "./WeekDay";

const containerVariants = cva("", {
  variants: {
    layout: {
      horizontal: "flex gap-1",
      vertical: "flex gap-1 flex-col",
    },
  },
  defaultVariants: {
    layout: "horizontal",
  },
});

const weekVariants = cva("", {
  variants: {
    layout: {
      horizontal: "flex gap-1 flex-col",
      vertical: "flex gap-1"
    },
  },
  defaultVariants: {
    layout: "horizontal",
  },
});

type Props = {
  occurrences: Occurrence[];
  startDate: Date;
  weeks: number;
  classNames: string[];
  contents?: string[];
  layout?: LayoutDirection;
  minValue?: number;
  maxValue?: number;
  overflowColor?: string;
  onEntryClick?: EntryClickEventHandler;
  rangeStartDate?: Date;
  rangeEndDate?: Date;
  shape?: CellShape;
};

export const HeatmapGrid = ({
  occurrences,
  startDate,
  weeks,
  classNames,
  contents,
  layout = "horizontal",
  minValue = 0,
  maxValue = 10,
  overflowColor,
  onEntryClick,
  rangeStartDate,
  rangeEndDate,
  shape = "rounded",
}: Props) => {
  const occurrenceMap = useMemo(() => {
    const map = new Map<string, Occurrence>();
    for (const occ of occurrences) {
      if (occ.date) {
        map.set(occ.date, occ);
      }
    }
    return map;
  }, [occurrences]);

  const weeksData = useMemo(() => {
    const result: { weekStart: Date; weekDays: Date[] }[] = [];
    let currentWeekStart = startOfWeek(startDate);
    for (let i = 0; i < weeks; i++) {
      result.push({
        weekStart: currentWeekStart,
        weekDays: eachDayOfInterval({
          start: currentWeekStart,
          end: endOfWeek(currentWeekStart),
        }),
      });
      currentWeekStart = addDays(currentWeekStart, 7);
    }
    return result;
  }, [startDate, weeks]);

  return (
    <div className={containerVariants({ layout })}>
      {weeksData.map(({ weekStart, weekDays }) => (
        <div
          key={`w-${weekStart.toISOString()}`}
          className={weekVariants({ layout })}
        >
          {weekDays.map((day) => (
            <WeekDay
              key={`d-${day.toISOString()}`}
              day={day}
              occurrenceMap={occurrenceMap}
              classNames={classNames}
              contents={contents}
              minValue={minValue}
              maxValue={maxValue}
              overflowColor={overflowColor}
              onEntryClick={onEntryClick}
              rangeStartDate={rangeStartDate}
              rangeEndDate={rangeEndDate}
              shape={shape}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
