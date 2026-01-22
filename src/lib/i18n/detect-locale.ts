import type { SupportedLocale } from "./types";

export const SUPPORTED_LOCALES: SupportedLocale[] = [
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

export const detectLocale = (): SupportedLocale => {
  const languageCode = window.localStorage.getItem('language') ?? DEFAULT_LOCALE;

	if (SUPPORTED_LOCALES.includes(languageCode as SupportedLocale)) {
		return languageCode as SupportedLocale;
	}

	return DEFAULT_LOCALE;
};

export const detectBrowserLocale = (): SupportedLocale => {
  const browserLanguage = navigator.language;
  const languageCode = browserLanguage.split("-")[0].toLowerCase();

  if (SUPPORTED_LOCALES.includes(languageCode as SupportedLocale)) {
    return languageCode as SupportedLocale;
  }

  return DEFAULT_LOCALE;
};
