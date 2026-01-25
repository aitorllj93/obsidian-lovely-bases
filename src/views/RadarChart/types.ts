export type RadarChartConfig = {
  /* Data */
  aggregationFunction: "average" | "median" | "sum" | "max" | "min";
  /* Value Range */
  minValue: number;
  maxValue: number;
  /* Display */
  showAxisLabels: boolean;
  showAxisTicks: boolean;
  showLegend: boolean;
  legendPosition: "top" | "bottom" | "left" | "right";
  /* Appearance */
  colorScheme: string;
  customColors: string | undefined;
  fillOpacity: number;
};
