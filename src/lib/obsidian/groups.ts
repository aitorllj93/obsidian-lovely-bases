import { type BasesEntry, BasesEntryGroup, StringValue } from "obsidian";

import type { FacetsConfig } from "@/components/Facets/config";

import { parseWikilink } from "./link";

type GroupedGridData = BasesEntryGroup|BasesEntry;

export function getGroupedData(
  groups: BasesEntryGroup[],
  { groupLayout, groupUngroupedItemsDisplay }: Pick<FacetsConfig, 'groupUngroupedItemsDisplay' | 'groupLayout'>
): GroupedGridData[] {
  const resultGroups: BasesEntryGroup[] = [];
  let resultEntries: BasesEntry[] = [];

  for (const group of groups) {
    const groupKey = group.key?.toString();
    if (!groupKey) {
      continue;
    }

    const isMulti = groupKey.includes(",");
    const keys = isMulti
      ? groupKey.split(", ")
      : [groupKey];

    for (const key of keys) {
      const isEmpty = key === "null";

      if (isEmpty && groupUngroupedItemsDisplay === 'hidden') continue;

      if (isEmpty && groupLayout !== 'sections' && groupUngroupedItemsDisplay === 'inline') {
        resultEntries = group.entries;
        continue;
      }

      const title = isEmpty ? "" : parseWikilink(key);
      const newKey = isEmpty ? "" : `[[${title}]]`;

      let resultGroup: BasesEntryGroup | undefined = resultGroups.find((g) => 'key' in g && g.key?.toString() === newKey);

      if (!resultGroup) {
        resultGroup = new BasesEntryGroup();
        resultGroup.key = new StringValue(newKey);
        resultGroup.entries = [];
        resultGroups.push(resultGroup);
      }

      resultGroup.entries.push(...group.entries);
    }
  }

  if (resultEntries) {
    return (resultGroups as GroupedGridData[]).concat(resultEntries);
  } else {
    return resultGroups;
  }
}

export function flattenGroups(groups: BasesEntryGroup[]): BasesEntryGroup[] {
  const result: BasesEntryGroup[] = [];

  for (const group of groups) {
    const groupKey = group.key?.toString();
    if (!groupKey) {
      continue;
    }

    const isMulti = groupKey.includes(",");
    const keys = isMulti
      ? groupKey.split(", ")
      : [groupKey];

    for (const key of keys) {
      const title = key !== "null" ? parseWikilink(key) : "";
      const newKey = `[[${title}]]`;

      let resultGroup: BasesEntryGroup | undefined = result.find((g) => g.key?.toString() === newKey);

      if (!resultGroup) {
        resultGroup = {
          key: new StringValue(newKey),
          entries: [],
          hasKey: () => true,
        };
        result.push(resultGroup);
      }

      resultGroup.entries.push(...group.entries);
    }
  }

  return result;
}
