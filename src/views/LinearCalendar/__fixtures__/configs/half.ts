import type { LinearCalendarConfig } from "../../LinearCalendarView";

export const HALF_BASE_CONFIG: LinearCalendarConfig = {
  focus: 'half',
  startDateProperty: 'note.created',
  endDateProperty: 'note.created',
  date: new Date().getFullYear().toString()
};
