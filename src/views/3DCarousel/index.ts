import { ReactBasesView } from "@/lib/view-class";
import type { BaseViewDef } from "@/types";
import { THREE_D_CAROUSEL_ID } from "@/views/constants";

import ThreeDCarouselView from "./3DCarouselView";

const THREE_D_CAROUSEL_VIEW: BaseViewDef = {
  id: THREE_D_CAROUSEL_ID,
  name: "3D Carousel",
  icon: "lucide-gallery-horizontal",
  factory: (controller, containerEl) =>
    new ReactBasesView(THREE_D_CAROUSEL_ID, ThreeDCarouselView, controller, containerEl),

  options: () => [],
}

export default THREE_D_CAROUSEL_VIEW;
