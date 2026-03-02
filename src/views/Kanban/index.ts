import { facetsConfigViewOptionsForLayouts } from "@/components/Facets/config";
import { ReactBasesView } from "@/lib/view-class";
import type { BaseViewDef } from "@/types";
import { KANBAN_ID, LOVELY_VIEW_ICONS, LOVELY_VIEW_NAMES } from "@/views/constants";

import KanbanView from "./KanbanView";

const KANBAN_VIEW: BaseViewDef = {
	id: KANBAN_ID,
  name: LOVELY_VIEW_NAMES[KANBAN_ID],
  icon: LOVELY_VIEW_ICONS[KANBAN_ID],
	factory: (controller, containerEl) =>
		new ReactBasesView(KANBAN_ID, KanbanView, controller, containerEl),
	options: () => [
    ...facetsConfigViewOptionsForLayouts(
      ['sections'],
      'sections',
      KANBAN_ID
    ),
  ]
};

export default KANBAN_VIEW;
