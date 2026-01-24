import { ReactBasesView } from "@/lib/view-class";
import type { BaseViewDef } from "@/types";

import { PROJECT_FOLDERS_OPTIONS } from "./constants";
import ProjectFoldersView from "./ProjectFoldersView";

const PROJECT_FOLDERS_ID = "project-folders";

const PROJECT_FOLDERS_VIEW: BaseViewDef = {
	id: PROJECT_FOLDERS_ID,
	name: "Project Folders",
	icon: "lucide-folder",
	factory: (controller, containerEl) =>
		new ReactBasesView(
			PROJECT_FOLDERS_ID,
			ProjectFoldersView,
			controller,
			containerEl
		),
	options: () => PROJECT_FOLDERS_OPTIONS,
};

export default PROJECT_FOLDERS_VIEW;
