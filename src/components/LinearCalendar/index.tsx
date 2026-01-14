import { format } from "date-fns";
import type { TFile } from "obsidian";

import { cn } from "@/lib/utils";

export type CalendarItem = {
  id: string;
  title: string;
  file: TFile;
  startDate: Date;
  endDate: Date;
  color?: string;
};

export type LinearCalendarProps = {
  items: CalendarItem[];
  focus: "full" | "half" | "quarter";
  referenceDate: Date;
  onEventClick: (item: CalendarItem) => void;
};

const getMonthName = (monthIndex: number) => {
  const date = new Date(2000, monthIndex, 1);
  return format(date, "MMMM");
};

export const LinearCalendar = ({
  items,
  focus,
  referenceDate,
  onEventClick,
}: LinearCalendarProps) => {
  const currentYear = referenceDate.getFullYear();

  const getMonthIndicesToDisplay = () => {
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

  const daysInMonth = (monthIndex: number, year: number) => {
    return new Date(year, monthIndex + 1, 0).getDate();
  };

  const getEventsForMonth = (monthIndex: number, year: number) => {
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
  const monthIndices = getMonthIndicesToDisplay();

  return (
    <div className="flex flex-col w-full h-full overflow-auto bg-background text-foreground p-4">
      {/* Header Row: Days */}
      <div className="flex border-b border-border sticky top-0 z-10">
        <div className="w-32 shrink-0 font-bold p-2">{currentYear}</div>
        <div className="grow flex relative">
          {Array.from({ length: 31 }, (_, i) => (
            <div
              key={`day-${i.toString()}`}
              className="flex-1 text-center text-sm p-1 min-w-[30px] border-l border-border/80"
            >
              {String(i + 1).padStart(2, "0")}
            </div>
          ))}
        </div>
      </div>

      {/* Rows for Months */}
      {monthIndices.map((monthIndex) => {
        const monthName = getMonthName(monthIndex);
        const isLastMonth = monthIndex === monthIndices.length - 1;
        // Capitalize first letter
        const formattedMonthName =
          monthName.charAt(0).toUpperCase() + monthName.slice(1);
        const daysCount = daysInMonth(monthIndex, currentYear);
        const { events, laneCount } = getEventsForMonth(
          monthIndex,
          currentYear,
        );

        // minimum height for the month row, plus space for events
        // Base height 48px + (laneCount * 24px)
        const rowHeight = Math.max(48, 24 + laneCount * 28);

        return (
          <div
            key={monthIndex}
            className={cn(
              "flex hover:bg-muted/10 transition-colors",
              !isLastMonth && "border-b border-border/60",
            )}
            style={{ minHeight: `${rowHeight}px` }}
          >
            <div className="w-32 shrink-0 font-medium p-2 py-4">
              {formattedMonthName}
            </div>
            <div className="grow relative flex">
              {/* Grid Background */}
              <div className="absolute inset-0 flex w-full h-full pointer-events-none">
                {Array.from({ length: 31 }, (_, i) => {
                  const day = i + 1;
                  const isValidDay = day <= daysCount;
                  return (
                    <div
                      key={`bg-${monthIndex}-${day}`}
                      className={cn(
                        "flex-1 min-w-[30px] border-l border-border/60 h-full",
                        !isValidDay && "bg-muted/20",
                      )}
                    />
                  );
                })}
              </div>

              {/* Events Layer */}
              <div className="absolute inset-0 w-full h-full z-10 mt-1">
                {events.map((event) => {
                  // Calculate position
                  // The grid has 31 columns exactly.
                  // Left = (startDay - 1) / 31 * 100%
                  // Width = (endDay - startDay + 1) / 31 * 100%

                  const leftPercent = ((event.startDay - 1) / 31) * 100;
                  const widthPercent =
                    ((event.endDay - event.startDay + 1) / 31) * 100;
                  const topPos = 4 + event.lane * 26; // 26px per lane (20px height + 6px gap)

                  return (
                    <div
                      key={`${event.id}-${monthIndex}`}
                      className={cn(
                        "absolute h-[20px] rounded-sm text-[10px] text-white overflow-hidden whitespace-nowrap px-1 cursor-pointer hover:brightness-110 shadow-sm transition-all pt-0.5",
                        !event.color && "bg-primary",
                      )}
                      style={{
                        left: `${leftPercent}%`,
                        width: `${widthPercent}%`,
                        top: `${topPos}px`,
                        backgroundColor: event.color,
                      }}
                      title={`${event.title} (${event.original.startDate.toLocaleDateString()} - ${event.original.endDate.toLocaleDateString()})`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick(event.original);
                      }}
                    >
                      {/* Show title if width is reasonably large */}
                      {widthPercent > 3 && (
                        <span className="drop-shadow-md">{event.title}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
