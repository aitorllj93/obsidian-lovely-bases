import { facetsConfigViewOptionsForLayouts } from "@/components/Facets/config";
import { ReactBasesView } from "@/lib/view-class";
import type { BaseViewDef } from "@/types";
import { KANBAN_ID } from "@/views/constants";

import KanbanView from "./KanbanView";

const KANBAN_VIEW: BaseViewDef = {
	id: KANBAN_ID,
	name: "Kanban",
	icon: "lucide-square-kanban",
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
