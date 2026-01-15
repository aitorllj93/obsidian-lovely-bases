import type { BasesPropertyId } from "obsidian";
import { useMemo } from "react";

import { type CalendarItem, LinearCalendar } from "@/components/LinearCalendar";
import { Container } from "@/components/Obsidian/Container";
import { useObsidian } from "@/components/Obsidian/Context";
import { useConfig } from "@/hooks/use-config";
import type { ReactBaseViewProps } from "@/types";

export const LINEAR_CALENDAR_TYPE_ID = "linear-calendar";

export type LinearCalendarConfig = {
  focus: "full" | "half" | "quarter";
  startDateProperty: BasesPropertyId;
  endDateProperty?: BasesPropertyId;
  date?: string;
};

const LinearCalendarView = ({
  config,
  data,
  isEmbedded,
}: ReactBaseViewProps) => {
  const { app } = useObsidian();
  const linearCalendarConfig = useConfig<LinearCalendarConfig>(config, {
    focus: "full",
    startDateProperty: "note.start_date",
    endDateProperty: "note.end_date",
    date: new Date().getFullYear().toString(),
  });

  const referenceDate = useMemo(() => {
    if (linearCalendarConfig.date) {
      const parsed = new Date(linearCalendarConfig.date);
      if (!Number.isNaN(parsed.getTime())) return parsed;
    }
    return new Date();
  }, [linearCalendarConfig.date]);

  const items = useMemo(() => {
    if (!linearCalendarConfig.startDateProperty) return [];

    return data.groupedData.flatMap((group) => {
      return group.entries
        .map((entry) => {
          const startVal = entry.getValue(
            linearCalendarConfig.startDateProperty,
          );
          if (!startVal) return null;

          const startDate = new Date(startVal.toString());
          if (Number.isNaN(startDate.getTime())) return null;

          let endDate = startDate;
          if (linearCalendarConfig.endDateProperty) {
            const endVal = entry.getValue(linearCalendarConfig.endDateProperty);
            if (endVal) {
              const parsedEnd = new Date(endVal.toString());
              if (!Number.isNaN(parsedEnd.getTime())) {
                endDate = parsedEnd;
              }
            }
          }

          const color = entry.getValue("note.color")?.toString();

          return {
            id: entry.file.path,
            title: entry.file.basename,
            file: entry.file,
            startDate,
            endDate,
            color: color === "null" ? undefined : color,
          } as CalendarItem;
        })
        .filter(Boolean) as CalendarItem[];
    });
  }, [
    data,
    linearCalendarConfig.startDateProperty,
    linearCalendarConfig.endDateProperty,
  ]);

  const handleEventClick = (item: CalendarItem) => {
    app.workspace.openLinkText(item.file.path, "", false);
  };

  return (
    <Container isEmbedded={isEmbedded} style={{ userSelect: "none" }}>
      <LinearCalendar
        items={items}
        focus={linearCalendarConfig.focus}
        referenceDate={referenceDate}
        onEventClick={handleEventClick}
      />
    </Container>
  );
};

export default LinearCalendarView;
