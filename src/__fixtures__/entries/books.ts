
import type { BasesEntry } from "obsidian";
import { aBasesEntry } from "../../__mocks__/aBasesEntry";
import { aFile } from "../../__mocks__/aFile";

export const BOOK_ENTRIES: BasesEntry[] = [
  aBasesEntry(
    {
      file: aFile({
        basename: 'La divina comedia',
      })
    },
    {
      title: "La divina comedia",
      status: "Pendiente",
      author: [
        "Dante Alighieri",
      ],
      cover: 'https://m.media-amazon.com/images/I/71WJbXGxPdL._AC_UF894,1000_QL80_.jpg',
      url: 'https://news.stanford.edu/stories/2005/06/youve-got-find-love-jobs-says',
    }
  ),
];
