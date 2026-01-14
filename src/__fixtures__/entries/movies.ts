import type { BasesEntry } from "obsidian";
import { aBasesEntry } from "../../__mocks__/aBasesEntry";
import { aFile } from "../../__mocks__/aFile";

export const MOVIES_ENTRIES: BasesEntry[] = [
  aBasesEntry(
    {
      file: aFile({
        basename: 'Her',
      })
    },
    {
      cover: 'https://m.media-amazon.com/images/M/MV5BMjA1Nzk0OTM2OF5BMl5BanBnXkFtZTgwNjU2NjEwMDE@._V1_SX300.jpg',
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'The Social Network',
      })
    },
    {
      cover: 'https://m.media-amazon.com/images/M/MV5BMjlkNTE5ZTUtNGEwNy00MGVhLThmZjMtZjU1NDE5Zjk1NDZkXkEyXkFqcGc@._V1_SX300.jpg',
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'Jobs',
      })
    },
    {
      cover: 'https://m.media-amazon.com/images/M/MV5BMTM5NTQ3MTYxN15BMl5BanBnXkFtZTcwODE2Nzk3OQ@@._V1_SX300.jpg'
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'Steve Jobs',
      })
    },
    {
      cover: 'https://m.media-amazon.com/images/M/MV5BMjE0NTA2MTEwOV5BMl5BanBnXkFtZTgwNzg4NzU2NjE@._V1_SX300.jpg',
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'Blackberry',
      })
    },
    {
      cover: 'https://m.media-amazon.com/images/M/MV5BYzEzZDM5NWEtODgzNC00MTE5LWFhZTYtMGE2YTkxMzFiZWIyXkEyXkFqcGc@._V1_SX300.jpg',
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'The Imitation Game',
      })
    },
    {
      cover: 'https://m.media-amazon.com/images/M/MV5BNjI3NjY1Mjg3MV5BMl5BanBnXkFtZTgwMzk5MDQ3MjE@._V1_SX300.jpg',
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'Ex Machina',
      })
    },
    {
      cover: 'https://m.media-amazon.com/images/M/MV5BMTUxNzc0OTIxMV5BMl5BanBnXkFtZTgwNDI3NzU2NDE@._V1_SX300.jpg',
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: '2001: A Space Odyssey',
      })
    },
    {
      cover: 'https://m.media-amazon.com/images/M/MV5BNjU0NDFkMTQtZWY5OS00MmZhLTg3Y2QtZmJhMzMzMWYyYjc2XkEyXkFqcGc@._V1_SX300.jpg',
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'Blade Runner',
      })
    },
    {
      cover: 'https://m.media-amazon.com/images/M/MV5BOWQ4YTBmNTQtMDYxMC00NGFjLTkwOGQtNzdhNmY1Nzc1MzUxXkEyXkFqcGc@._V1_SX300.jpg',
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'Blade Runner 2049',
      })
    },
    {
      cover: 'https://m.media-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODk5NjU3MzI@._V1_SX300.jpg',
    }
  )
];

export const VIRTUAL_SCROLL_MOVIES_ENTRIES: BasesEntry[] = []

Array.from({ length: 25 }, (_) => VIRTUAL_SCROLL_MOVIES_ENTRIES.push(
  ...MOVIES_ENTRIES,
));
