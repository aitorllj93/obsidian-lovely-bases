
export const CARDS_ID = "lovelyCards" as const;
export const CAROUSEL_ID = 'lovelyCarousel' as const;
export const THREE_D_CAROUSEL_ID = 'lovely3dCarousel' as const;
export const HEATMAP_CALENDAR_ID = "lovelyHeatmapCalendar" as const;
export const INFINITE_GALLERY_ID = "lovelyInfiniteGallery" as const;
export const KANBAN_ID = "lovelyKanban" as const;
export const LINEAR_CALENDAR_ID = "lovelyLinearCalendar" as const;
export const PROJECT_FOLDERS_ID = "lovelyProjectFolders" as const;
export const RADAR_CHART_ID = "lovelyRadarChart" as const;

export type LovelyViewId =
  | typeof CARDS_ID
  | typeof CAROUSEL_ID
  | typeof THREE_D_CAROUSEL_ID
  | typeof HEATMAP_CALENDAR_ID
  | typeof INFINITE_GALLERY_ID
  | typeof KANBAN_ID
  | typeof LINEAR_CALENDAR_ID
  | typeof PROJECT_FOLDERS_ID
  | typeof RADAR_CHART_ID;
