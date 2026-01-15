
import type { BasesEntry, BasesEntryGroup } from "obsidian";

import { aBasesEntry } from "@/__mocks__/aBasesEntry";
import { aBasesEntryGroup } from "@/__mocks__/aBasesEntryGroup";
import { aFile } from "@/__mocks__/aFile";
import { subDays } from "@/lib/date";

const startDate = new Date();

const randomOccurrence = (startDate: Date, index: number) => {
  return aBasesEntry({
    file: aFile({
      basename: subDays(startDate, index).toISOString().split('T')[0],
    }),
  }, {
    dietQuality: Math.floor(Math.random() * 6),
  });
};

const indexedOccurrence = (startDate: Date, index: number) => {
  return aBasesEntry({
    file: aFile({
      basename: subDays(startDate, index).toISOString().split('T')[0],
    }),
  }, {
    dietQuality: index % 6,
  });
};

export const OCCURRENCES: BasesEntry[] = Array.from({ length: 365 }, (_, index) => {
  return randomOccurrence(startDate, index);
});

export const INDEXED_OCCURRENCES: BasesEntry[] = Array.from({ length: 365 }, (_, index) => {
  return indexedOccurrence(startDate, index);
});

export const GROUPED_OCCURRENCES: BasesEntryGroup[] = [
  aBasesEntryGroup('null', OCCURRENCES.slice(0, OCCURRENCES.length - 1)),
  aBasesEntryGroup('indexed', INDEXED_OCCURRENCES.slice(0, INDEXED_OCCURRENCES.length - 1)),
];
