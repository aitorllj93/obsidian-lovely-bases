import type { BasesEntryGroup, BasesViewConfig } from "obsidian";

import type { FacetsConfig } from "@/components/Facets/config";

import {
  KanbanBoard,
  KanbanOverlay,
  Kanban as KanbanRoot,
} from "@/components/reui/kanban";

import Background from "../Background";
import Column from "./components/Column";
import { useKanban } from "./hooks/use-kanban";

type Props = {
  config: BasesViewConfig;
  data: BasesEntryGroup[];
  facetsConfig: FacetsConfig;
};

function Kanban({ config, data, facetsConfig }: Props) {
  const { columns, onMove, setColumns } = useKanban(
    data,
    (config as { groupBy?: string }).groupBy,
  );

  return (
    <div className="relative isolate overflow-hidden">
      <Background
        backgroundGradient={facetsConfig.backgroundGradient}
        backgroundInferFrom={facetsConfig.backgroundInferFrom}
        backgroundProperty={facetsConfig.backgroundProperty}
        items={data}
      />
      <KanbanRoot
        value={columns}
        onValueChange={setColumns}
        getItemValue={(item) => item.file.path}
        className="h-full max-h-screen w-full overflow-auto"
        style={{
          padding: facetsConfig.layoutGap
        }}
      >
        <KanbanBoard
          className="focus-visible:outline-none items-start"
          style={{
            gap: facetsConfig.layoutGap,
          }}
        >
          {Object.entries(columns).map(([columnId, data]) => (
            <Column
              key={columnId}
              config={config}
              facetsConfig={facetsConfig}
              data={data}
              columnId={columnId}
            />
          ))}
        </KanbanBoard>
        <KanbanOverlay className="bg-muted/10 rounded-md border-2 border-dashed" />
      </KanbanRoot>
    </div>
  );
}

export default Kanban;
