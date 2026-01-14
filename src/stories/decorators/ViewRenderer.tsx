
import type { BasesEntry, BasesEntryGroup, BasesPropertyId } from "obsidian";

import { aBasesQueryResult, aBasesViewConfig } from "@/__mocks__";
import { useObsidian } from "@/components/Obsidian/Context";
import type { ReactBaseViewProps } from "@/types";

type ViewRenderer<T extends Record<string, unknown> = Record<string, unknown>> = T & {
  data?: BasesEntry[];
  groupedData?: BasesEntryGroup[];
  properties?: BasesPropertyId[];
};

export const createViewRenderer = <T extends Record<string, unknown> = Record<string, unknown>>(
  Component: React.ComponentType<ReactBaseViewProps>,
) => {
  return ({ data = [], groupedData = [], properties = [], ...config }: ViewRenderer<T>) => {
    const { app, component, containerEl, isEmbedded } = useObsidian();

    const props: ReactBaseViewProps = {
      app,
      component,
      containerEl,
      isEmbedded,
      data: aBasesQueryResult({
        data,
        groupedData,
      }),
      config: aBasesViewConfig(config, properties),
    };

    return <Component {...props} />;
  };
};
