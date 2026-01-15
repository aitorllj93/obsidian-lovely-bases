
import { addDays, eachDayOfInterval, endOfWeek, FORMATS, format, isSameDay, startOfWeek } from "@/lib/date";
import { cn } from "@/lib/utils";
import type { EntryClickEventHandler } from "@/types";

import type { Occurrence } from "../index";

type Props = {
  occurrences: Occurrence[];
  startDate: Date;
  weeks: number;
  classNames: string[];
  onEntryClick?: EntryClickEventHandler;
};

const getClassName = (count: number, classNames: string[]) =>
  classNames[count] || classNames[classNames.length - 1];

export const HeatmapGrid = ({
  occurrences,
  startDate,
  weeks,
  classNames,
  onEntryClick,
}: Props) => {
  const renderWeeks = () => {
    const weeksArray = [];
    let currentWeekStart = startOfWeek(startDate);

    for (let i = 0; i < weeks; i++) {
      const weekDays = eachDayOfInterval({
        start: currentWeekStart,
        end: endOfWeek(currentWeekStart),
      });

      weeksArray.push(
        <div
          key={`w-${currentWeekStart.toISOString()}`}
          className="flex flex-col gap-1"
        >
          {weekDays.map((day) => {
            const occurrence = occurrences.find(
              (c) => c.dateObj && isSameDay(c.dateObj, day),
            );
            const className = occurrence
              ? getClassName(occurrence.count, classNames)
              : classNames[0];

            return (
              <div
                key={`d-${day.toISOString()}`}
                className={cn(`w-3 h-3 rounded-[4px]`, className)}
                title={`${format(day, FORMATS.DATE_LONG)}: ${occurrence?.count || 0}`}
                onClick={(evt) => onEntryClick?.(occurrence.file.path, evt)}
              />
            );
          })}
        </div>,
      );
      currentWeekStart = addDays(currentWeekStart, 7);
    }

    return weeksArray;
  };

  return <div className="flex gap-1">{renderWeeks()}</div>;
};
