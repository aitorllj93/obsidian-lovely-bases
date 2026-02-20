import type { BasesEntry, BasesViewConfig } from "obsidian";

import Facets from "@/components/Facets";
import type { FacetsConfig } from "@/components/Facets/config";

type Props = {
  active: boolean;
  facetsConfig: FacetsConfig;
  config: BasesViewConfig;
  entry: BasesEntry;
  index: number;
};

export default function Item({ active, facetsConfig, config, entry, index }: Props) {
  return (
      <Facets
        active={active}
        index={index}
        key={entry.file.path}
        data={entry as BasesEntry}
        config={config}
        facetsConfig={facetsConfig}
        initialAnimation
      />
  );
}
