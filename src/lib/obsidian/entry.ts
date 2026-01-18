import type { App, BasesEntry, BasesPropertyId, BasesViewConfig, Value } from "obsidian";

import { getResourcePath } from "./link";

export type Property = {
  displayName: string;
  id: BasesPropertyId;
  value: Value;
  isEmpty: boolean;
}

export const getTitle = (entry: BasesEntry): string => {
  return entry.file.basename.replace(/\.[^.]+$/, '');
}

export const getLabeledProperty = (entry: BasesEntry, config: BasesViewConfig, propertyId: BasesPropertyId): Property => {
  const value = entry.getValue(propertyId);
  const displayName = config.getDisplayName(propertyId) as string;

  const isEmpty = value === null || value === undefined || value.toString() === 'null';

  return {
    id: propertyId,
    displayName,
    value,
    isEmpty,
  }
}

const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'ico', 'bmp', 'tiff', 'tif', 'heic', 'heif'];

export const getImage = (app: App, entry?: BasesEntry, propertyId?: BasesPropertyId): string | null => {
  const isImage = entry?.file.extension && imageExtensions.includes(entry.file.extension);
  if (!entry || (!propertyId && !isImage)) return null;

  const imageUrl = isImage ? entry.file.path : entry.getValue(propertyId)?.toString();
  let imageSrc: string | undefined;

  if (imageUrl && imageUrl !== 'null') {
    imageSrc = imageUrl.startsWith('http')
      ? imageUrl
      : getResourcePath(app, imageUrl, entry.file.path) ?? undefined;
  }
  return imageSrc;
}
