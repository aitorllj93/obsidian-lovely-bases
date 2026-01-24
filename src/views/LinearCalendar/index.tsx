import { ReactBasesView } from "@/lib/view-class";
import type { BaseViewDef } from "@/types";

import { LINEAR_CALENDAR_OPTIONS } from "./constants";
import LinearCalendarView from "./LinearCalendarView";

const LINEAR_CALENDAR_ID = "linear-calendar";

const LINEAR_CALENDAR_VIEW: BaseViewDef = {
  id: LINEAR_CALENDAR_ID,
  name: "Linear Calendar",
  icon: "lucide-calendar-days",
  factory: (controller, containerEl) =>
    new ReactBasesView(LINEAR_CALENDAR_ID, LinearCalendarView, controller, containerEl),
  options: () => LINEAR_CALENDAR_OPTIONS,
};

export default LINEAR_CALENDAR_VIEW;
