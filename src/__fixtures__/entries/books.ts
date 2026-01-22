
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
        basename: 'Organízate con Eficacia',
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
        basename: 'Calendario De La Sabiduria',
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
  aBasesEntry(
    {
      file: aFile({
        basename: 'Guerra y Paz',
      })
    },
    {
      title: "Guerra y Paz",
      author: [
        "León Tolstói",
      ],
      cover: 'https://m.media-amazon.com/images/I/71Xu1rz3tCL._AC_UF1000,1000_QL80_.jpg',
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'Historia de dos ciudades',
      })
    },
    {
      title: "Historia de dos ciudades",
      author: [
        "Charles Dickens",
      ],
      cover: 'https://m.media-amazon.com/images/I/81almnjTMzL._AC_UF894,1000_QL80_.jpg',
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'Guerra y Paz',
      })
    },
    {
      title: "El Señor de los Anillos",
      author: [
        "J.R.R. Tolkien",
      ],
      cover: 'https://www.tiposinfames.com/media/img/portadas/9788445011119.jpg',
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: 'Harry Potter y la piedra filosofal',
      })
    },
    {
      title: "Harry Potter y la piedra filosofal",
      author: [
        "J.K. Rowling",
      ],
      cover: 'https://m.media-amazon.com/images/I/81dxFCnAp0L.jpg'
    }
  ),
];

export const VIRTUAL_SCROLL_BOOKS_ENTRIES: BasesEntry[] = []

Array.from({ length: 25 }, (_) => VIRTUAL_SCROLL_BOOKS_ENTRIES.push(
  ...BOOK_ENTRIES,
));

