import { facetsConfigViewOptionsForLayouts } from "@/components/Facets/config";
import {
  detectLocale,
  type NamespacedTranslationKey,
  translate,
} from "@/lib/i18n";
import { ReactBasesView } from "@/lib/view-class";
import type { BaseViewDef } from "@/types";
import { INFINITE_GALLERY_ID, LOVELY_VIEW_ICONS, LOVELY_VIEW_NAMES } from "@/views/constants";

import InfiniteGalleryView from "./InfiniteGalleryView";

const locale = detectLocale();
const t = (key: NamespacedTranslationKey<"infiniteGallery">) =>
  translate(locale, "infiniteGallery", key);

const INFINITE_GALLERY_VIEW: BaseViewDef = {
  id: INFINITE_GALLERY_ID,
  name: LOVELY_VIEW_NAMES[INFINITE_GALLERY_ID],
  icon: LOVELY_VIEW_ICONS[INFINITE_GALLERY_ID],
  factory: (controller, containerEl) =>
    new ReactBasesView(
      INFINITE_GALLERY_ID,
      InfiniteGalleryView,
      controller,
      containerEl,
    ),
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
    ...facetsConfigViewOptionsForLayouts(
      ['grid'],
      'grid',
      INFINITE_GALLERY_ID
    ),
  ],
};

export default INFINITE_GALLERY_VIEW;
