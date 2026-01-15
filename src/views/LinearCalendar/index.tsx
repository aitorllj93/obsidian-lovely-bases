import { ReactBasesView } from "@/lib/view-class";
import type { BaseViewDef } from "@/types";

import LinearCalendarView from "./LinearCalendarView";

const LINEAR_CALENDAR_ID = "linear-calendar";

const LINEAR_CALENDAR_VIEW: BaseViewDef = {
  id: LINEAR_CALENDAR_ID,
  name: "Linear Calendar",
  icon: "lucide-calendar-days",
  factory: (controller, containerEl) =>
    new ReactBasesView(LINEAR_CALENDAR_ID, LinearCalendarView, controller, containerEl),
  options: () => [
    {
      type: "dropdown",
      displayName: "Focus",
      key: "focus",
      default: "full",
      options: {
        full: "Full",
        half: "Half",
        quarter: "Quarter",
      },
    },
    {
      type: "property",
      displayName: "Start Date Property",
      key: "startDateProperty",
      default: "note.created",
    },
    {
      type: "property",
      displayName: "End Date Property",
      key: "endDateProperty",
    },
    {
      type: "property",
      displayName: "Color Property",
      key: "colorProperty",
    },
    {
      type: "property",
      displayName: "Icon Property",
      key: "iconProperty",
    },
    {
      type: "text",
      displayName: "Reference Date (YYYY-MM-DD)",
      key: "date",
      default: "",
      placeholder: "YYYY-MM-DD",
    },
  ],
}

export default LINEAR_CALENDAR_VIEW;
