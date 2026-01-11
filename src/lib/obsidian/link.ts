import { type App, normalizePath, TFile } from "obsidian";


export const isLink = (raw: string): boolean => {
  return raw.startsWith("[") && raw.endsWith("]");
}

export const parseWikilink = (raw: string): string => {
  const inner = raw.replace(/^\[\[|\]\]$/g, "");
  return inner.split("|")[0].trim();
}

export const getFile = (
  app: App,
  rawLink: string,
  sourcePath: string
): TFile | null => {
  const link = parseWikilink(rawLink);

  const dest = app.metadataCache.getFirstLinkpathDest(link, sourcePath);

  return dest instanceof TFile ? dest : null;
}


export const getResourcePath = (app: App, rawLink: string, sourcePath: string): string | null => {
  const file = getFile(app, rawLink, sourcePath);
  if (!file) return null;
  return app.vault.adapter.getResourcePath(normalizePath(file.path)) ?? null;
}
