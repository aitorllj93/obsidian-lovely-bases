
import type { CardConfig } from "@/components/Card/types"

import { aBasesViewConfig } from "../../__mocks__/aBasesViewConfig"

export const PEOPLE_CARD_CONFIG: CardConfig = {
  layout: 'vertical',
  shape: 'circle',
  hoverProperty: undefined,
  hoverStyle: 'none',
  properties: [],
  imageProperty: 'note.cover',
  imageAspectRatio: 1,
  cardSize: 340,
  imageFit: 'cover',
  reverseContent: false,
  showPropertyTitles: false,
  showTitle: false,
};

export const PEOPLE_BASE_CONFIG = aBasesViewConfig(PEOPLE_CARD_CONFIG)
