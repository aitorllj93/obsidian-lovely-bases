import type { BasesEntry, BasesEntryGroup } from "obsidian";

import { aBasesEntryGroup } from "@/__mocks__";

import { APPLICATION_ENTRIES } from "./applications";
import { ARTICLE_ENTRIES } from "./articles";
import { BOOK_ENTRIES } from "./books";
import { CATEGORIES_ENTRIES } from "./categories";
import { GROUPS_ENTRIES } from "./groups";
import { MOVIES_ENTRIES } from "./movies";
import { PERSON_ENTRIES } from "./people";
import { PHOTOS_ENTRIES } from "./photos";
import { PLANS_ENTRIES } from "./plans";

export * from "./applications";
export * from "./articles";
export * from "./books";
export * from "./groups";
export * from "./movies";
export * from "./occurrences";
export * from "./people";
export * from "./photos";
export * from "./plans";

export const ALL_ENTRIES: BasesEntry[] = [
  ...GROUPS_ENTRIES,
  ...APPLICATION_ENTRIES,
  ...ARTICLE_ENTRIES,
  ...BOOK_ENTRIES,
  ...CATEGORIES_ENTRIES,
  ...MOVIES_ENTRIES,
  ...PERSON_ENTRIES,
  ...PLANS_ENTRIES,
  ...PHOTOS_ENTRIES,
];

export const GROUPED_ENTRIES: BasesEntryGroup[] = [
  aBasesEntryGroup("[[Articles]]", ARTICLE_ENTRIES),
  aBasesEntryGroup("[[Movies]]", MOVIES_ENTRIES),
  aBasesEntryGroup("[[Books]]", BOOK_ENTRIES),
  aBasesEntryGroup("[[People]]", PERSON_ENTRIES),
  aBasesEntryGroup("[[Applications]]", APPLICATION_ENTRIES),
  aBasesEntryGroup("[[Photos]]", PHOTOS_ENTRIES),
  aBasesEntryGroup("null", PLANS_ENTRIES)
]
