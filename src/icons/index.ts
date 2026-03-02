
import CAROUSEL_ICON from './carousel';
import GRID_ICON from './grid';
import KANBAN_ICON from './kanban';
import RADAR_CHART_ICON from './radar-chart';

export * from './carousel';
export * from './grid';
export * from './kanban';
export * from './radar-chart';

const ICONS = new Map<string, string>([
  CAROUSEL_ICON,
  GRID_ICON,
  KANBAN_ICON,
  RADAR_CHART_ICON,
])

export default ICONS;
