import type { App, BasesEntry, BasesPropertyId, TFile } from "obsidian";

import { isHexColor } from "./colors";
import { getPropertyValue } from "./obsidian/entry";
import { getFile } from "./obsidian/link";
import { isWikiLinkOrEmbed, parseWikilink } from "./properties";

export type MediaType =
  'audio' |
  'color' |
  'empty' |
  'image' |
  'unsupported' |
  'url' |
  'video';

export type MediaObject = {
  value?: string;
  type: MediaType;
}

const AUDIO_EXTENSIONS = [
  'mp3',
  'wav',
  'ogg',
  'm4a',
  'aac',
  'flac'
];

const IMAGE_EXTENSIONS = [
  'png',
  'jpg',
  'jpeg',
  'gif',
  'webp',
  'svg',
  'avif',
  'bmp',
  'ico'
];

const VIDEO_EXTENSIONS = [
  'mp4',
  'webm',
  'ogv',
  'ogg'
];

const getExtension = (value: string): string | null => {
  const clean = value.split("?")[0].split("#")[0];

  const parts = clean.split(".");
  if (parts.length < 2) return null;

  const last = parts[parts.length - 1];
  return last ? last.toLowerCase() : null;
};

export const isVideo = (value: string) => {
  const ext = getExtension(value);
  return !!ext && VIDEO_EXTENSIONS.includes(ext);
}

export const isImage = (value: string) => {
  const ext = getExtension(value);
  return !!ext && IMAGE_EXTENSIONS.includes(ext);
}

export const isAudio = (value: string) => {
  const ext = getExtension(value);
  return !!ext && AUDIO_EXTENSIONS.includes(ext);
}

export const isUrl = (value: string) => {
  return value.startsWith('http');
}

export const getMediaType = (value?: string | null): MediaType => {
  if (!value) {
    return 'empty';
  }
  if (isUrl(value)) {
    return 'url';
  }
  if (isImage(value)) {
    return 'image';
  }
  if (isVideo(value)) {
    return 'video';
  }
  if (isAudio(value)) {
    return 'audio';
  }
  if (isHexColor(value)) {
    return 'color';
  }

  return 'unsupported';
}

const mediaCache = new Map<string, string|undefined>();
export const getMedia = (app: App, entry: BasesEntry, propertyId?: BasesPropertyId): MediaObject | undefined => {
  let file: TFile | null = entry.file;
  let src: string | null = file.path;
  let type: MediaType = 'unsupported';
  let value: string | undefined;

  if (entry.file.extension === 'md' && !propertyId) {
    // For notes without configured propertyId. Also for thumbnails.
    return undefined;
  }

  if (propertyId) {
    const val = getPropertyValue(entry, propertyId);

    if (!val && entry.file.extension === 'md') {
      return undefined;
    }

    if (val) {
      src = isWikiLinkOrEmbed(val) ? parseWikilink(val) : val;
      file = null;
    }
  }

  type = getMediaType(src);

  if (src && mediaCache.has(src)) {
    return {
      type,
      value: mediaCache.get(src),
    }
  }

  const notRequiresResolve =
    type === 'color' ||
    type === 'unsupported' ||
    type === 'empty' ||
    src?.startsWith('http');

  if (notRequiresResolve) {
    value = src;
  } else {
    if (!file) {
      file = getFile(app, src as string, entry.file.path);
    }
    value = file ? app.vault.getResourcePath(file) : undefined;
  }

  if (mediaCache.size > 1000) {
    const firstKey = mediaCache.keys().next().value;
    mediaCache.delete(firstKey);
  }

  mediaCache.set(src as string, value);

  return {
    type,
    value,
  }
}
