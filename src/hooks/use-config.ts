import type { BasesViewConfig } from "obsidian";

export const useConfig = <T extends Record<string, unknown>>(
  config: BasesViewConfig,
  defaults: T,
): T => {
  const result = {} as T;
  for (const key of Object.keys(defaults) as (keyof T)[]) {
    result[key] = (config.get(key as string) ?? defaults[key]) as T[keyof T];
  }
  return result;
};
