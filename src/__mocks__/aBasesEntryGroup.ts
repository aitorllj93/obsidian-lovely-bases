import type { BasesEntry, BasesEntryGroup } from "obsidian";
import { MockStringValue } from '../__mocks__/aValue';

export class MockBasesEntryGroup implements BasesEntryGroup {
  key: MockStringValue;
  entries: BasesEntry[];

  constructor(key: string, entries: BasesEntry[]) {
    this.key = new MockStringValue(key);
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
