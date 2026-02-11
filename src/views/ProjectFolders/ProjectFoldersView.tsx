import { useCardConfig } from "@/components/Card/hooks/use-card-config";
import Groups from "@/components/Group";
import { useGroupConfig } from "@/components/Group/hooks/use-group-config";
import { Container } from "@/components/Obsidian/Container";
import { flattenGroups } from "@/lib/obsidian/groups";
import type { ReactBaseViewProps } from "@/types";

const ProjectFoldersView = ({ config, data, isEmbedded }: ReactBaseViewProps) => {
	const cardConfig = useCardConfig(config);
  const groupConfig = useGroupConfig(config);
  const flattenedGroups = flattenGroups(data.groupedData);

	return (
		<Container isEmbedded={isEmbedded} style={{ overflowY: "auto" }}>
			<Groups
				cardConfig={cardConfig}
				config={config}
        groupConfig={groupConfig}
				data={flattenedGroups}
			/>
		</Container>
	);
};

export default ProjectFoldersView;
