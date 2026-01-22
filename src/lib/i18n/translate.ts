
import { locales } from "./locales";
import { en } from "./locales/en";
import type { Namespace, NamespacedTranslationKey, SupportedLocale } from "./types";

const getNestedValue = (obj: unknown, path: string): string => {
	return path
		.split(".")
		.reduce(
			(acc, key) => (acc as Record<string, unknown>)?.[key],
			obj,
		) as string;
};

export const translate = <N extends Namespace>(locale: SupportedLocale, namespace: N, key: NamespacedTranslationKey<N>): string => {
  const translations = locales[locale] ?? en;
  const value = getNestedValue(translations[namespace], key);

  if (value === undefined) {
    return getNestedValue(en[namespace], key);
  }

  return value;
};
