import {
  addDays,
  eachDayOfInterval,
  endOfWeek,
  format,
  isSameDay,
  startOfWeek,
} from "date-fns";

import { cn } from "@/lib/utils";
import type { Occurrence } from "../index";

type Props = {
  occurrences: Occurrence[];
  startDate: Date;
  weeks: number;
  classNames: string[];
  onClick?: (item: Occurrence) => void;
};

const getClassName = (count: number, classNames: string[]) =>
  classNames[count] || classNames[classNames.length - 1];

export const HeatmapGrid = ({
  occurrences,
  startDate,
  weeks,
  classNames,
  onClick,
}: Props) => {
  const renderWeeks = () => {
    const weeksArray = [];
    let currentWeekStart = startOfWeek(startDate, { weekStartsOn: 0 });

    for (let i = 0; i < weeks; i++) {
      const weekDays = eachDayOfInterval({
        start: currentWeekStart,
        end: endOfWeek(currentWeekStart, { weekStartsOn: 0 }),
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
                title={`${format(day, "PPP")}: ${occurrence?.count || 0} occurrences`}
                onClick={() => occurrence && onClick?.(occurrence)}
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
