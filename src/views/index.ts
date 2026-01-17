import type { BaseViewDef } from "@/types";

import THREE_D_CAROUSEL_VIEW from "@/views/3DCarousel";
import CAROUSEL_VIEW from "@/views/Carousel";
import FACET_CARDS_VIEW from "@/views/FacetCards";
import HEATMAP_CALENDAR_VIEW from "@/views/HeatmapCalendar";
import INFINITE_GALLERY_VIEW from "@/views/InfiniteGallery";
import LINEAR_CALENDAR_VIEW from "@/views/LinearCalendar";
import PROJECT_FOLDERS_VIEW from "@/views/ProjectFolders";
import RADAR_CHART_VIEW from "@/views/RadarChart";

const VIEWS: BaseViewDef[] = [
  CAROUSEL_VIEW,
  FACET_CARDS_VIEW,
  HEATMAP_CALENDAR_VIEW,
  INFINITE_GALLERY_VIEW,
  LINEAR_CALENDAR_VIEW,
  PROJECT_FOLDERS_VIEW,
  RADAR_CHART_VIEW,
  THREE_D_CAROUSEL_VIEW,
];

export default VIEWS;
