import { ReactBasesView } from "@/lib/view-class";
import type { BaseViewDef } from "@/types";

import HeatmapCalendarView from "./HeatmapCalendarView";

const HEATMAP_CALENDAR_ID = 'heatmap-calendar';

const HEATMAP_CALENDAR_VIEW: BaseViewDef = {
  id: HEATMAP_CALENDAR_ID,
  name: "Heatmap Calendar",
  icon: "lucide-flame",
  factory: (controller, containerEl) =>
    new ReactBasesView(HEATMAP_CALENDAR_ID, HeatmapCalendarView, controller, containerEl),

  options: () => [
    {
      type: "property",
      displayName: "Date Property",
      key: "dateProperty",
    },
    {
      type: "property",
      displayName: "Track Property",
      key: "trackProperty",
    },
    {
      type: "text",
      displayName: "Start Date (YYYY-MM-DD)",
      key: "startDate",
      placeholder: "YYYY-MM-DD",
    },
    {
      type: "text",
      displayName: "End Date (YYYY-MM-DD)",
      key: "endDate",
      placeholder: "YYYY-MM-DD",
    },
    {
      type: "dropdown",
      displayName: "Color Scheme",
      key: "colorScheme",
      default: "primary",
      options: {
        primary: "Primary",
        semaphor: "Semaphor",
        red: "Red",
        orange: "Orange",
        yellow: "Yellow",
        green: "Green",
        cyan: "Cyan",
        blue: "Blue",
        purple: "Purple",
        magenta: "Magenta",
      },
    },
    {
      type: "toggle",
      displayName: "Reverse Colors",
      key: "reverseColors",
      default: false,
    },
  ],
}

export default HEATMAP_CALENDAR_VIEW;
