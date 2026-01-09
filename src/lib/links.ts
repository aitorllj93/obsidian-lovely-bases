import { type App, type BasesEntry, type BasesPropertyId, normalizePath, TFile } from "obsidian";

function parseWikilink(raw: string) {
  const inner = raw.replace(/^\[\[|\]\]$/g, "");
  return inner.split("|")[0].trim();
}

export function resolveAttachment(
  app: App,
  rawLink: string,
  sourcePath: string
): TFile | null {
  const link = parseWikilink(rawLink);

  const dest = app.metadataCache.getFirstLinkpathDest(link, sourcePath);
  if (dest instanceof TFile) return dest;

  const target = link.split("/").pop()?.toLowerCase();
  return app.vault.getFiles().find(f => f.name.toLowerCase() === target) ?? null;
}

export function getImageResourcePath(app: App, rawLink: string, sourcePath: string): string | null {
  const file = resolveAttachment(app, rawLink, sourcePath);
  if (!file) return null;
  return app.vault.adapter.getResourcePath(normalizePath(file.path)) ?? null;
}

export function getImageForEntry(app: App, entry: BasesEntry, propertyId: BasesPropertyId): string | null {
  const imageUrl = entry.getValue(propertyId)?.toString();
  let imageSrc: string | undefined = undefined;

  if (imageUrl && imageUrl !== 'null') {
    imageSrc = imageUrl.startsWith('http')
      ? imageUrl
      : getImageResourcePath(app, imageUrl, entry.file.path) ?? undefined;
  }
  return imageSrc;
}
