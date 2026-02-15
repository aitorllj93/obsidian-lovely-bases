import type { BasesEntry } from "obsidian";
import { aBasesEntry } from "../../__mocks__/aBasesEntry";
import { aFile } from "../../__mocks__/aFile";

export const CATEGORIES_ENTRIES: BasesEntry[] = [
  aBasesEntry(
    {
      file: aFile({
        basename: 'Movies',
      })
    },
    {
      title: "Movies",
      icon: 'film',
      color: '#D14D41',
    },
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'Books',
      })
    },
    {
      title: "Books",
      icon: 'book',
      color: '#4385BE',
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'People',
      })
    },
    {
      title: "People",
      icon: 'user',
      color: '#CE5D97',
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'Applications',
      })
    },
    {
      title: "Applications",
      icon: 'box',
      color: '#D0A215',
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'Articles',
      })
    },
    {
      title: "Articles",
      icon: 'newspaper',
      color: '#879A39',
    }
  ),
];

export const VIRTUAL_SCROLL_CATEGORIES_ENTRIES: BasesEntry[] = Array.from({ length: 25 }).flatMap(_ => ([
  ...CATEGORIES_ENTRIES
]));
