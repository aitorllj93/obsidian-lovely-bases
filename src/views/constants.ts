
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

export const LOVELY_VIEW_NAMES: Record<LovelyViewId, string> = {
  [THREE_D_CAROUSEL_ID]: '3D Carousel',
  [CARDS_ID]: 'Grid',
  [CAROUSEL_ID]: 'Carousel',
  [HEATMAP_CALENDAR_ID]: 'Heatmap Calendar',
  [INFINITE_GALLERY_ID]: 'Infinite Gallery',
  [KANBAN_ID]: 'Kanban',
  [LINEAR_CALENDAR_ID]: 'Linear Calendar',
  [PROJECT_FOLDERS_ID]: 'Project Folders (Deprecated)',
  [RADAR_CHART_ID]: 'Radar Chart',
};

export const LOVELY_VIEW_ICONS: Record<LovelyViewId, string> = {
  [THREE_D_CAROUSEL_ID]: 'lucide-gallery-horizontal',
  [CARDS_ID]: 'lucide-layout-grid',
  [CAROUSEL_ID]: 'lucide-gallery-horizontal',
  [HEATMAP_CALENDAR_ID]: 'lucide-flame',
  [INFINITE_GALLERY_ID]: 'lucide-infinity',
  [KANBAN_ID]: 'lucide-square-kanban',
  [LINEAR_CALENDAR_ID]: 'lucide-calendar-days',
  [PROJECT_FOLDERS_ID]: 'lucide-folder',
  [RADAR_CHART_ID]: 'lucide-hexagon',
};
