import type { RadarChartConfig } from "../../RadarChartView";

export const DEFAULT_RADAR_CONFIG: RadarChartConfig = {
	aggregationFunction: "average",
	minValue: 0,
	maxValue: 100,
	colorScheme: "primary",
	fillOpacity: 0.3,
	showAxisLabels: true,
	showLegend: true,
	legendPosition: "bottom",
};
