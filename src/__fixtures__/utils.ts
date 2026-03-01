import type { BasesEntry, BasesEntryGroup, BasesPropertyId } from "obsidian";

import { aBasesEntryGroup } from "@/__mocks__";

const keyFn = (entry: BasesEntry, key: BasesPropertyId) => entry.getValue(key)?.toString() as string;

export const groupBy = (array: BasesEntry[], key: BasesPropertyId): Record<string, BasesEntry[]> => {
  return array.reduce((acc, item) => {
    const value = keyFn(item, key);
    acc[value] = [...(acc[value] || []), item];
    return acc;
  }, {} as Record<string, BasesEntry[]>);
};

export const toBasesEntryGroups = (array: BasesEntry[], key: BasesPropertyId): BasesEntryGroup[] => {
  return Object.entries(groupBy(array, key))
    .map(([key, entries]) => aBasesEntryGroup(key, entries as BasesEntry[]))
    .sort((a, b) =>
      Number.parseInt(a.key?.toString() ?? '0', 10) -
      Number.parseInt(b.key?.toString() ?? '0', 10)
    );
}
