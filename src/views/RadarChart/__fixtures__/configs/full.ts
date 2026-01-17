import type { RadarChartConfig } from "../../RadarChartView";

export const FULL_RADAR_CONFIG: RadarChartConfig = {
	aggregationFunction: "average",
	minValue: 0,
	maxValue: 100,
	colorScheme: "contrast",
	fillOpacity: 0.4,
	showAxisLabels: true,
	showLegend: true,
	legendPosition: "bottom",
};
