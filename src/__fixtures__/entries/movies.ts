import type { BasesEntry, BasesEntryGroup } from "obsidian";

import { aBasesEntry } from "../../__mocks__/aBasesEntry";
import { aFile } from "../../__mocks__/aFile";

import { toBasesEntryGroups } from "../utils";

export const MOVIES_ENTRIES: BasesEntry[] = [
  aBasesEntry(
    {
      file: aFile({
        basename: 'Her',
      },
        'In the near future, a lonely writer develops an unlikely relationship with an operating system designed to meet his every need.'
      ),
    },
    {
      rating: 4.5,
      times_watched: 1,
      sectionTitle: 'Watch Again',
      trailer: 'https://www.youtube.com/watch?v=dJTU48_yghs',
      cover: 'https://m.media-amazon.com/images/M/MV5BMjA1Nzk0OTM2OF5BMl5BanBnXkFtZTgwNjU2NjEwMDE@._V1_SX300.jpg',
      banner: 'https://image.tmdb.org/t/p/original/sPPsR9f4K0movWVQ99u4uMqFzEL.jpg',
      link: 'https://www.themoviedb.org/movie/152601-her',
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'The Social Network',
      }, 'As Harvard student Mark Zuckerberg creates the social networking site that would become known as Facebook, he is sued by the twins who claimed he stole their idea and by the co-founder who was later squeezed out of the business.')
    },
    {
      rating: 4.0,
      times_watched: 1,
      sectionTitle: 'Watch Again',
      trailer: 'https://www.youtube.com/watch?v=lB95KLmpLR4',
      cover: 'https://m.media-amazon.com/images/M/MV5BMjlkNTE5ZTUtNGEwNy00MGVhLThmZjMtZjU1NDE5Zjk1NDZkXkEyXkFqcGc@._V1_SX300.jpg',
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'Jobs',
      },
    'The story of Steve Jobs\'s ascension from college dropout into one of the most revered creative entrepreneurs of the 20th century.')
    },
    {
      rating: 7,
      times_watched: 3,
      sectionTitle: 'Favorites',
      trailer: 'https://www.youtube.com/watch?v=FrvkCS0ZGPU&pp=ygUMam9icyB0cmFpbGVy',
      cover: 'https://m.media-amazon.com/images/M/MV5BMTM5NTQ3MTYxN15BMl5BanBnXkFtZTcwODE2Nzk3OQ@@._V1_SX300.jpg',
      banner: 'https://image.tmdb.org/t/p/original/1GlZNA9L5trst3ItgRiyQTUH1uf.jpg',
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'Steve Jobs (2015)',
      },
    'Steve Jobs takes us behind the scenes of the digital revolution, to paint a portrait of the man at its epicenter. The story unfolds backstage at three iconic product launches, ending in 1998 with the unveiling of the iMac.')
    },
    {
      rating: 3.0,
      times_watched: 2,
      sectionTitle: 'Seen',
      trailer: 'https://www.youtube.com/watch?v=aEr6K1bwIVs',
      cover: 'https://m.media-amazon.com/images/M/MV5BMjE0NTA2MTEwOV5BMl5BanBnXkFtZTgwNzg4NzU2NjE@._V1_SX300.jpg',
      banner: 'https://image.tmdb.org/t/p/original/mCbB9wUe9KHjGCcYGCzMLYyMjjE.jpg'
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'Blackberry',
      },
    'The story of the meteoric rise and catastrophic demise of the world\'s first smartphone.')
    },
    {
      rating: 5,
      times_watched: 2,
      sectionTitle: 'Seen',
      trailer: 'https://www.youtube.com/watch?v=d0oskTqbi0I',
      cover: 'https://m.media-amazon.com/images/M/MV5BYzEzZDM5NWEtODgzNC00MTE5LWFhZTYtMGE2YTkxMzFiZWIyXkEyXkFqcGc@._V1_SX300.jpg',
      banner: 'https://image.tmdb.org/t/p/original/iSj5vCxUgRALvrb5tbEX7RirDzn.jpg'
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'The Imitation Game',
      }, 'During World War II, the English mathematical genius Alan Turing tries to crack the German Enigma code with help from fellow mathematicians while attempting to come to terms with his troubled private life.')
    },
    {
      times_watched: 0,
      sectionTitle: 'Recently Added',
      trailer: 'https://www.youtube.com/watch?v=nuPZUUED5uk',
      cover: 'https://m.media-amazon.com/images/M/MV5BNjI3NjY1Mjg3MV5BMl5BanBnXkFtZTgwMzk5MDQ3MjE@._V1_SX300.jpg',
      banner: 'https://image.tmdb.org/t/p/original/gLQoJ9P79g501oEEtrN8zMlCPpx.jpg'
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'Ex Machina',
      }, 'A young programmer is selected to participate in a ground-breaking experiment in synthetic intelligence by evaluating the human qualities of a highly advanced humanoid A.I.')
    },
    {
      times_watched: 0,
      sectionTitle: 'Recently Added',
      trailer: 'https://www.youtube.com/watch?v=gyKqHOgMi4g',
      cover: 'https://m.media-amazon.com/images/M/MV5BMTUxNzc0OTIxMV5BMl5BanBnXkFtZTgwNDI3NzU2NDE@._V1_SX300.jpg',
      banner: 'https://image.tmdb.org/t/p/original/uqOuJ50EtTj7kkDIXP8LCg7G45D.jpg'
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: '2001: A Space Odyssey',
      }, 'When a mysterious artifact is uncovered on the Moon, a spacecraft manned by two humans and one supercomputer is sent to Jupiter to find its origins')
    },
    {
      times_watched: 0,
      sectionTitle: 'Recently Added',
      trailer: 'https://www.youtube.com/watch?v=oR_e9y-bka0',
      cover: 'https://m.media-amazon.com/images/M/MV5BNjU0NDFkMTQtZWY5OS00MmZhLTg3Y2QtZmJhMzMzMWYyYjc2XkEyXkFqcGc@._V1_SX300.jpg',
      banner: 'https://image.tmdb.org/t/p/original/w5IDXtifKntw0ajv2co7jFlTQDM.jpg'
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'Blade Runner',
      }, 'A blade runner must pursue and terminate four replicants who stole a ship in space and have returned to Earth to find their creator.')
    },
    {
      times_watched: 0,
      sectionTitle: 'Recently Added',
      trailer: 'https://www.youtube.com/watch?v=eogpIG53Cis',
      cover: 'https://m.media-amazon.com/images/M/MV5BOWQ4YTBmNTQtMDYxMC00NGFjLTkwOGQtNzdhNmY1Nzc1MzUxXkEyXkFqcGc@._V1_SX300.jpg',
      banner: 'https://image.tmdb.org/t/p/original/hJ5R9d6QuH3tzr8L8neZZTuzNXm.jpg',
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'Blade Runner 2049',
      }, 'Young Blade Runner K\'s discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who\'s been missing for thirty years.')
    },
    {
      times_watched: 0,
      sectionTitle: 'Recently Added',
      trailer: 'https://www.youtube.com/watch?v=PkqHVGFAhbU',
      cover: 'https://m.media-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODk5NjU3MzI@._V1_SX300.jpg',
      banner: 'https://image.tmdb.org/t/p/original/ilRyazdMJwN05exqhwK4tMKBYZs.jpg'
    }
  )
];

export const VIRTUAL_SCROLL_MOVIES_ENTRIES: BasesEntry[] = Array.from({ length: 25 }).flatMap(_ => ([
  ...MOVIES_ENTRIES
]));

export const MOVIES_ENTRIES_GROUPED: BasesEntryGroup[] = toBasesEntryGroups(
  MOVIES_ENTRIES,
  'note.times_watched',
);

export const VIRTUAL_SCROLL_MOVIES_ENTRIES_GROUPED: BasesEntryGroup[] = toBasesEntryGroups(
  VIRTUAL_SCROLL_MOVIES_ENTRIES,
  'note.times_watched',
);
