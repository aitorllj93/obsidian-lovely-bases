import { type App, type FrontMatterCache, TFile } from "obsidian";

import { parseWikilink } from "./link";

export const getFrontmatter = (
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

export const getFrontmatterValue = <T = unknown>(
  app: App,
  rawLink: string,
  sourcePath: string,
  key: string,
): T | null => {
  const frontmatter = getFrontmatter(app, rawLink, sourcePath);
  return frontmatter?.[key] as T | null;
}
