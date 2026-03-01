import {
  type BasesEntry,
  BasesEntryGroup,
  type BasesViewConfig,
  StringValue,
} from "obsidian";
import { type CSSProperties, useState } from "react";

import type { FacetsConfig } from "@/components/Facets/config";
import { useContainerData } from "@/components/Facets/hooks/use-container-data";

import { Frame } from "@/components/reui/frame";
import { KanbanColumn, KanbanColumnContent } from "@/components/reui/kanban";
import { cn } from "@/lib/utils";

import Header from "./Header";
import Item from "./Item";

type Props = {
  columnId: string;
  config: BasesViewConfig;
  facetsConfig: FacetsConfig;
  data: BasesEntry[];
  direction: "row" | "column";
  isOverlay?: boolean;
};

const Column = ({ columnId, data, direction, ...props }: Props) => {
  const [isCollapsed, setCollapsed] = useState(false);
  const group = new BasesEntryGroup();
  group.key = new StringValue(columnId);
  group.entries = data;

  const { color, title, icon } = useContainerData(
    {
      ...props,
      data: group,
    },
    {
      color: "var(--color-foreground)",
    },
  );

  const toggleCollapsed = () => setCollapsed((prev) => !prev);

  return (
    <KanbanColumn value={columnId}>
      <Frame
        spacing="sm"
        direction={direction}
        className={cn("h-full bg-(--column-color)/40")}
        style={
          {
            "--column-color":
              color !== "var(--color-foreground)"
                ? color
                : "var(--color-muted)",
          } as CSSProperties
        }
      >
        <Header
          color={color}
          direction={direction}
          groupCounterPosition={props.facetsConfig.groupCounterPosition}
          isCollapsed={isCollapsed}
          title={title}
          toggleCollapsed={toggleCollapsed}
          totalItems={data.length}
          icon={icon}
        />
        {!isCollapsed && (
          <KanbanColumnContent
            value={columnId}
            className={cn(
              "flex p-1",
              direction === 'column' && "flex-col",
              direction === 'row' && "flex-row items-center"
            )}
            style={{
              gap: props.facetsConfig.layoutGap,
              paddingInline: props.facetsConfig.layoutGap,
              paddingBlock: props.facetsConfig.layoutGap,
            }}
          >
            {data.map((entry) => (
              <Item
                key={entry.file.path?.toString()}
                config={props.config}
                data={entry}
                facetsConfig={props.facetsConfig}
              />
            ))}
          </KanbanColumnContent>
        )}
      </Frame>
    </KanbanColumn>
  );
};

export default Column;
