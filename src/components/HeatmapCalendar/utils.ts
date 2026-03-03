import { ListValue, type Value } from "obsidian";

import { HEATMAP_CALENDAR_CONFIG_DEFAULTS, SUPPORTED_VALUE_TYPES, type TrackType } from "./config";

export const detectTrackType = (value: Value | null): TrackType => {
  if (!value) return HEATMAP_CALENDAR_CONFIG_DEFAULTS.trackType;

  const valueType = (value.constructor as typeof Value & { type: string }).type as TrackType;

  return SUPPORTED_VALUE_TYPES.includes(valueType)
    ? valueType : HEATMAP_CALENDAR_CONFIG_DEFAULTS.trackType;
};

export const extractTrackValue = (
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

export const normalizeValue = (
  value: number,
  minValue: number,
  maxValue: number,
  steps: number,
): { normalizedIndex: number; isOverflow: boolean } => {
  if (value > maxValue) {
    return { normalizedIndex: steps - 1, isOverflow: true };
  }
  if (value <= minValue) {
    return { normalizedIndex: 0, isOverflow: false };
  }
  if (maxValue <= minValue) {
    return { normalizedIndex: value >= maxValue ? steps - 1 : 0, isOverflow: false };
  }
  const range = maxValue - minValue;
  const normalized = (value - minValue) / range;
  const index = Math.ceil(normalized * (steps - 1));
  return { normalizedIndex: index, isOverflow: false };
};
