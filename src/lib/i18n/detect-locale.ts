import type { SupportedLocale } from "./types";

const SUPPORTED_LOCALES: SupportedLocale[] = [
	"en",
	"es",
	"de",
	"fr",
	"it",
	"pt",
	"ru",
	"zh",
	"ja",
	"ko",
];

const DEFAULT_LOCALE: SupportedLocale = "en";

/**
 * Detecta el locale del navegador y lo mapea a un locale soportado.
 * Extrae el código de idioma base (ej: "es-ES" → "es").
 * Fallback a "en" si no está soportado.
 */
export const detectLocale = (): SupportedLocale => {
	const browserLanguage = navigator.language;
	const languageCode = browserLanguage.split("-")[0].toLowerCase();

	if (SUPPORTED_LOCALES.includes(languageCode as SupportedLocale)) {
		return languageCode as SupportedLocale;
	}

	return DEFAULT_LOCALE;
};
