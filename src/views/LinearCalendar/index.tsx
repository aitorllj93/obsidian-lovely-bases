import { ReactBasesView } from "@/lib/view-class";
import type { BaseViewDef } from "@/types";
import { LINEAR_CALENDAR_ID, LOVELY_VIEW_ICONS, LOVELY_VIEW_NAMES } from "@/views/constants";

import { LINEAR_CALENDAR_OPTIONS } from "./constants";
import LinearCalendarView from "./LinearCalendarView";

const LINEAR_CALENDAR_VIEW: BaseViewDef = {
  id: LINEAR_CALENDAR_ID,
  name: LOVELY_VIEW_NAMES[LINEAR_CALENDAR_ID],
  icon: LOVELY_VIEW_ICONS[LINEAR_CALENDAR_ID],
  factory: (controller, containerEl) =>
    new ReactBasesView(LINEAR_CALENDAR_ID, LinearCalendarView, controller, containerEl),
  options: () => LINEAR_CALENDAR_OPTIONS,
};

export default LINEAR_CALENDAR_VIEW;
