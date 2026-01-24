import type { BasesEntry } from "obsidian";
import { aBasesEntry } from "../../__mocks__/aBasesEntry";
import { aFile } from "../../__mocks__/aFile";

export const ARTICLE_ENTRIES: BasesEntry[] = [
  aBasesEntry(
    {
      file: aFile({
        basename: 'Tienes que encontrar aquello que amas, dice Jobs',
      }, `Me siento honrado de estar hoy con vosotros en vuestra ceremonia de graduación en una de las mejores universidades del mundo. A decir verdad, yo nunca me gradué en la universidad. Y esto es lo más cerca que he estado nunca de una graduación universitaria.

Hoy quiero contaros tres historias de mi vida. Eso es todo. Nada del otro mundo. Solo tres historias.

La primera historia trata de conectar los puntos. Abandoné Reed College después de los primeros seis meses, pero luego me quedé por allí como oyente durante unos 18 meses más, antes de dejarlo definitivamente. ¿Por qué abandoné?
`)
    },
    {
      title: "‘Tienes que encontrar aquello que amas’, dice Jobs",
      excerpt: "Este es un texto preparado del discurso de graduación pronunciado por Steve Jobs, director ejecutivo de Apple Computer y de Pixar Animation Studios, el 12 de junio de 2005",
      author: [
        "Steve Jobs",
        "Stanford University",
      ],
      color: '#2F968D',
      icon: 'newspaper',
      banner: 'https://news.stanford.edu/__data/assets/image/0028/165169/050609-228.jpg',
      url: 'https://news.stanford.edu/stories/2005/06/youve-got-find-love-jobs-says',
      media_link: 'https://www.youtube.com/watch?v=QYAnJ_QyCQg',
      published: 'June 12th',
      sectionTitle: 'Featured Collection',
      sectionSubtitle: 'A curated selection of highlights',
      read: 'Read',
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: "5 plug-ins to supercharge mind mapping in Obsidian Canvas",
      }),
    },
    {
      color: '#3171B2',
      icon: 'newspaper',
      title: "5 plug-ins to supercharge mind mapping in Obsidian Canvas",
      excerpt: "Discover the top 5 plug-ins that will revolutionize your mind mapping experience in Obsidian Canvas, making your workflow more efficient and your maps more visually appealing.",
      author: ["Tom Li"],
      // banner: "https://static0.xdaimages.com/wordpress/wp-content/uploads/wm/2025/08/xda-laptop-running-obsidian-feature.jpg?w=1600&h=900&fit=crop",
      url: "https://www.xda-developers.com/best-obsidian-canvas-plugins/",
      published: "2025-08-15",
      sectionTitle: 'Featured Collection',
      sectionSubtitle: 'A curated selection of highlights',
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: "10 Prompts That Makes ChatGPT Write like a Human - Prompts",
      })
    },
    {
      "title": "10 Prompts That Makes ChatGPT Write like a Human - Prompts",
      "excerpt": "Discover 10 powerful prompts to make ChatGPT write more like a human. Learn how to use conversational tones, personal stories, emotions, and more to create engaging and relatable content that connects with your audience.",
      color: '#B74583',
      "banner": "https://cdn.prod.website-files.com/64808e3805a22fc1ca46ffe9/671de0c11e075a7268aebaf1_Prompts%20That%20Makes%20Chatgpt%20Write%20like%20a%20Human.webp",
      "url": "https://www.godofprompt.ai/blog/prompts-that-makes-chatgpt-write-like-a-human",
      sectionTitle: 'Featured Collection',
      sectionSubtitle: 'A curated selection of highlights',
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: "The Ultimate Guide to Mind Mapping in Obsidian",
      })
    },{
      color: '#3171B2',
      icon: 'wikipedia',
      "title": "Brad Woods Digital Garden",
      "excerpt": "What is Juice in software development. What is Game Feel and how it can it be used in non-game software. How software can fulfil emotional requirements. How to create software with soul. Examples of Juice on the web.",
      "url": "https://garden.bradwoods.io/notes/design/juice",
      "author": [
        "Brad Woods"
      ],
      "banner": "https://garden.bradwoods.io/ogImage.jpg\t",
      "published": "2023-03-12",
      sectionTitle: 'Featured Collection',
      sectionSubtitle: 'A curated selection of highlights',
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: "40 preguntas para hacerte cada año",
      })
    },
    {
      title: "40 preguntas para hacerte cada año",
      excerpt: "Cada año me hago estas 40 preguntas. He compartido esta lista con mi familia y mis amigos más cercanos, y siempre disfruto comentarlas mientras reflexionamos sobre…",
      author: [
        "Ango, Steph"
      ],
      color: '#768D21',
      banner: "https://stephango.com/assets/covers/40-questions.png",
      url: "https://stephango.com/40-questions",
      published: "2016-10-20",
      sectionTitle: 'Featured Collection',
      sectionSubtitle: 'A curated selection of highlights',
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: "Enseñé este sistema de productividad a 6,642 empleados de Google",
      })
    },
    {
      "title": "Enseñé este sistema de productividad a 6,642 empleados de Google",
      "excerpt": "Hey friends - During my nine years at Google, I taught a productivity system to over 6,600 Googlers that completely changed how they work.It’s a simple, 4-step workflow called CORE, and it ensures you never lose another file, task, or note again, without having to rely on",
      "author": [
        "Jeff Su"
      ],
      color: '#CB6120',
      "banner": "https://www.jeffsu.org/content/images/2021/03/RANDOM-PICS--2-.png",
      "url": "https://www.jeffsu.org/i-taught-6-642-googlers-this-productivity-system/",
      "published": "2025-10-21",
      sectionTitle: 'Featured Collection',
      sectionSubtitle: 'A curated selection of highlights',
    }
  ),
  aBasesEntry(
    {
      file: aFile({
        basename: "Las explicaciones concisas aceleran el progreso",
      })
    },
    {
      "excerpt": "Si quieres progresar más rápido, escribe explicaciones concisas. Expón las ideas en términos simples, con firmeza y claridad, de modo que puedan ser rebatidas, remezcladas o reelaboradas.",
      "author": [
        "Steph Ango"
      ],
      color: '#735EB5',
      "banner": "https://stephango.com/assets/covers/concise.png",
      "url": "https://stephango.com/concise",
      "published": "2023-08-20",
      sectionTitle: 'Featured Collection',
      sectionSubtitle: 'A curated selection of highlights',
    }
  )
];

export const VIRTUAL_SCROLL_ARTICLES_ENTRIES: BasesEntry[] = []

Array.from({ length: 25 }, (_) => VIRTUAL_SCROLL_ARTICLES_ENTRIES.push(
  ...ARTICLE_ENTRIES,
));

