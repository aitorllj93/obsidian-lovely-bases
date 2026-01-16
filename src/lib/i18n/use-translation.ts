import { useObsidian } from "@/components/Obsidian/Context";

import { locales } from "./locales";
import { en } from "./locales/en";
import type { Namespace, TranslationKey } from "./types";

/**
 * Accede a un valor anidado usando dot notation.
 * Ej: getNestedValue({ a: { b: "hello" } }, "a.b") → "hello"
 */
const getNestedValue = (obj: unknown, path: string): string => {
	return path
		.split(".")
		.reduce(
			(acc, key) => (acc as Record<string, unknown>)?.[key],
			obj,
		) as string;
};

/**
 * Hook para obtener traducciones de un namespace específico.
 *
 * @param namespace - El namespace de traducciones a usar
 * @returns Objeto con función `t` para traducir y `locale` actual
 *
 * @example
 * const { t } = useTranslation("heatmapCalendar");
 * return <span>{t("legend.less")}</span>;
 */
export const useTranslation = <N extends Namespace>(namespace: N) => {
	const { locale } = useObsidian();

	const t = (key: TranslationKey<N>): string => {
		const translations = locales[locale] ?? en;
		const nsTranslations = translations[namespace];
		const value = getNestedValue(nsTranslations, key);

		// Fallback a inglés si no existe la traducción
		if (value === undefined) {
			return getNestedValue(en[namespace], key);
		}

		return value;
	};

	return { t, locale };
};
