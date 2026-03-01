import { FACETS_CONFIG_VIEW_OPTIONS } from "@/components/Facets/config";
import { ReactBasesView } from "@/lib/view-class";
import type { BaseViewDef } from "@/types";
import { PROJECT_FOLDERS_ID } from "@/views/constants";

import ProjectFoldersView from "./ProjectFoldersView";

const PROJECT_FOLDERS_VIEW: BaseViewDef = {
	id: PROJECT_FOLDERS_ID,
	name: "Project Folders (Deprecated)",
	icon: "lucide-folder",
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
