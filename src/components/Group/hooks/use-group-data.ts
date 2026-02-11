import { TFile } from "obsidian";

import { useObsidian } from "@/components/Obsidian/Context";
import { accent } from "@/lib/colors";

import { isWikiLink, parseWikilink } from "@/lib/properties";
import type { GroupConfig } from "../types";

type GroupData = {
  color: string;
  icon: string | null;
  title: string;
  file?: TFile;
};

export function useGroupData(
  key: string,
  groupConfig: GroupConfig,
  sourcePath?: string,
): GroupData {
  const { app } = useObsidian();

  const keyIsLink = isWikiLink(key);
  const title = key !== "null" ? parseWikilink(key) : "";

  let file: TFile | null = null;

  if (keyIsLink) {
    file = app.metadataCache.getFirstLinkpathDest(
      title,
      sourcePath ?? "",
    );
  }

  const [, colorProperty] = groupConfig.groupColorProperty?.split(".") ?? [];
  const [, iconProperty] = groupConfig.groupIconProperty?.split(".") ?? [];

  let color = accent();
  let icon: string | null = null;

  if (file && file instanceof TFile) {
    const frontmatter =
      app.metadataCache.getFileCache(file)?.frontmatter;
    color = (frontmatter?.[colorProperty] as string | null) ?? color;
    icon = (frontmatter?.[iconProperty] as string | null) ?? null;
  }

  return {
    color,
    icon,
    title,
    file,
  };
}
