import type { App, BasesEntry, BasesEntryGroup } from "obsidian";

import type { FacetsConfig } from "@/components/Facets/config";
import { getMedia, type MediaObject } from "@/lib/media";

type GetBackgroundParams = Pick<FacetsConfig, 'backgroundInferFrom' | 'backgroundProperty'> & {
  activeItem?: BasesEntry | BasesEntryGroup;
  items: (BasesEntry | BasesEntryGroup)[];
}

export const getBackground = (
  app: App,
  {
    activeItem,
    backgroundInferFrom,
    backgroundProperty,
    items,
  }: GetBackgroundParams): MediaObject | undefined => {
  if (!backgroundProperty) {
    return undefined;
  }

  const source = backgroundInferFrom === 'first-item' ? items[0] : activeItem;

  if (!source) {
    return undefined;
  }

  const entry = 'entries' in source ? source.entries[0] : source;

  if (!entry) {
    return undefined;
  }

  return getMedia(app, entry, backgroundProperty);
}
