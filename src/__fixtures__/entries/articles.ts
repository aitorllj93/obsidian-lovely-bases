import type { BasesEntry } from "obsidian";
import { aBasesEntry } from "../../__mocks__/aBasesEntry";
import { aFile } from "../../__mocks__/aFile";

export const ARTICLE_ENTRIES: BasesEntry[] = [
  aBasesEntry(
    {
      file: aFile({
        basename: 'Tienes que encontrar aquello que amas, dice Jobs',
      })
    },
    {
      title: "‘Tienes que encontrar aquello que amas’, dice Jobs",
      excerpt: "Este es un texto preparado del discurso de graduación pronunciado por Steve Jobs, director ejecutivo de Apple Computer y de Pixar Animation Studios, el 12 de junio de 2005",
      author: [
        "Stanford University",
        "Jobs, Steve",
      ],
      banner: 'https://news.stanford.edu/__data/assets/image/0028/165169/050609-228.jpg',
      url: 'https://news.stanford.edu/stories/2005/06/youve-got-find-love-jobs-says',
      media_link: 'https://www.youtube.com/watch?v=QYAnJ_QyCQg',
      published: 'June 12th',
    }
  ),
];
