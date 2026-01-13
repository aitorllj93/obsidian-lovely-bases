"use client";

import { addDays, addMonths, differenceInWeeks, eachDayOfInterval, endOfWeek, format, isSameDay, startOfMonth, startOfWeek, startOfYear  } from "date-fns";
import type { TFile } from "obsidian";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export type Occurrence = {
  date: string; // ISO date string (e.g., "2025-09-13")
  dateObj?: Date;
  count: number;
  file: TFile
}

type HeatmapCalendarProps = {
  data: Occurrence[];
  date?: Date;
  classNames?: string[];
  onClick?: (item: Occurrence) => void;
}

export const HeatmapCalendar = ({ data, date = new Date(), classNames = ["bg-[#ebedf0]", "bg-[#9be9a8]", "bg-[#40c463]", "bg-[#30a14e]", "bg-[#216e39]"], onClick }: HeatmapCalendarProps) => {
  const [occurrences, setOccurrences] = useState<Occurrence[]>([]);
  const startDate = startOfYear(date);
  const weeks = 53;

  // Process data prop
  useEffect(() => {
    setOccurrences(data.map((item) => {
      const [year, month, day] = item.date.split('-').map(Number);
      const dateObj = new Date(year, month - 1, day);
      return { ...item, dateObj };
    }));
  }, [data]);

  // Get className based on occurrence count
  const getClassName = (count: number) => classNames[count] || classNames[classNames.length - 1];

  // Render weeks
  const renderWeeks = () => {
    const weeksArray = [];
    let currentWeekStart = startOfWeek(startDate, { weekStartsOn: 0 });

    for (let i = 0; i < weeks; i++) {
      const weekDays = eachDayOfInterval({
        start: currentWeekStart,
        end: endOfWeek(currentWeekStart, { weekStartsOn: 0 }),
      });

      weeksArray.push(
        <div key={`w-${currentWeekStart.toISOString()}`} className="flex flex-col gap-1">
          {weekDays.map((day) => {
            const occurrence = occurrences.find((c) => c.dateObj && isSameDay(c.dateObj, day));
            const className = occurrence ? getClassName(occurrence.count) : classNames[0];

            return (
              <div
                key={`d-${day.toISOString()}`}
                className={cn(
                  `w-3 h-3 rounded-[4px]`,
                  className
                )}
                title={`${format(day, "PPP")}: ${occurrence?.count || 0} occurrences`}
                onClick={() => occurrence && onClick?.(occurrence)}
              />
            );
          })}
        </div>
      );
      currentWeekStart = addDays(currentWeekStart, 7);
    }

    return weeksArray;
  };

  // Render month labels positioned correctly above the weeks
  const renderMonthLabels = () => {
    const firstWeekStart = startOfWeek(startDate, { weekStartsOn: 0 });
    const months = [];

    for (let i = 0; i < 12; i++) {
      const monthStart = startOfMonth(addMonths(startDate, i));
      // Calculate which week column this month starts in
      const weekIndex = differenceInWeeks(monthStart, firstWeekStart);

      // Only show if it's within our 53 weeks range
      if (weekIndex >= 0 && weekIndex < weeks) {
        // Position: each week column is 12px (w-3) + 4px gap = 16px
        const leftPosition = weekIndex * 16;
        months.push(
          <span
            key={`monthlabel-${i}`}
            className="text-xs text-gray-500 absolute"
            style={{ left: `${leftPosition}px` }}
          >
            {format(monthStart, "MMM")}
          </span>
        );
      }
    }
    return months;
  };

  const dayLabels = Array.from({ length: 7 }, (_, i) => format(new Date(2000, 0, i + 1), 'EEE'));

  return (
    <div className="p-4 flex flex-col items-center">
      <div className="flex max-w-full">
        <div className="flex flex-col justify-between mt-5.5 mr-2">
          {dayLabels.map((day) => (
            <span key={`daylabel-${day}`} className="text-xs text-gray-500 h-3">
              {day}
            </span>
          ))}
        </div>
        <div>
          <div className="relative h-5 mb-2">{renderMonthLabels()}</div>
          <div className="flex gap-1">{renderWeeks()}</div>
        </div>
      </div>
      <div className="mt-4 justify-center flex gap-2 text-xs items-center">
        <span>Less</span>
        {classNames.map((className, index) => (
          <div key={`color-${index.toString()}`} className={
            cn('w-3 h-3 rounded-[4px]', className)
          } />
        ))}
        <span>More</span>
      </div>
    </div>
  );
};
