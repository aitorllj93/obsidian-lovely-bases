import type { LocaleTranslations, SupportedLocale } from "../types";
import { de } from "./de";
import { en } from "./en";
import { es } from "./es";
import { fr } from "./fr";
import { it } from "./it";
import { ja } from "./ja";
import { ko } from "./ko";
import { pt } from "./pt";
import { ru } from "./ru";
import { zh } from "./zh";

export const locales: Record<SupportedLocale, LocaleTranslations> = {
  en,
  es,
  de,
  fr,
  it,
  pt,
  ru,
  zh,
  ja,
  ko,
};
