
import type { BasesEntry, BasesEntryGroup } from "obsidian";

import { aBasesEntry } from "@/__mocks__/aBasesEntry";
import { aBasesEntryGroup } from "@/__mocks__/aBasesEntryGroup";
import { aFile } from "@/__mocks__/aFile";
import { addDays, startOfYear } from "@/lib/date";

const today = new Date();
const startDate = startOfYear(today);

const randomOccurrence = (startDate: Date, index: number) => {
  return aBasesEntry({
    file: aFile({
      basename: addDays(startDate, index).toISOString().split('T')[0],
    }),
  }, {
    dietQuality: Math.floor(Math.random() * 6),
  });
};

// const indexedOccurrence = (startDate: Date, index: number) => {
//   return aBasesEntry({
//     file: aFile({
//       basename: addDays(startDate, index).toISOString().split('T')[0],
//     }),
//   }, {
//     dietQuality: index % 6,
//   });
// };

export const OCCURRENCES: BasesEntry[] = Array.from({ length: 365 }, (_, index) => {
  return randomOccurrence(startDate, index);
});

export const GROUPED_OCCURRENCES: BasesEntryGroup[] = [
  aBasesEntryGroup('null', OCCURRENCES.slice(0, OCCURRENCES.length - 1)),
];
