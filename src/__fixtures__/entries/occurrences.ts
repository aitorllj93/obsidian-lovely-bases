
import type { BasesEntry, BasesEntryGroup } from "obsidian";
import { random } from 'remotion';

import { aBasesEntry } from "@/__mocks__/aBasesEntry";
import { aBasesEntryGroup } from "@/__mocks__/aBasesEntryGroup";
import { aFile } from "@/__mocks__/aFile";
import { subDays } from "@/lib/date";

const startDate = new Date();

const randomOccurrence = (startDate: Date, index: number) => {
  const day = subDays(startDate, index).toISOString().split('T')[0];

  const seed = (key: string) => random(`occurrence:${day}:${index}:${key}`);

  return aBasesEntry({
    file: aFile({
      basename: day,
    }),
  }, {
    dietQuality: Math.floor(seed('dietQuality') * 11),
    completed: seed('completed') > 0.5,
    tags: Array.from(
      { length: Math.floor(seed('tags:length') * 6) },
      (_, i) => `tag-${i + 1}`,
    ),
  });
};

const indexedOccurrence = (startDate: Date, index: number) => {
  return aBasesEntry({
    file: aFile({
      basename: subDays(startDate, index).toISOString().split('T')[0],
    }),
  }, {
    dietQuality: index % 6,
    completed: index % 2 === 0,
    tags: Array.from({ length: index % 6 }, (_, i) => `tag-${i + 1}`),
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
