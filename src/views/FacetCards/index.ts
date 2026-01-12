import { ReactBasesView } from "@/lib/view-class";
import type { BaseViewDef } from "@/types";

import { DEFAULT_CARD_SIZE } from "@/components/Card/config/constants";
import { CARD_CONFIG_OPTIONS } from "@/components/Card/config/options";

import FacetCardsView from "./FacetCardsView";

const FACET_CARDS_ID = "facet-cards";

const FACET_CARDS_VIEW: BaseViewDef = {
	id: FACET_CARDS_ID,
	name: "Facet Cards",
	icon: "lucide-layout-grid",
	factory: (controller, containerEl) =>
		new ReactBasesView(FACET_CARDS_ID, FacetCardsView, controller, containerEl),
	options: () => [
    {
      type: "slider",
      displayName: "Item size",
      min: 50,
      max: 800,
      key: "cardSize",
      default: DEFAULT_CARD_SIZE,
      step: 10
    },
    {
      type: "property",
      displayName: "Image Property",
      key: "imageProperty",
    },
    {
      type: 'group',
      displayName: 'Card',
      items: [
        ...CARD_CONFIG_OPTIONS
      ]
    }
	],
};

export default FACET_CARDS_VIEW;
