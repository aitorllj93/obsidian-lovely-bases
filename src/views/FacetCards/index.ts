import { FACETS_CONFIG_VIEW_OPTIONS } from "@/components/Facets/config";
import { ReactBasesView } from "@/lib/view-class";
import type { BaseViewDef } from "@/types";

import FacetCardsView from "./FacetCardsView";

const FACET_CARDS_ID = "facet-cards";

const FACET_CARDS_VIEW: BaseViewDef = {
	id: FACET_CARDS_ID,
	name: "Facet Cards",
	icon: "lucide-layout-grid",
	factory: (controller, containerEl) =>
		new ReactBasesView(FACET_CARDS_ID, FacetCardsView, controller, containerEl),
	options: () => [
    ...FACETS_CONFIG_VIEW_OPTIONS,
  ]
};

export default FACET_CARDS_VIEW;
