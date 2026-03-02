import { ReactBasesView } from "@/lib/view-class";
import type { BaseViewDef } from "@/types";
import { LOVELY_VIEW_ICONS, LOVELY_VIEW_NAMES, THREE_D_CAROUSEL_ID } from "@/views/constants";

import ThreeDCarouselView from "./3DCarouselView";

const THREE_D_CAROUSEL_VIEW: BaseViewDef = {
  id: THREE_D_CAROUSEL_ID,
  name: LOVELY_VIEW_NAMES[THREE_D_CAROUSEL_ID],
  icon: LOVELY_VIEW_ICONS[THREE_D_CAROUSEL_ID],
  factory: (controller, containerEl) =>
    new ReactBasesView(THREE_D_CAROUSEL_ID, ThreeDCarouselView, controller, containerEl),

  options: () => [],
}

export default THREE_D_CAROUSEL_VIEW;
