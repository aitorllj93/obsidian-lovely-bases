
import "./styles.css";

import moment from "moment";
import "moment/dist/locale/es";
import "moment/dist/locale/de";
import "moment/dist/locale/fr";
import "moment/dist/locale/it";
import "moment/dist/locale/pt";
import "moment/dist/locale/ru";
import "moment/dist/locale/zh-cn";
import "moment/dist/locale/ja";
import "moment/dist/locale/ko";

import { detectLocale } from "@/lib/i18n";

// Configure moment locale based on browser language
const locale = detectLocale();
const momentLocaleMap: Record<string, string> = {
  en: "en",
  es: "es",
  de: "de",
  fr: "fr",
  it: "it",
  pt: "pt",
  ru: "ru",
  zh: "zh-cn",
  ja: "ja",
  ko: "ko",
};
moment.locale(momentLocaleMap[locale] ?? "en");

globalThis.moment = moment;
