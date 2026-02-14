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
      banner: "https://picsum.photos/seed/photo_1/200/300",
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'Photo 2',
      })
    },
    {
      banner: "https://picsum.photos/seed/photo_2/200/300",
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'Photo 3',
      })
    },
    {
      banner: "https://picsum.photos/seed/photo_3/200/300",
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'Photo 4',
      })
    },
    {
      banner: "https://picsum.photos/seed/photo_4/200/300",
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'Photo 5',
      })
    },
    {
      banner: "https://picsum.photos/seed/photo_5/200/300",
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'Photo 6',
      })
    },
    {
      banner: "https://picsum.photos/seed/photo_6/200/300",
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'Photo 7',
      })
    },
    {
      banner: "https://picsum.photos/seed/photo_7/200/300",
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'Photo 8',
      })
    },
    {
      banner: "https://picsum.photos/seed/photo_8/200/300",
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'Photo 9',
      })
    },
    {
      banner: "https://picsum.photos/seed/photo_9/200/300",
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'Photo 10',
      })
    },
    {
      banner: "https://picsum.photos/seed/photo_10/200/300",
    }
  ),
];


export const VIRTUAL_SCROLL_PHOTOS_ENTRIES: BasesEntry[] = [];

Array.from({ length: 25 }, (_) =>
  VIRTUAL_SCROLL_PHOTOS_ENTRIES.push(...PHOTOS_ENTRIES),
);
