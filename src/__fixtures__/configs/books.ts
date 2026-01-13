
import type { CardConfig } from "@/components/Card/types"

import { aBasesViewConfig } from "../../__mocks__/aBasesViewConfig"

export const BOOKS_CARD_CONFIG: CardConfig = {
  layout: 'vertical',
  hoverProperty: undefined,
  hoverStyle: 'none',
  properties: [],
  imageProperty: 'note.cover',
  imageAspectRatio: 1.5,
  cardSize: 340,
  imageFit: 'cover',
  reverseContent: false,
  showPropertyTitles: false,
  showTitle: false,
};

export const BOOKS_BASE_CONFIG = aBasesViewConfig(BOOKS_CARD_CONFIG)
