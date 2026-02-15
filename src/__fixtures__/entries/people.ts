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
  aBasesEntry(
    {
      file: aFile({
        basename: 'Steve Jobs',
      })
    },
    {
      title: "Steve Jobs",
      cover: 'https://citymagazine.b-cdn.net/wp-content/uploads/2025/06/Steve-Jobs-2-770x1155.webp',
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'Alfons Mucha',
      })
    },
    {
      title: "Alfons Mucha",
      cover: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Alfons_Mucha_LOC_3c05828u.jpg/764px-Alfons_Mucha_LOC_3c05828u.jpg',
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'Antonio Escohotado',
      })
    },
    {
      title: "Antonio Escohotado",
      cover: 'https://images.ecestaticos.com/fcdlkOjPYtqjMbcK5BatFTlJYEE=/0x0:640x425/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F385%2F04b%2F32b%2F38504b32bfab80366f606391a2dd8af2.jpg',
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'John Martin',
      })
    },
    {
      title: "John Martin",
      cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIbOL12OWGP-fw1SxugcZzpqt__1VRr5puPw&s',
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'Joseph Campbell',
      })
    },
    {
      title: "Joseph Campbell",
      cover: 'https://cdn.britannica.com/21/129221-050-BEFCFA49/Joseph-Campbell.jpg',
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'William Blake',
      })
    },
    {
      title: "William Blake",
      cover: 'https://upload.wikimedia.org/wikipedia/commons/0/00/William_Blake_by_Thomas_Phillips.jpg',
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'George Dumézil',
      })
    },
    {
      title: "George Dumézil",
      cover: 'https://upload.wikimedia.org/wikipedia/en/b/bf/Georges_Dum%C3%A9zil.jpg',
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'Aaron Swartz',
      })
    },
    {
      title: "Aaron Swartz",
      cover: 'https://upload.wikimedia.org/wikipedia/commons/0/06/Aaron_Swartz_profile.jpg'
    }
  ),

];

export const VIRTUAL_SCROLL_PERSON_ENTRIES: BasesEntry[] = Array.from({ length: 25 }).flatMap(_ => ([
  ...PERSON_ENTRIES
]));
