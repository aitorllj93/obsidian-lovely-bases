import type { BasesEntry, BasesViewConfig } from "obsidian";

import Facets from "@/components/Facets";
import type { FacetsConfig } from "@/components/Facets/config";

import { KanbanItem, KanbanItemHandle } from "@/components/reui/kanban";

type Props = {
  config: BasesViewConfig;
  data: BasesEntry;
  facetsConfig: FacetsConfig;
};

const Item = ({ config, data, facetsConfig }: Props) => {
  return (
    <KanbanItem value={data.file.path}>
      <KanbanItemHandle>
        <Facets config={config} data={data} facetsConfig={facetsConfig} />
      </KanbanItemHandle>
    </KanbanItem>
  );
};

export default Item;
