
import type { CardConfig } from "@/components/Card/types"

import { aBasesViewConfig } from "../../__mocks__/aBasesViewConfig"

export const ARTICLES_CARD_CONFIG: CardConfig = {
  layout: 'horizontal',
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
};

export const ARTICLES_BASE_CONFIG = aBasesViewConfig(ARTICLES_CARD_CONFIG)
