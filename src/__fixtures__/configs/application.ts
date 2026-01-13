
import type { CardConfig } from "@/components/Card/types"

import { aBasesViewConfig } from "../../__mocks__/aBasesViewConfig"

export const APPLICATIONS_CARD_CONFIG: CardConfig = {
  layout: 'vertical',
  shape: 'rounded',
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

export const APPLICATIONS_BASE_CONFIG = aBasesViewConfig(APPLICATIONS_CARD_CONFIG)
