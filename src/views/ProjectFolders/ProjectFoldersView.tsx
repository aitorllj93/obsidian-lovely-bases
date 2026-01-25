
import { Container } from "@/components/Obsidian/Container";
import ProjectFolders from "@/components/ProjectFolders";
import { useFolders } from "@/components/ProjectFolders/hooks/use-folders";
import type { ReactBaseViewProps } from "@/types";
import type { ProjectFoldersConfig } from "./types";

const ProjectFoldersView = ({ config, data, isEmbedded }: ReactBaseViewProps) => {
  const colorizeFiles = config.get(
    "colorizeFiles",
  ) as ProjectFoldersConfig["colorizeFiles"];
  const folders = useFolders(data, config);

  return (
    <Container isEmbedded={isEmbedded} style={{ overflowY: "auto" }}>
      <ProjectFolders folders={folders} colorizeFiles={colorizeFiles} />
    </Container>
  );
};

export default ProjectFoldersView;
