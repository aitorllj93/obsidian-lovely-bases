
import type { BasesEntry, BasesEntryGroup } from "obsidian";

import { aBasesQueryResult, aBasesViewConfig, aReactBaseViewProps } from "@/__mocks__";
import type { ReactBaseViewProps } from "@/types";

type ViewRenderer<T extends Record<string, unknown> = Record<string, unknown>> = T & {
  data?: BasesEntry[];
  groupedData?: BasesEntryGroup[];
};

export const createViewRenderer = <T extends Record<string, unknown> = Record<string, unknown>>(
  Component: React.ComponentType<ReactBaseViewProps>,
) => {
  return ({ data = [], groupedData = [], ...config }: ViewRenderer<T>) => {
    const props = aReactBaseViewProps({
      data: aBasesQueryResult({
        data,
        groupedData,
      }),
      config: aBasesViewConfig(config),
    });
    return <Component {...props} />;
  };
};
