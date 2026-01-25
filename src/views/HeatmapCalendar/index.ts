
import { ReactBasesView } from "@/lib/view-class";
import type { BaseViewDef } from "@/types";

import { HEATMAP_CALENDAR_OPTIONS } from "./constants";
import HeatmapCalendarView from "./HeatmapCalendarView";

const HEATMAP_CALENDAR_ID = "heatmap-calendar";

const HEATMAP_CALENDAR_VIEW: BaseViewDef = {
  id: HEATMAP_CALENDAR_ID,
  name: "Heatmap Calendar",
  icon: "lucide-flame",
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
