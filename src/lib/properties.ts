
import { type App, type BasesEntry, type BasesPropertyId, type BasesViewConfig, type FrontMatterCache, TFile, type Value } from "obsidian";

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
    value: value as Value,
    isEmpty,
  }
}

export async function setProperty<T = unknown>(
  app: App,
  entry: BasesEntry,
  fieldName: BasesPropertyId,
  value: T
) {
  const [_, property] = fieldName.split('.');
  const file: TFile = entry.file;

  await app.fileManager.processFrontMatter(file, (fm) => {
    if (value === null || value === undefined || value === "") {
      delete fm[property];
    } else {
      fm[property] = value;
    }
  });
}

export const isObsidianEmbed = (raw: string): boolean =>
  raw.startsWith("![[") && raw.endsWith("]]");

export const isWikiLink = (raw: string): boolean =>
  raw.startsWith("[[") && raw.endsWith("]]");

export const isWikiLinkOrEmbed = (raw: string) => isObsidianEmbed(raw) || isWikiLink(raw);

/** captures: ["!", string, string] | ["!", string, undefined] | [undefined, string, string] | [undefined, string, undefined] */
const WikiLinkRegex = /(!)?\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/;

export const parseWikilinkObject = (raw: string): {
  link?: string;
  alias?: string;
  isEmbed?: boolean;
} => {
  const match = raw.match(WikiLinkRegex);

  if (!match) {
    return { isEmbed: false };
  }

  return {
    isEmbed: !match[1],
    link: match[2],
    alias: match[3],
  }
}

export const parseWikilink = (raw: string): string => {
  const parsed = parseWikilinkObject(raw);

  return parsed.link as string;
}


export const resolveFileFrontmatter = (
  app: App,
  rawLink: string,
  sourcePath: string,
): FrontMatterCache | null => {
  const link = parseWikilink(rawLink);

  const dest = app.metadataCache.getFirstLinkpathDest(link, sourcePath);
  if (!(dest instanceof TFile)) return null;

  const frontmatter = app.metadataCache.getFileCache(dest)?.frontmatter ?? null;

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

  return dest instanceof TFile ? dest : null;
}

export const getImageResourcePath = (app: App, rawLink: string, sourcePath: string): string | null => {
  const file = resolveAttachment(app, rawLink, sourcePath);
  if (!file) return null;
  return app.vault.getResourcePath(file) ?? null;
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
  return imageSrc ?? null;
}
