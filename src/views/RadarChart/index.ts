import { ReactBasesView } from "@/lib/view-class";
import type { BaseViewDef } from "@/types";

import { RADAR_CHART_OPTIONS } from "./constants";
import RadarChartView from "./RadarChartView";

const RADAR_CHART_ID = "radar-chart";

const RADAR_CHART_VIEW: BaseViewDef = {
  id: RADAR_CHART_ID,
  name: "Radar Chart",
  icon: "lucide-hexagon",
  factory: (controller, containerEl) =>
    new ReactBasesView(RADAR_CHART_ID, RadarChartView, controller, containerEl),
  options: () => RADAR_CHART_OPTIONS,
};

export default RADAR_CHART_VIEW;
