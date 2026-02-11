
import { LinearCalendar } from "@/components/LinearCalendar";
import type { LinearCalendarConfig } from "@/components/LinearCalendar/types";
import { Container } from "@/components/Obsidian/Container";
import { useConfig } from "@/hooks/use-config";
import type { ReactBaseViewProps } from "@/types";

export const LINEAR_CALENDAR_TYPE_ID = "linear-calendar";

export type { LinearCalendarConfig } from "@/components/LinearCalendar/types";

const LinearCalendarView = ({
  config,
  data,
  isEmbedded,
  onEntryClick,
  onEntryHover,
}: ReactBaseViewProps) => {
  const linearCalendarConfig = useConfig<LinearCalendarConfig>(config, {
    focus: "full",
    startDateProperty: "note.start_date",
    endDateProperty: undefined,
    titleProperty: undefined,
    colorProperty: undefined,
    iconProperty: undefined,
    date: new Date().getFullYear().toString(),
  });

  return (
    <Container isEmbedded={isEmbedded} style={{ userSelect: "none" }}>
      <LinearCalendar
        calendarConfig={linearCalendarConfig}
        entries={data.data}
        onEntryClick={onEntryClick}
        onEntryHover={onEntryHover}
      />
    </Container>
  );
};

export default LinearCalendarView;
