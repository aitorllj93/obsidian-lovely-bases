import { type BasesEntry, type BasesEntryGroup, StringValue } from "obsidian"

export const aBasesEntryGroup = (
  key: string,
  entries: BasesEntry[]
): BasesEntryGroup => {
  return {
    key: new StringValue(key),
    entries,
    hasKey: () => true,
  };
}
