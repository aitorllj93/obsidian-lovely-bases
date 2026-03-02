
import { ReactBasesView } from "@/lib/view-class";
import type { BaseViewDef } from "@/types";
import { HEATMAP_CALENDAR_ID, LOVELY_VIEW_ICONS, LOVELY_VIEW_NAMES } from "@/views/constants";

import { HEATMAP_CALENDAR_OPTIONS } from "./constants";
import HeatmapCalendarView from "./HeatmapCalendarView";

const HEATMAP_CALENDAR_VIEW: BaseViewDef = {
  id: HEATMAP_CALENDAR_ID,
  name: LOVELY_VIEW_NAMES[HEATMAP_CALENDAR_ID],
  icon: LOVELY_VIEW_ICONS[HEATMAP_CALENDAR_ID],
  factory: (controller, containerEl) =>
    new ReactBasesView(
      HEATMAP_CALENDAR_ID,
      HeatmapCalendarView,
      controller,
      containerEl
    ),
  options: () => HEATMAP_CALENDAR_OPTIONS,
};

export default HEATMAP_CALENDAR_VIEW;
