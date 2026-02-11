import type { BasesEntry, BasesViewConfig } from "obsidian";

import type { GroupConfig } from "@/components/Group/types";
import { useEntryProperty } from "@/hooks/use-property";

type Props = {
  key: string;
  config: BasesViewConfig;
  groupConfig: GroupConfig;
  items: BasesEntry[];
};

export default function Header({ key, config, groupConfig, items }: Props) {
  const title = useEntryProperty(
    items[0],
    config,
    groupConfig.groupTitleProperty,
  );
  const subtitle = useEntryProperty(
    items[0],
    config,
    groupConfig.groupSubtitleProperty,
  );

  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        {((title && !title.isEmpty) || key !== "") && (
          <h2
            id="carousel-title"
            className="text-2xl md:text-3xl font-bold tracking-tight text-card-foreground"
          >
            {title && !title.isEmpty ? title.value.toString() : key}
          </h2>
        )}
        {subtitle && !subtitle.isEmpty && (
          <p className="mt-1 text-muted-foreground">
            {subtitle.value.toString()}
          </p>
        )}
      </div>
    </div>
  );
}
