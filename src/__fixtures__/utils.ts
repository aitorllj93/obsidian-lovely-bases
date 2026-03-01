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

const statusOrder = ['open', 'in-progress', 'blocked', 'done', 'wont-do'];

export const toBasesEntryGroups = (array: BasesEntry[], key: BasesPropertyId): BasesEntryGroup[] => {
  return Object.entries(groupBy(array, key))
    .map(([key, entries]) => aBasesEntryGroup(key, entries as BasesEntry[]))
    .sort((a, b) => {
      const aKey = a.key?.toString() as string;
      const bKey = b.key?.toString() as string;

      if (key === 'note.status') {
        return statusOrder.indexOf(aKey) - statusOrder.indexOf(bKey);
      }

      return Number.parseInt(aKey ?? '0', 10) -
        Number.parseInt(bKey ?? '0', 10)
    });
}
