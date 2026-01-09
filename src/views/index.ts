import type { BaseViewDef } from "@/types";

import FACET_CARDS_VIEW from "@/views/FacetCards";
import HEATMAP_CALENDAR_VIEW from "@/views/HeatmapCalendar";
import INFINITE_GALLERY_VIEW from "@/views/InfiniteGallery";
import LINEAR_CALENDAR_VIEW from "@/views/LinearCalendar";

const VIEWS: BaseViewDef[] = [
  FACET_CARDS_VIEW,
  HEATMAP_CALENDAR_VIEW,
  INFINITE_GALLERY_VIEW,
  LINEAR_CALENDAR_VIEW,
];

export default VIEWS;
