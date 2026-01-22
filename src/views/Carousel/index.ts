

import { CARD_CONFIG_OPTIONS } from "@/components/Card/constants";
import { detectLocale, type NamespacedTranslationKey, translate } from "@/lib/i18n";
import { ReactBasesView } from "@/lib/view-class";
import type { BaseViewDef } from "@/types";

import CarouselView from "./CarouselView";

const locale = detectLocale();
const t = (key: NamespacedTranslationKey<'common'>) => translate(locale, 'common', key);

const CAROUSEL_ID = 'carousel';

const CAROUSEL_VIEW: BaseViewDef = {
  id: CAROUSEL_ID,
  name: "Carousel",
  icon: "lucide-gallery-horizontal",
  factory: (controller, containerEl) =>
    new ReactBasesView(CAROUSEL_ID, CarouselView, controller, containerEl),

  options: () => [
    {
      type: "group",
      displayName: t("options.grouping.title"),
      // biome-ignore lint/suspicious/noExplicitAny: groupBy is not in the types
      shouldHide: (config) => (config as any).groupBy === undefined,
      items: [
        {
          type: "property",
          displayName: t("options.grouping.groupTitleProperty.title"),
          key: "groupTitleProperty",
          default: "",
        },
        {
          type: "property",
          displayName: t("options.grouping.groupSubtitleProperty.title"),
          key: "groupSubtitleProperty",
          default: "",
        },
      ],
    },
    ...CARD_CONFIG_OPTIONS,
  ],
}

export default CAROUSEL_VIEW;
