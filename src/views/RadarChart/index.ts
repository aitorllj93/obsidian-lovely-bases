import { ReactBasesView } from "@/lib/view-class";
import type { BaseViewDef } from "@/types";

import RadarChartView from "./RadarChartView";

const RADAR_CHART_ID = "radar-chart";

const RADAR_CHART_VIEW: BaseViewDef = {
	id: RADAR_CHART_ID,
	name: "Radar Chart",
	icon: "lucide-hexagon",
	factory: (controller, containerEl) =>
		new ReactBasesView(RADAR_CHART_ID, RadarChartView, controller, containerEl),

	options: () => [
		{
			type: "group",
			displayName: "Data",
			items: [
				{
					type: "dropdown",
					displayName: "Aggregation Function",
					key: "aggregationFunction",
					default: "average",
					options: {
						average: "Average",
						median: "Median",
						sum: "Sum",
						max: "Maximum",
						min: "Minimum",
					},
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
					default: 100,
					min: 0,
					step: 1,
					max: 1000,
				},
			],
		},
		{
			type: "group",
			displayName: "Appearance",
			items: [
				{
					type: "dropdown",
					displayName: "Color Scheme",
					key: "colorScheme",
					default: "primary",
					options: {
						primary: "Primary",
						red: "Red",
						orange: "Orange",
						yellow: "Yellow",
						green: "Green",
						cyan: "Cyan",
						blue: "Blue",
						purple: "Purple",
						magenta: "Magenta",
            semaphor: "Semaphor",
            rainbow: "Rainbow",
            contrast: "Contrast",
					},
				},
				{
					type: "text",
					displayName: "Custom Colors (comma-separated hex)",
					key: "customColors",
					placeholder: "#3b82f6, #22c55e, #f59e0b, #ef4444, #8b5cf6",
				},
				{
					type: "slider",
					displayName: "Fill Opacity",
					key: "fillOpacity",
					default: 0.3,
					min: 0,
					step: 0.05,
					max: 1,
				},
				{
					type: "toggle",
					displayName: "Show Axis Labels",
					key: "showAxisLabels",
					default: true,
				},
        {
					type: "toggle",
					displayName: "Show Axis Ticks",
					key: "showAxisTicks",
					default: true,
				},
				{
					type: "toggle",
					displayName: "Show Legend",
					key: "showLegend",
					default: true,
				},
				{
					type: "dropdown",
					displayName: "Legend Position",
					key: "legendPosition",
					default: "bottom",
					options: {
						top: "Top",
						bottom: "Bottom",
						left: "Left",
						right: "Right",
					},
				},
			],
		},
	],
};

export default RADAR_CHART_VIEW;
