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
      type: "group",
      displayName: "Data Properties",
      items: [
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
          type: "dropdown",
          displayName: "Track Type",
          key: "trackType",
          default: "",
          options: {
            "": "Auto-detect",
            number: "Number",
            boolean: "Boolean (Yes/No)",
            text: "Text (by length)",
            list: "List (by item count)",
          },
        },
      ],
    },
    {
      type: "group",
      displayName: "Date Range",
      items: [
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
      ],
    },
    {
      type: "group",
      displayName: "Display",
      items: [
        {
          type: "dropdown",
          displayName: "Layout",
          key: "layout",
          default: "horizontal",
          options: {
            horizontal: "Horizontal",
            vertical: "Vertical",
          },
        },
        {
          type: "dropdown",
          displayName: "View Mode",
          key: "viewMode",
          default: "week-grid",
          options: {
            "week-grid": "Week Grid (GitHub style)",
            "month-grid": "Month Grid (Calendar style)",
          },
        },
        {
          type: "toggle",
          displayName: "Show Day Labels",
          key: "showDayLabels",
          default: true,
        },
        {
          type: "toggle",
          displayName: "Show Month Labels",
          key: "showMonthLabels",
          default: true,
        },
        {
          type: "toggle",
          displayName: "Show Year Labels",
          key: "showYearLabels",
          default: false,
        },
        {
          type: "toggle",
          displayName: "Show Legend",
          key: "showLegend",
          default: true,
        },
      ],
    },
    {
      type: "group",
      displayName: "Colors",
      items: [
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
        {
          type: "text",
          displayName: "Custom Colors (comma-separated hex)",
          key: "customColors",
          placeholder: "#ebedf0, #9be9a8, #40c463, #30a14e, #216e39",
        },
        {
          type: "text",
          displayName: "Overflow Warning Color",
          key: "overflowColor",
          placeholder: "#ff0000",
        },
      ],
    },
    {
      type: "group",
      displayName: "Value Range",
      items: [
        {
          type: "slider",
          displayName: "Min Value",
          key: "minValue",
          default: 0,
          min: 0,
          step: 1,
          max: 100,
        },
        {
          type: "slider",
          displayName: "Max Value",
          key: "maxValue",
          default: 10,
          min: 0,
          step: 1,
          max: 100,
        },
      ],
    },
  ],
}

export default HEATMAP_CALENDAR_VIEW;
