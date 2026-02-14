
import {
  createViewRenderer
} from "@/stories/decorators";

import FacetCardsView, { type FacetCardsConfig } from "../FacetCardsView";

export const View =
  createViewRenderer<FacetCardsConfig>(FacetCardsView);
