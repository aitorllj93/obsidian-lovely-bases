import type { TFile } from "obsidian";

import type { EntryClickEventHandler, EntryHoverEventHandler } from "@/types";

import { CalendarHeader } from "./CalendarHeader";
import { MonthRow } from "./MonthRow";
import { daysInMonth, getDisplayedMonthIndices, getEventsForMonth, getMonthName } from "./utils";

export type CalendarItem = {
  id: string;
  title: string;
  file: TFile;
  startDate: Date;
  endDate: Date;
  color?: string;
  icon?: string;
};

type Props = {
  items: CalendarItem[];
  focus: "full" | "half" | "quarter";
  referenceDate: Date;
  onEntryClick: EntryClickEventHandler;
  onEntryHover: EntryHoverEventHandler;
};

export const LinearCalendar = ({
  items,
  focus,
  referenceDate,
  onEntryClick,
}: Props) => {
  const currentYear = referenceDate.getFullYear();
  const monthIndices = getDisplayedMonthIndices(focus, referenceDate);

  return (
    <div className="flex flex-col w-full h-full overflow-auto bg-background text-foreground p-4">
      <CalendarHeader currentYear={currentYear} />

      {/* Rows for Months */}
      {monthIndices.map((monthIndex) => {
        const monthName = getMonthName(monthIndex);
        const isLastMonth = monthIndex === monthIndices.length - 1;
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
          <MonthRow
            key={monthIndex}
            monthIndex={monthIndex}
            formattedMonthName={formattedMonthName}
            isLastMonth={isLastMonth}
            rowHeight={rowHeight}
            daysCount={daysCount}
            events={events}
            onEntryClick={onEntryClick}
          />
        );
      })}
    </div>
  );
};
