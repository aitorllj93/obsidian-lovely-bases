import type { FacetCardsConfig } from "@/views/FacetCards/FacetCardsView";

export const ARTICLES_BASE_CONFIG: FacetCardsConfig = {
  layout: 'horizontal',
  shape: 'square',
  hoverProperty: 'note.url',
  hoverStyle: 'overlay',
  properties: [
    'note.author',
    'note.published',
    'note.excerpt',
  ],
  imageProperty: 'note.banner',
  imageAspectRatio: 0.85,
  cardSize: 400,
  imageFit: 'cover',
  reverseContent: true,
  showPropertyTitles: false,
  showTitle: true,
}
