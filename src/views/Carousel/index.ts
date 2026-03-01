
import { facetsConfigViewOptionsForLayouts } from "@/components/Facets/config";
import { ReactBasesView } from "@/lib/view-class";
import type { BaseViewDef } from "@/types";
import { CAROUSEL_ID } from "@/views/constants";

import CarouselView from "./CarouselView";

const CAROUSEL_VIEW: BaseViewDef = {
  id: CAROUSEL_ID,
  name: "Carousel",
  icon: "lucide-gallery-horizontal",
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
