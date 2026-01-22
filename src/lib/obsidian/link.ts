import { type App, TFile } from "obsidian";

const resourcePathCache = new Map<string, string | null>();

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
  // Crear clave única para el cache: rawLink + sourcePath
  const cacheKey = `${rawLink}|${sourcePath}`;

  // Verificar cache primero
  if (resourcePathCache.has(cacheKey)) {
    return resourcePathCache.get(cacheKey) ?? null;
  }

  // Calcular y cachear resultado
  const file = getFile(app, rawLink, sourcePath);
  const result = file ? (app.vault.getResourcePath(file) ?? null) : null;

  // Limitar tamaño del cache para evitar memory leaks (mantener solo los últimos 1000)
  if (resourcePathCache.size > 1000) {
    const firstKey = resourcePathCache.keys().next().value;
    resourcePathCache.delete(firstKey);
  }

  resourcePathCache.set(cacheKey, result);
  return result;
}
