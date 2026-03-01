
import { type BasesEntry, BasesEntryGroup, type BasesViewConfig, StringValue } from "obsidian"
import { type CSSProperties, useState } from "react"

import type { FacetsConfig } from "@/components/Facets/config"
import { useContainerData } from "@/components/Facets/hooks/use-container-data"
import LucideIcon from "@/components/Obsidian/LucideIcon"

import { Badge } from "@/components/reui/badge"
import {
  Frame,
  FrameHeader,
  FrameTitle
} from "@/components/reui/frame"
import {
  KanbanColumn,
  KanbanColumnContent
} from "@/components/reui/kanban"
import { cn } from "@/lib/utils"

import Item from "./Item"

type Props = {
  columnId: string;
  config: BasesViewConfig;
  facetsConfig: FacetsConfig;
  data: BasesEntry[];
  isOverlay?: boolean;
};

const Column = ({
  columnId,
  data,
  ...props
}: Props) => {
  const [isCollapsed, setCollapsed] = useState(false);
  const group = new BasesEntryGroup();
  group.key = new StringValue(columnId);
  group.entries = data;

  const {
    color,
    title,
    icon
  } = useContainerData({
    ...props,
    data: group,
  }, {
    color: 'var(--color-foreground)'
  });

  const toggleCollapsed = () => setCollapsed(prev => !prev);

  return (
    <KanbanColumn value={columnId}>
      <Frame spacing="sm" className="h-full">
        <FrameHeader
          className={cn(
            "flex flex-row items-center gap-2 cursor-pointer transition-all",
            isCollapsed ? "writing-vertical" : "border-b mx-2",
          )}
          style={{
            "--header-color": color,
            borderColor: color !== 'var(--color-foreground)' ? color : 'var(--color-border)',
          } as CSSProperties}
          onClick={toggleCollapsed}
        >
          {icon && <LucideIcon className={cn(
            "size-4",
            isCollapsed && "order-2 pt-4 border-t"
          )} style={{
            color
          }} name={icon} />}
          <FrameTitle className={cn(
            isCollapsed && "order-3 pt-1",
            isCollapsed && (icon ? "pt-1" : "border-t pt-4")
          )} style={{
            color
          }}>{title}</FrameTitle>
          <Badge variant="ghost" size="sm" className={cn(
            "ml-auto",
            isCollapsed && "writing-horizontal order-1",
            "bg-(--header-color)/10 text-(--header-color)"
          )}>
            {data.length}
          </Badge>
        </FrameHeader>
        {!isCollapsed && <KanbanColumnContent
          value={columnId}
          className="flex flex-col p-1"
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
        </KanbanColumnContent>}
      </Frame>
    </KanbanColumn>
  );
};

export default Column;
