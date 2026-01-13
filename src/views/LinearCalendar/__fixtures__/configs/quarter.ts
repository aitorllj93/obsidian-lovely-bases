import type { LinearCalendarConfig } from "../../LinearCalendarView";

export const QUARTER_BASE_CONFIG: LinearCalendarConfig = {
  focus: "quarter",
  startDateProperty: "note.created",
  endDateProperty: "note.created",
  date: new Date().getFullYear().toString(),
};
