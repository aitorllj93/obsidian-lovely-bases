import type { BasesEntry, BasesPropertyId } from "obsidian";

import { getPropertyValue } from "@/lib/obsidian/entry";

const ICON_BY_EXTENSION = {
  md: "text-align-start",
  pdf: "file-text",
  epub: "book",
  base: "database",
  canvas: "layout-dashboard",
  unknown: "file-question-mark",
} as const;

export const getIcon = (
  entry: BasesEntry,
  iconProperty?: BasesPropertyId,
) => {
  let icon = getPropertyValue(entry, iconProperty);

  if (icon) {
    return icon;
  }

  icon = ICON_BY_EXTENSION[
    entry.file.extension as keyof typeof ICON_BY_EXTENSION
  ];

  if (icon) {
    return icon;
  }

  return ICON_BY_EXTENSION.unknown;
}
