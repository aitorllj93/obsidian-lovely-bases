import { CARD_CONFIG_OPTIONS } from "@/components/Card/constants";
import { detectLocale, type NamespacedTranslationKey, translate } from "@/lib/i18n";
import { ReactBasesView } from "@/lib/view-class";
import type { BaseViewDef } from "@/types";

import InfiniteGalleryView from "./InfiniteGalleryView";

const locale = detectLocale();
const t = (key: NamespacedTranslationKey<'infiniteGallery'>) => translate(locale, 'infiniteGallery', key);

const INFINITE_GALLERY_ID = "infinite-gallery";

const INFINITE_GALLERY_VIEW: BaseViewDef = {
	id: INFINITE_GALLERY_ID,
	name: "Infinite Gallery",
	icon: "lucide-infinity",
	factory: (controller, containerEl) =>
		new ReactBasesView(INFINITE_GALLERY_ID, InfiniteGalleryView, controller, containerEl),
  options: () => [
    {
      type: "group",
      displayName: t("options.grid.title"),
      items: [
        {
          type: "toggle",
          displayName: t("options.grid.masonry.title"),
          key: "masonry",
          default: false,
        },
      ],
    },
    ...CARD_CONFIG_OPTIONS,
  ],
};

export default INFINITE_GALLERY_VIEW;
