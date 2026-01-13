import type { BasesEntry } from "obsidian";

import { aFile } from "./aFile";
import { aValue } from "./aValue";


export const aBasesEntry = (
  overrides: Partial<BasesEntry> = {},
  fm: Record<string, unknown> = {},
): BasesEntry => {
  const file = overrides.file ?? aFile();
  return {
    file,
    getValue(propertyId) {
      const [source, property] = propertyId.split('.');
      const sourceData = source === 'file' ? file : fm;
      if (source === 'file' && property === 'name') {
        return aValue(file.basename);
      }
      return aValue(sourceData[property])
    },
    ...overrides,
  };
}
