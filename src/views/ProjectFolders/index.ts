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
			displayName: "Image Property",
			key: "imageProperty",
			default: "note.cover",
		},
		{
			type: "property",
			displayName: "Icon Property",
			key: "iconProperty",
			default: "note.icon",
		},
		{
			type: "property",
			displayName: "Color Property",
			key: "colorProperty",
			default: "note.color",
		},
		{
			type: "toggle",
			displayName: "Colorize Files",
			key: "colorizeFiles",
			default: false,
		},
	],
};

export default PROJECT_FOLDERS_VIEW;
