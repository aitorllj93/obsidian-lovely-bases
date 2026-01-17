export { STORY_ORDERS } from "./story-orders";

import * as ThreeDCarousel from "../../views/3DCarousel/3DCarouselView.stories";
import * as Carousel from "../../views/Carousel/CarouselView.stories";
import * as FacetCards from "../../views/FacetCards/FacetCardsView.stories";
import * as HeatmapCalendar from "../../views/HeatmapCalendar/HeatmapCalendarView.stories";
import * as InfiniteGallery from "../../views/InfiniteGallery/InfiniteGalleryView.stories";
import * as LinearCalendar from "../../views/LinearCalendar/LinearCalendarView.stories";
import * as ProjectFolders from "../../views/ProjectFolders/ProjectFoldersView.stories";
import * as RadarChart from "../../views/RadarChart/RadarChartView.stories";

export const STORIES = {
  HeatmapCalendar,
  LinearCalendar,
  ProjectFolders,
  '3DCarousel': ThreeDCarousel,
  Carousel,
  FacetCards,
  InfiniteGallery,
  RadarChart,
};

