
import type { BasesEntry, BasesEntryGroup, BasesPropertyId } from "obsidian";

import { fn } from 'storybook/test';

import { aBasesEntryGroup, aBasesQueryResult, aBasesViewConfig } from "@/__mocks__";
import { useObsidian } from "@/components/Obsidian/Context";
import type { EntryClickEventHandler, EntryHoverEventHandler, ReactBaseViewProps } from "@/types";

type GroupedViewRenderer<T extends Record<string, unknown> = Record<string, unknown>> = T & {
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
    const data = isGroupedViewRenderer(rendererProps) ? rendererProps.groupedData.flatMap(group => group.entries) : rendererProps.data;
    const groupedData = isGroupedViewRenderer(rendererProps) ? rendererProps.groupedData : [
      aBasesEntryGroup('', data),
    ];

    const props: ReactBaseViewProps = {
      isEmbedded,
      data: aBasesQueryResult({
        data,
        groupedData,
        properties,
      }),
      config: aBasesViewConfig(config, properties),
      onEntryClick: onEntryClick ?? fn(),
      onEntryHover: onEntryHover ?? fn(),
    };

    return <Component {...props} />;
  };
};
