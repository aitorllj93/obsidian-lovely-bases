import { type BasesEntry, type BasesPropertyId, ListValue, type Value } from "obsidian";

export const SUPPORTED_VALUE_TYPES = ["boolean", "list", "string", "number"] as const;

export type AggregationFunction = "average" | "median" | "sum" | "max" | "min";
export type AggregableValueType = typeof SUPPORTED_VALUE_TYPES[number];

type AggregateOptions = {
  method: AggregationFunction;
  minValue?: number;
  maxValue?: number;
}

export const aggregate = (
	{ method, minValue, maxValue }: AggregateOptions,
  property: BasesPropertyId,
	entries: BasesEntry[],
): number => {
	if (entries.length === 0) return 0;

  const valueType = inferAggregableValueType(entries[0].getValue(property));
  const numeric = (value: Value | null) => mapValueToNumber(value, valueType, minValue, maxValue);

  if (method === "average") {
    return entries.reduce(
      (a, b) => a + numeric(b.getValue(property)), 0
    ) / entries.length;
  }

  if (method === "median") {
    const values = entries.map(entry => numeric(entry.getValue(property)));
    const sorted = [...values].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0
      ? sorted[mid]
      : (sorted[mid - 1] + sorted[mid]) / 2;
  }

  if (method === "sum") {
    return entries.reduce((a, b) => a + numeric(b.getValue(property)), 0);
  }

  if (method === "max") {
    return Math.max(...entries.map(entry => numeric(entry.getValue(property))));
  }

  if (method === "min") {
    return Math.min(...entries.map(entry => numeric(entry.getValue(property))));
  }

  return entries.reduce((a, b) => a + numeric(b.getValue(property)), 0) / entries.length;
};

export const inferAggregableValueType = (value: Value | null): AggregableValueType => {
	if (!value) return "number";

	const valueType = (value.constructor as typeof Value & { type: string }).type as AggregableValueType;

  return SUPPORTED_VALUE_TYPES.includes(valueType) ? valueType : "number";
};

export const mapValueToNumber = (
	value: Value | null,
	type: AggregableValueType,
  minValue = 0,
  maxValue = 10,
): number => {
	if (!value) return minValue;

  if (type === "boolean") {
    return value.isTruthy() ? maxValue : minValue;
  }

  if (type === "string") {
    const str = value.toString();
    if (!str || str === "" || str === "null") return minValue;
    return str.length;
  }

  if (type === "list") {
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

export default aggregate;
