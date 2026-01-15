import type { LinearCalendarConfig } from "../../LinearCalendarView";

export const DEFAULT_BASE_CONFIG: LinearCalendarConfig = {
  focus: 'full',
  startDateProperty: 'note.start_date',
  endDateProperty: 'note.end_date',
  date: '2026',
  colorProperty: undefined,
  iconProperty: undefined,
};
