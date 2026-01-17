
import type { BasesEntry, BasesEntryGroup, BasesPropertyId } from "obsidian";

import { fn } from 'storybook/test';

import { aBasesQueryResult, aBasesViewConfig } from "@/__mocks__";
import { useObsidian } from "@/components/Obsidian/Context";
import type { EntryClickEventHandler, EntryHoverEventHandler, ReactBaseViewProps } from "@/types";

type ViewRenderer<T extends Record<string, unknown> = Record<string, unknown>> = T & {
  data?: BasesEntry[];
  groupedData?: BasesEntryGroup[];
  properties?: BasesPropertyId[];
  onEntryClick?: EntryClickEventHandler;
  onEntryHover?: EntryHoverEventHandler;
};

export const createViewRenderer = <T extends Record<string, unknown> = Record<string, unknown>>(
  Component: React.ComponentType<ReactBaseViewProps>,
) => {
  return ({ data = [], groupedData = [], properties = [], onEntryClick, onEntryHover, ...config }: ViewRenderer<T>) => {
    const { isEmbedded } = useObsidian();

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
