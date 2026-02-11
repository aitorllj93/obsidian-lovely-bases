import { type BasesEntryGroup, StringValue } from "obsidian";
import { parseWikilink } from "./link";

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
