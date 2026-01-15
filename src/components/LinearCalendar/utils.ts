import { FORMATS, format } from "@/lib/date";
import type { CalendarItem } from "./index";

export const getMonthName = (monthIndex: number) => {
  const date = new Date(2000, monthIndex, 1);
  return format(date, FORMATS.MONTH_LONG);
};

export const daysInMonth = (monthIndex: number, year: number) => {
  return new Date(year, monthIndex + 1, 0).getDate();
};

export type StackedEvent = CalendarItem & {
  clampedStart: Date;
  clampedEnd: Date;
  startDay: number;
  endDay: number;
  original: CalendarItem;
  lane: number;
};

export const getEventsForMonth = (
  items: CalendarItem[],
  monthIndex: number,
  year: number,
): { events: StackedEvent[]; laneCount: number } => {
  const monthStart = new Date(year, monthIndex, 1);
  const monthEnd = new Date(year, monthIndex + 1, 0);

  // 1. Filter and normalize events
  const monthEvents = items
    .filter((item) => {
      return item.startDate <= monthEnd && item.endDate >= monthStart;
    })
    .map((item) => {
      // Clamp start/end to current month
      const start = item.startDate < monthStart ? monthStart : item.startDate;
      const end = item.endDate > monthEnd ? monthEnd : item.endDate;

      return {
        ...item,
        clampedStart: start,
        clampedEnd: end,
        startDay: start.getDate(),
        endDay: end.getDate(),
        original: item,
      };
    });

  // 2. Sort by start date, then duration (longer first to optimize packing)
  monthEvents.sort((a, b) => {
    if (a.clampedStart.getTime() !== b.clampedStart.getTime()) {
      return a.clampedStart.getTime() - b.clampedStart.getTime();
    }
    return (
      b.clampedEnd.getTime() -
      b.clampedStart.getTime() -
      (a.clampedEnd.getTime() - a.clampedStart.getTime())
    );
  });

  // 3. Stack events
  const lanes: number[] = []; // End time of last event in each lane
  const stackedEvents = monthEvents.map((event) => {
    let laneIndex = -1;

    // Find first available lane
    for (let i = 0; i < lanes.length; i++) {
      if (lanes[i] < event.clampedStart.getTime()) {
        laneIndex = i;
        break;
      }
    }

    if (laneIndex === -1) {
      laneIndex = lanes.length;
      lanes.push(0);
    }

    lanes[laneIndex] = event.clampedEnd.getTime();

    return {
      ...event,
      lane: laneIndex,
    };
  });

  return { events: stackedEvents, laneCount: lanes.length };
};

export const getDisplayedMonthIndices = (
  focus: "full" | "half" | "quarter",
  referenceDate: Date,
) => {
  const monthIndex = referenceDate.getMonth(); // 0-11
  const allMonths = Array.from({ length: 12 }, (_, i) => i);

  if (focus === "half") {
    const isSecondHalf = monthIndex >= 6;
    const start = isSecondHalf ? 6 : 0;
    return allMonths.slice(start, start + 6);
  }

  if (focus === "quarter") {
    const quarter = Math.floor(monthIndex / 3);
    const start = quarter * 3;
    return allMonths.slice(start, start + 3);
  }

  // full
  return allMonths;
};
