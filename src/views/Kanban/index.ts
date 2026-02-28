import { FACETS_CONFIG_VIEW_OPTIONS } from "@/components/Facets/config";
import { ReactBasesView } from "@/lib/view-class";
import type { BaseViewDef } from "@/types";

import KanbanView from "./KanbanView";

const KANBAN_ID = "kanban";

const KANBAN_VIEW: BaseViewDef = {
	id: KANBAN_ID,
	name: "Kanban",
	icon: "lucide-square-kanban",
	factory: (controller, containerEl) =>
		new ReactBasesView(KANBAN_ID, KanbanView, controller, containerEl),
	options: () => [
    ...FACETS_CONFIG_VIEW_OPTIONS,
  ]
};

export default KANBAN_VIEW;
