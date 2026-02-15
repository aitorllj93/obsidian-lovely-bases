import type { BasesEntry, BasesViewConfig } from "obsidian";

import type { FacetsConfig } from "@/components/Facets/config";
import { useEntryProperty } from "@/hooks/use-property";

type Props = {
  groupKey: string;
  config: BasesViewConfig;
  facetsConfig: FacetsConfig;
  items: BasesEntry[];
};

export default function Header({ groupKey, config, facetsConfig, items }: Props) {
  const title = useEntryProperty(
    items[0],
    config,
    facetsConfig.groupTitleProperty,
  );
  const subtitle = useEntryProperty(
    items[0],
    config,
    facetsConfig.groupSubtitleProperty,
  );

  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        {((title && !title.isEmpty) || groupKey !== "") && (
          <h2
            id="carousel-title"
            className="text-2xl md:text-3xl font-bold tracking-tight text-card-foreground"
          >
            {title && !title.isEmpty ? title.value.toString() : groupKey}
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
