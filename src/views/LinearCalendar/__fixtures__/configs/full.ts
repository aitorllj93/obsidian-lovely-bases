import type { LinearCalendarConfig } from "../../LinearCalendarView";

export const FULL_BASE_CONFIG: LinearCalendarConfig = {
  focus: 'full',
  startDateProperty: 'note.created',
  endDateProperty: 'note.created',
  date: new Date().getFullYear().toString(),
};
