import type { BasesPropertyId } from "obsidian";
import { useMemo } from "react";

import { Container } from "@/components/Obsidian/Container";
import RadarChart from "@/components/RadarChart";
import { COLOR_SCHEMES, type ColorScheme } from "@/components/RadarChart/constants";
import { useConfig } from "@/hooks/use-config";
import aggregate, { type AggregationFunction } from "@/lib/aggregate";
import { isHexColor } from "@/lib/colors";
import type { ReactBaseViewProps } from "@/types";


export type LegendPosition = "top" | "bottom" | "left" | "right";

export type RadarChartConfig = {
	aggregationFunction?: AggregationFunction;
	minValue?: number;
	maxValue?: number;
	colorScheme?: ColorScheme;
	customColors?: string | string[];
	fillOpacity?: number;
	showAxisLabels?: boolean;
	showAxisTicks?: boolean;
	showLegend?: boolean;
	legendPosition?: LegendPosition;
};

const RadarChartView = ({
	config,
	data,
	isEmbedded,
}: ReactBaseViewProps) => {
	const viewConfig = useConfig<RadarChartConfig>(config, {
		aggregationFunction: "average",
		minValue: 0,
		maxValue: 100,
		colorScheme: "primary",
		customColors: undefined,
		fillOpacity: 0.3,
		showAxisLabels: true,
    showAxisTicks: true,
		showLegend: true,
		legendPosition: "bottom",
	});
  const properties = config.getOrder();

	const colors = useMemo(() => {
		if (!viewConfig.customColors) return COLOR_SCHEMES[viewConfig.colorScheme ?? "primary"];

		const customColors = (
			typeof viewConfig.customColors === "string"
				? viewConfig.customColors.split(",").map((c) => c.trim())
				: viewConfig.customColors
		).filter(isHexColor);

		return customColors.length > 0 ? customColors : COLOR_SCHEMES[viewConfig.colorScheme ?? "primary"];
	}, [viewConfig.customColors, viewConfig.colorScheme]);



  const radarData = properties.map(prop => {
    return {
      property: config.getDisplayName(prop),
      ...data.groupedData.reduce((acc, group) => {
        acc[group.key?.toString() ?? 'Default'] = aggregate({
          method: viewConfig.aggregationFunction ?? "average",
          minValue: viewConfig.minValue ?? 0,
          maxValue: viewConfig.maxValue ?? 100,
        }, prop as BasesPropertyId, group.entries);
        return acc;
      }, {}),
    };
  });

	if (properties.length === 0) {
		return (
			<Container isEmbedded={isEmbedded}>
				<div className="flex h-full items-center justify-center p-8 text-muted-foreground">
					No numeric properties found. Add numeric properties to your data to
					use the Radar Chart view.
				</div>
			</Container>
		);
	}

	if (radarData.length === 0) {
		return (
			<Container isEmbedded={isEmbedded}>
				<div className="flex h-full items-center justify-center p-8 text-muted-foreground">
					No data available for the Radar Chart.
				</div>
			</Container>
		);
	}
	return (
		<Container isEmbedded={isEmbedded} style={{
      width: "100%",
      padding: "1rem",
      margin: "0 auto",
    }}>
      <RadarChart
        data={radarData}
        colors={colors}
        groups={data.groupedData.map(group => group.key?.toString() ?? 'Default')}
        showAxisLabels={viewConfig.showAxisLabels}
        showAxisTicks={viewConfig.showAxisTicks}
        showLegend={viewConfig.showLegend}
        legendPosition={viewConfig.legendPosition}
        minValue={viewConfig.minValue}
        maxValue={viewConfig.maxValue}
        fillOpacity={viewConfig.fillOpacity}
      />
		</Container>
	);
};

export default RadarChartView;
