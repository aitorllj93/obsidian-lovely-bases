import type { BasesEntry } from "obsidian";
import { aBasesEntry } from "../../__mocks__/aBasesEntry";
import { aFile } from "../../__mocks__/aFile";

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
      cover: 'https://m.media-amazon.com/images/M/MV5BMjA1Nzk0OTM2OF5BMl5BanBnXkFtZTgwNjU2NjEwMDE@._V1_SX300.jpg',
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'The Social Network',
      }, 'As Harvard student Mark Zuckerberg creates the social networking site that would become known as Facebook, he is sued by the twins who claimed he stole their idea and by the co-founder who was later squeezed out of the business.')
    },
    {
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
      cover: 'https://m.media-amazon.com/images/M/MV5BMTM5NTQ3MTYxN15BMl5BanBnXkFtZTcwODE2Nzk3OQ@@._V1_SX300.jpg'
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'Steve Jobs',
      },
    'Steve Jobs takes us behind the scenes of the digital revolution, to paint a portrait of the man at its epicenter. The story unfolds backstage at three iconic product launches, ending in 1998 with the unveiling of the iMac.')
    },
    {
      cover: 'https://m.media-amazon.com/images/M/MV5BMjE0NTA2MTEwOV5BMl5BanBnXkFtZTgwNzg4NzU2NjE@._V1_SX300.jpg',
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
      cover: 'https://m.media-amazon.com/images/M/MV5BYzEzZDM5NWEtODgzNC00MTE5LWFhZTYtMGE2YTkxMzFiZWIyXkEyXkFqcGc@._V1_SX300.jpg',
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'The Imitation Game',
      }, 'During World War II, the English mathematical genius Alan Turing tries to crack the German Enigma code with help from fellow mathematicians while attempting to come to terms with his troubled private life.')
    },
    {
      cover: 'https://m.media-amazon.com/images/M/MV5BNjI3NjY1Mjg3MV5BMl5BanBnXkFtZTgwMzk5MDQ3MjE@._V1_SX300.jpg',
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'Ex Machina',
      }, 'A young programmer is selected to participate in a ground-breaking experiment in synthetic intelligence by evaluating the human qualities of a highly advanced humanoid A.I.')
    },
    {
      cover: 'https://m.media-amazon.com/images/M/MV5BMTUxNzc0OTIxMV5BMl5BanBnXkFtZTgwNDI3NzU2NDE@._V1_SX300.jpg',
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: '2001: A Space Odyssey',
      }, 'When a mysterious artifact is uncovered on the Moon, a spacecraft manned by two humans and one supercomputer is sent to Jupiter to find its origins')
    },
    {
      cover: 'https://m.media-amazon.com/images/M/MV5BNjU0NDFkMTQtZWY5OS00MmZhLTg3Y2QtZmJhMzMzMWYyYjc2XkEyXkFqcGc@._V1_SX300.jpg',
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'Blade Runner',
      }, 'A blade runner must pursue and terminate four replicants who stole a ship in space and have returned to Earth to find their creator.')
    },
    {
      cover: 'https://m.media-amazon.com/images/M/MV5BOWQ4YTBmNTQtMDYxMC00NGFjLTkwOGQtNzdhNmY1Nzc1MzUxXkEyXkFqcGc@._V1_SX300.jpg',
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'Blade Runner 2049',
      }, 'Young Blade Runner K\'s discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who\'s been missing for thirty years.')
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
