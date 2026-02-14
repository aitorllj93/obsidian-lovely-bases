import { type BasesEntry, type BasesEntryGroup, StringValue } from "obsidian";

import type { GroupConfig } from "@/components/Group/types";

import { parseWikilink } from "./link";

export function getGroupedData(
  groups: BasesEntryGroup[],
  { groupUngroupedItemsDisplay }: Pick<GroupConfig, 'groupUngroupedItemsDisplay'>
): (BasesEntryGroup|BasesEntry)[] {
  const resultGroups: BasesEntryGroup[] = [];
  let resultEntries: BasesEntry[];

  for (const group of groups) {
    const groupKey = group.key.toString();
    const isMulti = groupKey.includes(",");
    const keys = isMulti
      ? groupKey.split(", ")
      : [groupKey];

    for (const key of keys) {
      const isEmpty = key === "null";

      if (isEmpty && groupUngroupedItemsDisplay === 'hidden') continue;

      if (isEmpty && groupUngroupedItemsDisplay === 'inline') {
        resultEntries = group.entries;
        continue;
      }

      const title = isEmpty ? "" : parseWikilink(key);
      const newKey = isEmpty ? "" : `[[${title}]]`;

      let resultGroup: BasesEntryGroup | undefined = resultGroups.find((g) => g.key?.toString() === newKey);

      if (!resultGroup) {
        resultGroup = {
          key: new StringValue(newKey),
          entries: [],
          hasKey: () => true,
        };
        resultGroups.push(resultGroup);
      }

      resultGroup.entries.push(...group.entries);
    }
  }

  if (resultEntries) {
    return (resultGroups as (BasesEntryGroup|BasesEntry)[]).concat(resultEntries);
  } else {
    return resultGroups;
  }
}

export function flattenGroups(groups: BasesEntryGroup[]): BasesEntryGroup[] {
  const result: BasesEntryGroup[] = [];

  for (const group of groups) {
    const isMulti = group.key.toString().includes(",");
    const keys = isMulti
      ? group.key.toString().split(", ")
      : [group.key.toString()];

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
