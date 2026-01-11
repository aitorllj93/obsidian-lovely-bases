import { useConfig } from "@/contexts/config";

export function useConfigValue<T = string>(key: string): T | null;
export function useConfigValue<T = string>(key: string, defaultValue: T): T;
export function useConfigValue<T = string>(
	key: string,
	defaultValue?: T,
): T | null {
  const config = useConfig();

	const v = config.get(key) as T | undefined | null;
	return v ?? defaultValue ?? null;
}
