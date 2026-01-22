import type { BasesEntry } from "obsidian";

import { APPLICATION_ENTRIES } from "./applications";
import { ARTICLE_ENTRIES } from "./articles";
import { BOOK_ENTRIES } from "./books";
import { CATEGORIES_ENTRIES } from "./categories";
import { MOVIES_ENTRIES } from "./movies";
import { PERSON_ENTRIES } from "./people";
import { PHOTOS_ENTRIES } from "./photos";
import { PLANS_ENTRIES } from "./plans";

export {
  APPLICATION_ENTRIES,
  VIRTUAL_SCROLL_APPLICATION_ENTRIES,
} from "./applications";
export { ARTICLE_ENTRIES, VIRTUAL_SCROLL_ARTICLES_ENTRIES } from "./articles";
export { BOOK_ENTRIES, VIRTUAL_SCROLL_BOOKS_ENTRIES } from "./books";
export { MOVIES_ENTRIES, MOVIES_ENTRIES_GROUPED, VIRTUAL_SCROLL_MOVIES_ENTRIES } from "./movies";
export { GROUPED_OCCURRENCES, OCCURRENCES } from "./occurrences";
export { PERSON_ENTRIES, VIRTUAL_SCROLL_PERSON_ENTRIES } from "./people";
export { PHOTOS_ENTRIES, VIRTUAL_SCROLL_PHOTOS_ENTRIES } from "./photos";
export { PLANS_ENTRIES, VIRTUAL_SCROLL_PLANS_ENTRIES } from "./plans";

export const ALL_ENTRIES: BasesEntry[] = [
  ...APPLICATION_ENTRIES,
  ...ARTICLE_ENTRIES,
  ...BOOK_ENTRIES,
  ...CATEGORIES_ENTRIES,
  ...MOVIES_ENTRIES,
  ...PERSON_ENTRIES,
  ...PLANS_ENTRIES,
  ...PHOTOS_ENTRIES,
];
