import { type BasesEntryGroup, StringValue } from "obsidian";

export function flattenGroups(groups: BasesEntryGroup[]): BasesEntryGroup[] {
  const result: BasesEntryGroup[] = [];

  for (const group of groups) {
    const isMulti = group.key.toString().includes(",");
    const keys = isMulti
      ? group.key.toString().split(", ")
      : [group.key.toString()];

    for (const key of keys) {
      let resultGroup: BasesEntryGroup | undefined = result.find((g) => g.key?.toString() === key);

      if (!resultGroup) {
        resultGroup = {
          key: new StringValue(key),
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
