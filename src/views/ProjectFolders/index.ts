import { FACETS_CONFIG_VIEW_OPTIONS } from "@/components/Facets/config";
import { ReactBasesView } from "@/lib/view-class";
import type { BaseViewDef } from "@/types";
import { LOVELY_VIEW_ICONS, LOVELY_VIEW_NAMES, PROJECT_FOLDERS_ID } from "@/views/constants";

import ProjectFoldersView from "./ProjectFoldersView";

const PROJECT_FOLDERS_VIEW: BaseViewDef = {
	id: PROJECT_FOLDERS_ID,
  name: LOVELY_VIEW_NAMES[PROJECT_FOLDERS_ID],
  icon: LOVELY_VIEW_ICONS[PROJECT_FOLDERS_ID],
	factory: (controller, containerEl) =>
		new ReactBasesView(
			PROJECT_FOLDERS_ID,
			ProjectFoldersView,
			controller,
			containerEl
		),
	options: () => [
    ...FACETS_CONFIG_VIEW_OPTIONS,
  ],
};

export default PROJECT_FOLDERS_VIEW;
