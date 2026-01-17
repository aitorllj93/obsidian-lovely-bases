import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart as RechartsRadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export type LegendPosition = "top" | "bottom" | "left" | "right";

type RadarDataPoint = {
  property: string;
  [groupKey: string]: string | number;
};

type Props = {
  colors: string[];
  data: RadarDataPoint[];
  showAxisLabels?: boolean;
  showAxisTicks?: boolean;
  showLegend?: boolean;
  legendPosition?: LegendPosition;
  groups: string[];
  minValue?: number;
  maxValue?: number;
  fillOpacity?: number;
};

const RadarChart = ({
  data,
  showAxisLabels = true,
  showAxisTicks = true,
  showLegend = true,
  legendPosition = "bottom",
  minValue = 0,
  maxValue = 100,
  groups = [],
  colors = [],
  fillOpacity = 0.3,
}: Props) => {
  if (data.length === 0) {
    return (
      <div className="flex h-full items-center justify-center p-8 text-muted-foreground">
        No data available for the Radar Chart.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsRadarChart
        data={data}
        margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
      >
        <PolarGrid stroke="var(--border)" />
        <PolarAngleAxis
          dataKey="property"
          tick={
            showAxisLabels ? { fill: "var(--text-muted)", fontSize: 12 } : false
          }
        />
          <PolarRadiusAxis
            angle={90}
            domain={[minValue, maxValue]}
            tick={
              showAxisTicks ? { fill: "var(--text-muted)", fontSize: 10 } : false
            }
            axisLine={false}
          />
        {groups.map((groupKey, index) => (
          <Radar
            key={groupKey}
            name={groupKey}
            dataKey={groupKey}
            stroke={colors[index % colors.length]}
            fill={colors[index % colors.length]}
            fillOpacity={fillOpacity ?? 0.3}
            strokeWidth={2}
          />
        ))}
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "4px",
            color: "var(--text-normal)",
          }}
          formatter={(value: number, name: string) => [value, name]}
        />
        {showLegend && groups.length > 1 && (
          <Legend
            verticalAlign={
              legendPosition === "top" || legendPosition === "bottom"
                ? legendPosition
                : "bottom"
            }
            align={
              legendPosition === "left" || legendPosition === "right"
                ? legendPosition
                : "center"
            }
            wrapperStyle={{ color: "var(--text-normal)" }}
          />
        )}
      </RechartsRadarChart>
    </ResponsiveContainer>
  );
};

export default RadarChart;
