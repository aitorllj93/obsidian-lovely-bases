import type { BasesEntry } from "obsidian";
import type { CalendarItem, LinearCalendarConfig } from "../types";

export const useCalendarItems = (
  data: BasesEntry[],
  linearCalendarConfig: LinearCalendarConfig
): CalendarItem[] => {
  if (!linearCalendarConfig.startDateProperty) return [];

  return data.map((entry) => {
    if (!linearCalendarConfig.startDateProperty) {
      return null;
    }
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

    const color = linearCalendarConfig.colorProperty ? entry.getValue(linearCalendarConfig.colorProperty)?.toString() : undefined;
    const icon = linearCalendarConfig.iconProperty ? entry.getValue(linearCalendarConfig.iconProperty)?.toString() : undefined;
    const title = linearCalendarConfig.titleProperty ? entry.getValue(linearCalendarConfig.titleProperty)?.toString() : entry.file.basename;

    return {
      id: entry.file.path,
      title,
      file: entry.file,
      startDate,
      endDate,
      color: color === "null" ? undefined : color,
      icon: icon === "null" ? undefined : icon,
    } as CalendarItem;
  })
    .filter(Boolean) as CalendarItem[]
};
