import { ReactBasesView } from "@/lib/view-class";
import type { BaseViewDef } from "@/types";

import ProjectFoldersView from "./ProjectFoldersView";

const PROJECT_FOLDERS_ID = "project-folders";

const PROJECT_FOLDERS_VIEW: BaseViewDef = {
	id: PROJECT_FOLDERS_ID,
	name: "Project Folders",
	icon: "lucide-folder",
	factory: (controller, containerEl) =>
		new ReactBasesView(PROJECT_FOLDERS_ID, ProjectFoldersView, controller, containerEl),
  options: () => [
    {
      type: "property",
      displayName: "Image property",
      key: "imageProperty",
    },
    {
      type: "toggle",
      displayName: "Colorize files",
      key: "colorizeFiles",
      default: false,
    },
    // ON Click: Open search (On click on topic: open search for that topic)
  ]
};

export default PROJECT_FOLDERS_VIEW;
