import type { BasesViewConfig } from "obsidian";

import { useConfig } from "@/hooks/use-config";

import { FACETS_CONFIG_DEFAULTS, type FacetsConfig } from "../config";

export function useFacetsConfig(config: BasesViewConfig, defaultOverrides?: Partial<FacetsConfig>): FacetsConfig {
  const viewConfig = useConfig<FacetsConfig>(config, { ...FACETS_CONFIG_DEFAULTS, ...defaultOverrides });
  viewConfig.properties = config.getOrder();

  return viewConfig;
}
