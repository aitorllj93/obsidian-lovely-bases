import type { BasesEntryGroup, BasesViewConfig } from "obsidian";

import type { FacetsConfig } from "@/components/Facets/config";

import {
  KanbanBoard,
  KanbanOverlay,
  Kanban as KanbanRoot,
} from "@/components/reui/kanban";

import type { GroupBy } from "@/lib/obsidian/groups";
import { cn } from "@/lib/utils";

import Background from "../Background";
import Column from "./components/Column";
import Item from "./components/Item";
import { useKanban } from "./hooks/use-kanban";
import { useObsidian } from "../Obsidian/Context";

type Props = {
  config: BasesViewConfig;
  data: BasesEntryGroup[];
  facetsConfig: FacetsConfig;
};

function Kanban({
  config,
  data,
  facetsConfig
}: Props) {
  const { containerEl, contentRef } = useObsidian();
  const {
    columns,
    direction,
    handleValueChange
  } = useKanban(
    data,
    (config as { groupBy?: GroupBy }).groupBy?.property,
    facetsConfig.groupLayoutDirection,
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
        onValueChange={handleValueChange}
        getItemValue={(item) => item.file.path}
        className="h-full max-h-screen w-full overflow-auto"
        style={{
          padding: facetsConfig.layoutGap,
        }}
      >
        <KanbanBoard
          className={cn(
            "focus-visible:outline-none items-start",
            direction === 'column' ? 'flex-row' : 'flex-col',
          )}
          style={{
            gap: facetsConfig.layoutGap,
          }}
        >
          {Object.entries(columns).map(([columnId, data]) => (
            <Column
              key={columnId}
              config={config}
              direction={direction}
              facetsConfig={facetsConfig}
              data={data}
              columnId={columnId}
            />
          ))}
        </KanbanBoard>
        <KanbanOverlay
          className="opacity-80"
          container={contentRef.current ?? containerEl}>
          {({ value, variant }) => {
            if (variant === "column") {
              const data = columns[value] ?? []
              return (
                <Column
                  direction={direction}
                  key={value}
                  config={config}
                  facetsConfig={facetsConfig}
                  data={data}
                  columnId={value as string}
                  isOverlay
                />
              )
            }

            const entry = Object.values(columns)
              .flat()
              .find((entry) => entry.file.path === value);

            if (!entry) return null

            return (
              <Item
                key={entry.file.path?.toString()}
                config={config}
                data={entry}
                facetsConfig={facetsConfig}
                isOverlay
              />
            )
          }}
        </KanbanOverlay>
      </KanbanRoot>
    </div>
  );
}

export default Kanban;
