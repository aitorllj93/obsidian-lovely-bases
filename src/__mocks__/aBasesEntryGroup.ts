import { type BasesEntry, type BasesEntryGroup, StringValue } from "obsidian";

export class MockBasesEntryGroup implements BasesEntryGroup {
  key: StringValue;
  entries: BasesEntry[];

  constructor(key: string, entries: BasesEntry[]) {
    this.key = new StringValue(key);
    this.entries = entries;
  }

  hasKey(): boolean {
    return true;
  }
}

export const aBasesEntryGroup = (
  key: string,
  entries: BasesEntry[]
): BasesEntryGroup => {
  return new MockBasesEntryGroup(key, entries);
}
