import type { BasesPropertyId } from "obsidian";

export type LinearCalendarConfig = {
  /* Data */
  startDateProperty?: BasesPropertyId;
  endDateProperty?: BasesPropertyId;
  titleProperty?: BasesPropertyId;
  /* Date Range */
  date?: string;
  focus?: "full" | "half" | "quarter";
  /* Appearance */
  colorProperty?: BasesPropertyId;
  iconProperty?: BasesPropertyId;
};
