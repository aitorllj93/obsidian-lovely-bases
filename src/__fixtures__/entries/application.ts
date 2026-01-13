import type { BasesEntry } from "obsidian";
import { aBasesEntry } from "../../__mocks__/aBasesEntry";
import { aFile } from "../../__mocks__/aFile";

export const APPLICATION_ENTRIES: BasesEntry[] = [
  aBasesEntry(
    {
      file: aFile({
        basename: 'Obsidian',
      })
    },
    {
      title: "Obsidian",
      cover: 'https://play-lh.googleusercontent.com/0WzNnQJyEuOyvkZvYVpGkQJEvOfEF9kBnbLnLQioqUAX_DlV6wP8hyH8BgVBHQa1V9A=w240-h480-rw',
    }
  ),
];
