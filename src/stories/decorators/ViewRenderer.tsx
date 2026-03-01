
import type { BasesEntry, BasesEntryGroup, BasesPropertyId } from "obsidian";

import { fn } from 'storybook/test';

import { aBasesEntryGroup, aBasesQueryResult, aBasesViewConfig } from "@/__mocks__";
import { useObsidian } from "@/components/Obsidian/Context";
import type { GroupBy } from "@/lib/obsidian/groups";
import type { EntryClickEventHandler, EntryHoverEventHandler, ReactBaseViewProps } from "@/types";

type GroupedViewRenderer<T extends Record<string, unknown> = Record<string, unknown>> = T & {
  groupBy?: GroupBy;
  groupedData?: BasesEntryGroup[];
  properties?: BasesPropertyId[];
  onEntryClick?: EntryClickEventHandler;
  onEntryHover?: EntryHoverEventHandler;
};

type UngroupedViewRenderer<T extends Record<string, unknown> = Record<string, unknown>> = T & {
  data?: BasesEntry[];
  properties?: BasesPropertyId[];
  onEntryClick?: EntryClickEventHandler;
  onEntryHover?: EntryHoverEventHandler;
};

type ViewRenderer<T extends Record<string, unknown> = Record<string, unknown>> = GroupedViewRenderer<T> | UngroupedViewRenderer<T>;

const isGroupedViewRenderer = (renderer: ViewRenderer): renderer is GroupedViewRenderer => {
  return 'groupedData' in renderer;
};

export const createViewRenderer = <T extends Record<string, unknown> = Record<string, unknown>>(
  Component: React.ComponentType<ReactBaseViewProps>,
) => {
  return (rendererProps: ViewRenderer<T>) => {
    const { isEmbedded } = useObsidian();
    const { properties = [], onEntryClick, onEntryHover, ...config } = rendererProps;
    const isGrouped = isGroupedViewRenderer(rendererProps);

    const data = isGrouped ? rendererProps.groupedData?.flatMap(group => group.entries) : rendererProps.data;
    const groupedData = isGrouped ? rendererProps.groupedData : [aBasesEntryGroup('', data ?? [])];

    const groupBy: GroupBy | undefined = isGrouped ?
      (
        rendererProps.groupBy ??
        { property: properties[0] ?? 'file.path', direction: 'ASC' }
      ) : undefined;

    const props: ReactBaseViewProps = {
      isEmbedded,
      data: aBasesQueryResult({
        data,
        groupedData,
        properties,
      }),
      config: aBasesViewConfig(config, {
        groupBy,
        properties
      }),
      onEntryClick: onEntryClick ?? fn(),
      onEntryHover: onEntryHover ?? fn(),
    };

    return <Component {...props} />;
  };
};
