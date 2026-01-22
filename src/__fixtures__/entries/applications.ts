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
      cover: 'https://forum.obsidian.md/uploads/default/original/3X/9/f/9f1b5b46aed533f5386cf276ab2cdce48cbd2e25.png',
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'OrbStack',
      })
    },
    {
      title: "OrbStack",
      cover: 'https://avatars.githubusercontent.com/u/125163402?s=280&v=4',
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'Brave',
      })
    },
    {
      title: "Brave",
      cover: 'https://i.redd.it/gscm22m0nk481.png',
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'Reddit',
      })
    },
    {
      title: "Reddit",
      cover: 'https://store-images.s-microsoft.com/image/apps.15970.14375561300249796.05fe8c27-ce9e-4144-8702-0e81e2f575b1.042364cb-b745-4796-a520-61291e2dd6b9',
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'Tiled',
      })
    },
    {
      title: "Tiled",
      cover: 'https://www.mapeditor.org/img/tiled-logo-filled.png',
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'AIO Launcher',
      })
    },
    {
      title: "AIO Launcher",
      cover: 'https://play-lh.googleusercontent.com/PxnN4zYYxecaZKcYCqrdNZvFNWtMAhZOuYvp-alSXRY3GMQPhzM6bmDw9BLGci04ExM',
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'Claude',
      })
    },
    {
      title: "Claude",
      cover: 'https://pnghdpro.com/wp-content/themes/pnghdpro/download/social-media-and-brands/claude-app-icon-hd.png',
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'ElevenReader',
      })
    },
    {
      title: "ElevenReader",
      cover: 'https://play-lh.googleusercontent.com/R4bP5TSYTpGcfNGaho7YuR2y6sxyDJeZJO9wj5seVz1j_aJ5xpAbozVwU7Ib9XHae3k'
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'Ntfy',
      })
    },
    {
      title: "Ntfy",
      cover: 'https://play-lh.googleusercontent.com/O9uRWkaFLCzl7wkpeUWFuJfllrvykC6wOCR3sy8sZkrCyIMs-DPv7j7D710QY8VSc7KN'
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'VLC',
      })
    },
    {
      title: "VLC",
      cover: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/VLC_for_iOS_Icon.png'
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'Duolingo',
      })
    },
    {
      title: "Duolingo",
      cover: 'https://play-lh.googleusercontent.com/tw_coGKgk1K_zO-Ypf9zBKV1s-KT3dYN1MIUxIqtnbfmON5x_YmuoAr31gE4oSfJHNtA-aStTd-qe9R8S6NVyA'
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'X',
      })
    },
    {
      title: "X",
      cover: 'https://img.freepik.com/free-vector/new-2023-twitter-logo-x-icon-design_1017-45418.jpg?semt=ais_hybrid&w=740&q=80'
    }
  ),
];

export const VIRTUAL_SCROLL_APPLICATION_ENTRIES: BasesEntry[] = []

Array.from({ length: 25 }, (_) => VIRTUAL_SCROLL_APPLICATION_ENTRIES.push(
  ...APPLICATION_ENTRIES,
));
