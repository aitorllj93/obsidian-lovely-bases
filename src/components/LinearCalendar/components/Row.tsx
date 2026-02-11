import { cn } from "@/lib/utils";
import type { EntryClickEventHandler } from "@/types";

import type { CalendarItem } from "../types";
import { daysInMonth, getEventsForMonth, getMonthName } from "../utils";

import Events from "./Events";
import Grid from "./Grid";

type Props = {
  currentYear: number;
  isLastMonth: boolean;
  items: CalendarItem[];
  monthIndex: number;
  onEntryClick: EntryClickEventHandler;
};

export default function MonthRow({
  currentYear,
  isLastMonth,
  items,
  monthIndex,
  onEntryClick,
}: Props) {
  const monthName = getMonthName(monthIndex);
  // Capitalize first letter
  const formattedMonthName =
    monthName.charAt(0).toUpperCase() + monthName.slice(1);
  const daysCount = daysInMonth(monthIndex, currentYear);
  const { events, laneCount } = getEventsForMonth(
    items,
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
        <Grid monthIndex={monthIndex} daysCount={daysCount} />

        {/* Events Layer */}
        <div className="absolute inset-0 w-full h-full z-10 mt-1">
          {events.map((event) => (
            <Events
              key={`${event.id}-${monthIndex}`}
              event={event}
              monthIndex={monthIndex}
              onEntryClick={onEntryClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
