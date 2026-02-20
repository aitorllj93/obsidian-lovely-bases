import type { App, BasesEntry, BasesPropertyId } from "obsidian";

import { getExternalMedia } from "@/lib/external-media";
import { getMedia } from "@/lib/media";

import type { CardMedia } from "../types";

export const getCardMedia = (app: App, entry: BasesEntry, propertyId?: BasesPropertyId): CardMedia | undefined => {
  const media = getMedia(app, entry, propertyId);

  if (media?.type === 'url' && media.value) {
    const externalMedia = getExternalMedia(media.value);

    if (externalMedia) {
      return externalMedia;
    }
  }

  return media;
}
