import type { BasesEntry } from "obsidian";

import { aBasesEntry, aFile } from "@/__mocks__";


export const AUDIOS_ENTRIES: BasesEntry[] = [
  aBasesEntry(
    {
      file: aFile({
        basename: 'Demo',
      }),
    },
    {
      trailer: 'https://file-examples.com/storage/fe8fa040ba69a17f49b33a1/2017/11/file_example_MP3_1MG.mp3',
      cover: 'https://m.media-amazon.com/images/M/MV5BMjA1Nzk0OTM2OF5BMl5BanBnXkFtZTgwNjU2NjEwMDE@._V1_SX300.jpg',
      banner: 'https://image.tmdb.org/t/p/original/sPPsR9f4K0movWVQ99u4uMqFzEL.jpg',
    }
  ),
];
