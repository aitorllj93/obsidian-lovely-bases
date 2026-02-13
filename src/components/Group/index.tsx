import type { BasesEntryGroup, BasesViewConfig } from "obsidian";

import type { CardConfig } from "@/components/Card/types";

import Group from "./Group";
import type { GroupConfig } from "./types";

type Props = {
	cardConfig: CardConfig;
  groupConfig: GroupConfig;
	data: BasesEntryGroup[];
	config: BasesViewConfig;
};

function Groups({
	cardConfig,
  data,
  groupConfig,
	config,
}: Props) {
	return (
    <div className="flex flex-wrap gap-12 mx-auto">
      {data.map((group, index) => (
        <div
          key={group.key?.toString() ?? ""}
          className="animate-in fade-in slide-in-from-bottom-8 duration-700"
          style={{ animationDelay: `${200 + index * 100}ms` }}
        >
          <Group
            groupKey={group.key?.toString() ?? ""}
            entries={group.entries}
            cardConfig={cardConfig}
            groupConfig={groupConfig}
            config={config}
          />
        </div>
      ))}
    </div>
	);
}

export default Groups;
