import type { BasesViewConfig } from "obsidian";

export function useConfigValue<T = unknown>(config: BasesViewConfig, key: string, defaultValue: T): T {
  return config.get(key) as T ?? defaultValue;
}
