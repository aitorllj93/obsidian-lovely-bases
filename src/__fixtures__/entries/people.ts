import type { BasesEntry } from "obsidian";
import { aBasesEntry } from "../../__mocks__/aBasesEntry";
import { aFile } from "../../__mocks__/aFile";

export const PERSON_ENTRIES: BasesEntry[] = [
  aBasesEntry(
    {
      file: aFile({
        basename: 'Isaac Asimov',
      })
    },
    {
      title: "Isaac Asimov",
      cover: 'https://letteratitudinenews.wordpress.com/wp-content/uploads/2020/01/isaac-asimov.jpg',
    }
  ),
];
