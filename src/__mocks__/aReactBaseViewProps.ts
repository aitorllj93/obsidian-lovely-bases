import type { ReactBaseViewProps } from "@/types";

import { aBasesQueryResult } from "./aBasesQueryResult";
import { aBasesViewConfig } from "./aBasesViewConfig";

export const aReactBaseViewProps = (overrides: Partial<ReactBaseViewProps> = {}): ReactBaseViewProps => {
  return {
    data: aBasesQueryResult(),
    config: aBasesViewConfig(),
    isEmbedded: false,
    ...overrides,
  };
}
