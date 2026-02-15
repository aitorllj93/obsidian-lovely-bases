
import { FACETS_CONFIG_VIEW_OPTIONS } from "@/components/Facets/config";
import { ReactBasesView } from "@/lib/view-class";
import type { BaseViewDef } from "@/types";

import CarouselView from "./CarouselView";

const CAROUSEL_ID = 'carousel';

const CAROUSEL_VIEW: BaseViewDef = {
  id: CAROUSEL_ID,
  name: "Carousel",
  icon: "lucide-gallery-horizontal",
  factory: (controller, containerEl) =>
    new ReactBasesView(CAROUSEL_ID, CarouselView, controller, containerEl),

  options: () => [
    ...FACETS_CONFIG_VIEW_OPTIONS
  ],
}

export default CAROUSEL_VIEW;
