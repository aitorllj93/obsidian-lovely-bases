import type { BasesEntry } from "obsidian";
import { aBasesEntry } from "../../__mocks__/aBasesEntry";
import { aFile } from "../../__mocks__/aFile";

export const PHOTOS_ENTRIES: BasesEntry[] = [
  aBasesEntry(
    {
      file: aFile({
        basename: 'Photo 1',
      })
    },
    {
      banner: `https://picsum.photos/200/300?random=${Math.random()}`,
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'Photo 2',
      })
    },
    {
      banner: `https://picsum.photos/200/300?random=${Math.random()}`,
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'Photo 3',
      })
    },
    {
      banner: `https://picsum.photos/200/300?random=${Math.random()}`,
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'Photo 4',
      })
    },
    {
      banner: `https://picsum.photos/200/300?random=${Math.random()}`,
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'Photo 5',
      })
    },
    {
      banner: `https://picsum.photos/200/300?random=${Math.random()}`,
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'Photo 6',
      })
    },
    {
      banner: `https://picsum.photos/200/300?random=${Math.random()}`,
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'Photo 7',
      })
    },
    {
      banner: `https://picsum.photos/200/300?random=${Math.random()}`,
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'Photo 8',
      })
    },
    {
      banner: `https://picsum.photos/200/300?random=${Math.random()}`,
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'Photo 9',
      })
    },
    {
      banner: `https://picsum.photos/200/300?random=${Math.random()}`,
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'Photo 10',
      })
    },
    {
      banner: `https://picsum.photos/200/300?random=${Math.random()}`,
    }
  ),
];


export const VIRTUAL_SCROLL_PHOTOS_ENTRIES: BasesEntry[] = [];

Array.from({ length: 25 }, (_) =>
  VIRTUAL_SCROLL_PHOTOS_ENTRIES.push(...PHOTOS_ENTRIES),
);
