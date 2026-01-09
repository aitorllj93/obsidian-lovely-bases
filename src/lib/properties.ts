import { type App, type BasesEntry, type BasesPropertyId, type BasesViewConfig, type FrontMatterCache, normalizePath, TFile, type Value } from "obsidian";


export type Property = {
  displayName: string;
  id: BasesPropertyId;
  value: Value;
  isEmpty: boolean;
}

export const getTitle = (entry: BasesEntry): string => {
  return entry.file.basename.replace(/\.[^.]+$/, '');
}

export const getProperty = (entry: BasesEntry, config: BasesViewConfig, propertyId: BasesPropertyId): Property => {
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

export const isLink = (raw: string): boolean => {
  return raw.startsWith("[") && raw.endsWith("]");
}

export const parseWikilink = (raw: string): string => {
  const inner = raw.replace(/^\[\[|\]\]$/g, "");
  return inner.split("|")[0].trim();
}


export const resolveFileFrontmatter = (
  app: App,
  rawLink: string,
  sourcePath: string,
): FrontMatterCache | null => {
  const link = parseWikilink(rawLink);

  const dest = app.metadataCache.getFirstLinkpathDest(link, sourcePath);
  if (!(dest instanceof TFile)) return null;

  const frontmatter = app.metadataCache.getFileCache(dest)?.frontmatter;

  return frontmatter;
}

export const resolveFrontMatterValue = <T = unknown>(
  app: App,
  rawLink: string,
  sourcePath: string,
  key: string,
): T | null => {
  const frontmatter = resolveFileFrontmatter(app, rawLink, sourcePath);
  return frontmatter?.[key] as T | null;
}

export const resolveAttachment = (
  app: App,
  rawLink: string,
  sourcePath: string
): TFile | null => {
  const link = parseWikilink(rawLink);

  const dest = app.metadataCache.getFirstLinkpathDest(link, sourcePath);
  if (dest instanceof TFile) return dest;

  const target = link.split("/").pop()?.toLowerCase();
  return app.vault.getFiles().find(f => f.name.toLowerCase() === target) ?? null;
}

export const getImageResourcePath = (app: App, rawLink: string, sourcePath: string): string | null => {
  const file = resolveAttachment(app, rawLink, sourcePath);
  if (!file) return null;
  return app.vault.adapter.getResourcePath(normalizePath(file.path)) ?? null;
}

export const getImage = (app: App, entry: BasesEntry, propertyId: BasesPropertyId): string | null => {
  if (!propertyId) return null;

  const imageUrl = entry.getValue(propertyId)?.toString();
  let imageSrc: string | undefined;

  if (imageUrl && imageUrl !== 'null') {
    imageSrc = imageUrl.startsWith('http')
      ? imageUrl
      : getImageResourcePath(app, imageUrl, entry.file.path) ?? undefined;
  }
  return imageSrc;
}


export function formatPropertyValue(value: unknown): string {
  if (value === null || value === undefined) return '';
  if (Array.isArray(value)) {
    return value.map(v => formatPropertyValue(v)).join(', ');
  }
  if (value instanceof Date) {
    return value.toLocaleDateString();
  }
  if (typeof value === 'object' && value.toString) {
    // Handle Obsidian's property value objects
    const strValue = value.toString();
    if (strValue !== '[object Object]') {
      return strValue;
    }
    return JSON.stringify(value);
  }
  return String(value);
}
