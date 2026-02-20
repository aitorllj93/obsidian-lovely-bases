import type { BasesPropertyId, TFile } from "obsidian";

export type CalendarItem = {
  id: string;
  title: string;
  file: TFile;
  startDate: Date;
  endDate: Date;
  color?: string;
  icon?: string;
};

export type StackedEvent = CalendarItem & {
  clampedStart: Date;
  clampedEnd: Date;
  startDay: number;
  endDay: number;
  original: CalendarItem;
  lane: number;
};

export type LinearCalendarConfig = {
  focus: "full" | "half" | "quarter";
  startDateProperty?: BasesPropertyId;
  endDateProperty?: BasesPropertyId;
  titleProperty?: BasesPropertyId;
  colorProperty?: BasesPropertyId;
  iconProperty?: BasesPropertyId;
  date?: string;
};
