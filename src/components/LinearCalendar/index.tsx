import type { BasesEntry } from "obsidian";
import { useMemo } from "react";

import type { EntryClickEventHandler, EntryHoverEventHandler } from "@/types";

import Header from "./components/Header";
import Row from "./components/Row";
import { useCalendarItems } from "./hooks/use-calendar-items";
import type { LinearCalendarConfig } from "./types";
import {
  getDisplayedMonthIndices
} from "./utils";

type Props = {
  calendarConfig: LinearCalendarConfig;
  entries: BasesEntry[];
  onEntryClick: EntryClickEventHandler;
  onEntryHover: EntryHoverEventHandler;
};

export const LinearCalendar = ({
  calendarConfig,
  entries,
  onEntryClick,
}: Props) => {
  const items = useCalendarItems(entries, calendarConfig);

  const referenceDate = useMemo(() => {
    if (calendarConfig.date) {
      const parsed = new Date(calendarConfig.date);
      if (!Number.isNaN(parsed.getTime())) return parsed;
    }
    return new Date();
  }, [calendarConfig.date]);

  const currentYear = referenceDate.getFullYear();
  const monthIndices = getDisplayedMonthIndices(calendarConfig.focus, referenceDate);

  return (
    <div className="flex flex-col w-full h-full overflow-auto bg-background text-foreground">
      <Header currentYear={currentYear} />

      {/* Rows for Months */}
      {monthIndices.map((monthIndex) => (
        <Row
          key={monthIndex}
          currentYear={currentYear}
          items={items}
          monthIndex={monthIndex}
          isLastMonth={monthIndex === monthIndices.length - 1}
          onEntryClick={onEntryClick}
        />
      ))}
    </div>
  );
};
