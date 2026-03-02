import { FACETS_CONFIG_VIEW_OPTIONS } from "@/components/Facets/config";
import { ReactBasesView } from "@/lib/view-class";
import type { BaseViewDef } from "@/types";
import { CARDS_ID, LOVELY_VIEW_ICONS, LOVELY_VIEW_NAMES } from "@/views/constants";

import FacetCardsView from "./FacetCardsView";

const FACET_CARDS_VIEW: BaseViewDef = {
	id: CARDS_ID,
  name: LOVELY_VIEW_NAMES[CARDS_ID],
  icon: LOVELY_VIEW_ICONS[CARDS_ID],
	factory: (controller, containerEl) =>
		new ReactBasesView(CARDS_ID, FacetCardsView, controller, containerEl),
	options: () => [
    ...FACETS_CONFIG_VIEW_OPTIONS,
  ]
};

export default FACET_CARDS_VIEW;
