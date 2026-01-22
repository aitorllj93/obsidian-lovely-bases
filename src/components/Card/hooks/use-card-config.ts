import type { BasesViewConfig } from "obsidian";

import { DEFAULTS } from "@/components/Card/constants";
import type { CardConfig } from "@/components/Card/types";
import { useConfig } from "@/hooks/use-config";

export function useCardConfig(config: BasesViewConfig, defaultOverrides?: Partial<CardConfig>): CardConfig {
  const viewConfig = useConfig<CardConfig>(config, { ...DEFAULTS, ...defaultOverrides });
  viewConfig.properties = config.getOrder();

  return viewConfig;
}
