
import type { BasesPropertyId } from "obsidian";

import ProjectFolders from "@/components/ProjectFolders";
import { useFolders } from "@/components/ProjectFolders/hooks/use-folders";
import type { ReactBaseViewProps } from "@/types";

export type ProjectFoldersConfig = {
  colorizeFiles: boolean;
  imageProperty?: BasesPropertyId;
};

const ProjectFoldersView = ({ app, config, data }: ReactBaseViewProps) => {
  const colorizeFiles = config.get(
    "colorizeFiles",
  ) as ProjectFoldersConfig["colorizeFiles"];
  const folders = useFolders(app, data, config);

  return (
    <div
      className="lovely-bases"
      style={{ height: "100%", width: "100%", overflowY: "auto" }}
    >
      <ProjectFolders folders={folders} colorizeFiles={colorizeFiles} />
    </div>
  );
};

export default ProjectFoldersView;
