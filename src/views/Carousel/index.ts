
import { facetsConfigViewOptionsForLayouts } from "@/components/Facets/config";
import { ReactBasesView } from "@/lib/view-class";
import type { BaseViewDef } from "@/types";
import { CAROUSEL_ID, LOVELY_VIEW_ICONS, LOVELY_VIEW_NAMES } from "@/views/constants";

import CarouselView from "./CarouselView";

const CAROUSEL_VIEW: BaseViewDef = {
  id: CAROUSEL_ID,
  name: LOVELY_VIEW_NAMES[CAROUSEL_ID],
  icon: LOVELY_VIEW_ICONS[CAROUSEL_ID],
  factory: (controller, containerEl) =>
    new ReactBasesView(CAROUSEL_ID, CarouselView, controller, containerEl),
  options: () => [
    ...facetsConfigViewOptionsForLayouts(
      ['sections'],
      'sections',
      CAROUSEL_ID
    ),
  ]
}

export default CAROUSEL_VIEW;
