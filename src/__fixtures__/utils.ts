import type { BasesEntry, BasesPropertyId } from "obsidian";

const keyFn = (entry: BasesEntry, key: BasesPropertyId) => entry.getValue(key)?.toString() as string;

export const groupBy = (array: BasesEntry[], key: BasesPropertyId): Record<string, BasesEntry[]> => {
  return array.reduce((acc, item) => {
    const value = keyFn(item, key);
    acc[value] = [...(acc[value] || []), item];
    return acc;
  }, {} as Record<string, BasesEntry[]>);
};
