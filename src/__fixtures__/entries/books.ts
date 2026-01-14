
import type { BasesEntry } from "obsidian";
import { aBasesEntry } from "../../__mocks__/aBasesEntry";
import { aFile } from "../../__mocks__/aFile";

export const BOOK_ENTRIES: BasesEntry[] = [
  aBasesEntry(

    {
      file: aFile({
        basename: 'Steve Jobs',
      })
    },
    {
      "title": "Steve Jobs",
      "author": [
        "Walter Isaacson"
      ],
      "cover": "http://books.google.com/books/content?id=ZNf9gNsA72MC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'Steve Jobs',
      })
    },{
      "title": "Organízate con Eficacia",
      "author": [
        "David Allen"
      ],
      "cover": "https://m.media-amazon.com/images/I/61Loe8brBXL._AC_UF1000,1000_QL80_.jpg",
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'Organízate con Eficacia',
      })
    },
    {
      "title": "Calendario De La Sabiduria",
      "author": [
        "León Tolstói"
      ],
      "cover": "https://www.sbooks.es/imagenes/poridentidad?identidad=c97565fb-c4d0-461e-9d89-f2949458acaa&ancho=&alto="
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'La divina comedia',
      })
    },
    {
      title: "La divina comedia",
      author: [
        "Dante Alighieri",
      ],
      cover: 'https://m.media-amazon.com/images/I/71WJbXGxPdL._AC_UF894,1000_QL80_.jpg',
    }
  ),
];

export const VIRTUAL_SCROLL_BOOKS_ENTRIES: BasesEntry[] = []

Array.from({ length: 25 }, (_) => VIRTUAL_SCROLL_BOOKS_ENTRIES.push(
  ...BOOK_ENTRIES,
));

