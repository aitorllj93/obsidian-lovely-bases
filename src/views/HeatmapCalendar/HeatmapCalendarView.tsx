import { type BasesPropertyId, ListValue, type Value } from "obsidian";
import { useMemo } from "react";

import { HeatmapCalendar, type Occurrence } from "@/components/HeatmapCalendar";
import { SUPPORTED_VALUE_TYPES, type TrackType } from "@/components/HeatmapCalendar/hooks/useHeatmapData";
import type { COLOR_SCHEMES } from "@/components/HeatmapCalendar/utils";
import { Container } from "@/components/Obsidian/Container";
import { useConfig } from "@/hooks/use-config";
import { isHexColor } from "@/lib/colors";
import { FORMATS, format, parse, subYears } from "@/lib/date";
import type { ReactBaseViewProps } from "@/types";
import { DEFAULTS } from "./constants";

const MAX_DATE_RANGE_YEARS = 10;

const detectTrackType = (value: Value | null): TrackType => {
	if (!value) return "number";

	const valueType = (value.constructor as typeof Value & { type: string }).type as TrackType;

  return SUPPORTED_VALUE_TYPES.includes(valueType) ? valueType : "number";
};

const extractTrackValue = (
	value: Value | null,
	trackType: TrackType,
  minValue = 0,
  maxValue = 10,
): number => {
	if (!value) return minValue;

  if (trackType === "boolean") {
    return value.isTruthy() ? maxValue : minValue;
  }

  if (trackType === "string") {
    const str = value.toString();
    if (!str || str === "" || str === "null") return minValue;
    return str.length;
  }

  if (trackType === "list") {
    if (value instanceof ListValue) {
      const listValue = value as unknown as { value?: Value[]; values?: Value[] };
      if (listValue.value) return listValue.value.length;
      if (listValue.values) return listValue.values.length;
    }
    const listStr = value.toString();
    if (!listStr || listStr === "null") return minValue;
    return listStr.split(",").length;
  }

  return Number(value.toString());
};

export type HeatmapCalendarConfig = {
  dateProperty: BasesPropertyId;
  trackProperty: BasesPropertyId;
  colorScheme?: keyof typeof COLOR_SCHEMES;
  shape?: "circle" | "square" | "rounded";
  reverseColors?: boolean;
  startDate?: string;
  endDate?: string;
  layout?: "horizontal" | "vertical";
  viewMode?: "week-grid" | "month-grid";
  showDayLabels?: boolean;
  showMonthLabels?: boolean;
  showYearLabels?: boolean;
  showLegend?: boolean;
  minValue?: number;
  maxValue?: number;
  trackType?: TrackType;
  customColors?: string;
  overflowColor?: string;
};

const HeatmapCalendarView = ({
  config,
  data,
  isEmbedded,
  onEntryClick,
}: ReactBaseViewProps) => {
  const viewConfig = useConfig<HeatmapCalendarConfig>(config, {
    dateProperty: DEFAULTS.dateProperty,
    trackProperty: DEFAULTS.trackProperty,
    trackType: DEFAULTS.trackType,
    minValue: DEFAULTS.minValue,
    maxValue: DEFAULTS.maxValue,
    colorScheme: DEFAULTS.colorScheme,
    customColors: DEFAULTS.customColors,
    overflowColor: DEFAULTS.overflowColor,
    reverseColors: DEFAULTS.reverseColors,
    startDate: DEFAULTS.startDate,
    endDate: DEFAULTS.endDate,
    layout: DEFAULTS.layout,
    viewMode: DEFAULTS.viewMode,
    showDayLabels: DEFAULTS.showDayLabels,
    showMonthLabels: DEFAULTS.showMonthLabels,
    showYearLabels: DEFAULTS.showYearLabels,
    showLegend: DEFAULTS.showLegend,
    shape: DEFAULTS.shape,
  });

  const startDate = useMemo(() => {
    const now = new Date();
    const minAllowedDate = subYears(now, MAX_DATE_RANGE_YEARS);

    if (viewConfig.startDate) {
      const parsed = parse(viewConfig.startDate);
      if (parsed && !Number.isNaN(parsed.getTime())) {
        return parsed < minAllowedDate ? minAllowedDate : parsed;
      }
    }
    return subYears(now, 1);
  }, [viewConfig.startDate]);

  const endDate = useMemo(() => {
    if (viewConfig.endDate) {
      const parsed = parse(viewConfig.endDate);
      if (parsed && !Number.isNaN(parsed.getTime())) return parsed;
    }
    return new Date();
  }, [viewConfig.endDate]);

  const parsedCustomColors = useMemo(() => {
    if (!viewConfig.customColors) return undefined;

    const colors = (typeof viewConfig.customColors === "string"
      ? (viewConfig.customColors as string).split(",").map((c) => c.trim())
      : viewConfig.customColors as string[]
    ).filter(isHexColor);

    return colors.length > 0 ? colors : undefined;
  }, [viewConfig.customColors]);

  const parsedOverflowColor = useMemo(() => {
    if (!viewConfig.overflowColor) return undefined;
    return isHexColor(viewConfig.overflowColor.trim())
      ? viewConfig.overflowColor.trim()
      : undefined;
  }, [viewConfig.overflowColor]);

  const groups = useMemo<
    {
      key: string;
      trackType: TrackType;
      minValue: number;
      maxValue: number;
      entries: Occurrence[];
    }[]
  >(() => {
    if (!viewConfig.dateProperty) return [];
    if (!viewConfig.trackProperty) return [];

    return data.groupedData.map((group) => {
      let trackType: TrackType = viewConfig.trackType ?? "number";
      const minValue: number = viewConfig.minValue ?? 0;
      const maxValue: number = viewConfig.maxValue ?? 10;

      const entries = group.entries
        .map((entry, index) => {
          const dateValue = entry.getValue(viewConfig.dateProperty);
          const countValue = entry.getValue(viewConfig.trackProperty);

          if (index === 0 && !viewConfig.trackType) {
            // infer track type from the first value
            trackType = detectTrackType(countValue);
          }

          if (!dateValue) return null;

          // Convert date value to ISO string format (YYYY-MM-DD)
          let date: string;
          if (dateValue instanceof Date) {
            date = format(dateValue as Date, FORMATS.DATE_ISO);
          } else {
            const dateObj = parse(dateValue.toString());
            if (Number.isNaN(dateObj.getTime())) return null;
            date = format(dateObj, FORMATS.DATE_ISO);
          }

          const count = extractTrackValue(countValue, trackType, minValue, maxValue);

          return {
            date,
            count,
            file: entry.file,
          };
        })
        .filter(Boolean) as Occurrence[];

      return {
        key: group.key?.toString() ?? "",
        trackType,
        minValue,
        maxValue,
        entries,
      };
    });
  }, [data, viewConfig.dateProperty, viewConfig.trackProperty, viewConfig.trackType, viewConfig.minValue, viewConfig.maxValue]);

  return (
    <Container isEmbedded={isEmbedded} style={{ userSelect: "none" }}>
      {groups.map((g) => (
        <HeatmapCalendar
          key={g.key}
          colorScheme={viewConfig.colorScheme}
          reverseColors={viewConfig.reverseColors}
          data={g.entries}
          startDate={startDate}
          endDate={endDate}
          layout={viewConfig.layout}
          viewMode={viewConfig.viewMode}
          showDayLabels={viewConfig.showDayLabels}
          showMonthLabels={viewConfig.showMonthLabels}
          showYearLabels={viewConfig.showYearLabels}
          showLegend={viewConfig.showLegend}
          minValue={g.minValue}
          maxValue={g.maxValue}
          trackType={g.trackType}
          shape={viewConfig.shape}
          customColors={parsedCustomColors}
          overflowColor={parsedOverflowColor}
          onEntryClick={onEntryClick}
        />
      ))}
    </Container>
  );
};

export default HeatmapCalendarView;
