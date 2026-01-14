import { type BasesPropertyId, type BasesQueryResult, type BasesViewConfig, Keymap, TFile } from "obsidian";
import { useMemo } from "react";

import { useObsidian } from "@/components/Obsidian/Context";
import { accent, linear } from "@/lib/colors";
import { getImage, getTitle, isLink, parseWikilink } from "@/lib/properties";

import type { Folder } from "../types";


export const useFolders = (
  data: BasesQueryResult,
  config: BasesViewConfig,
): Folder[] => {
  const { app } = useObsidian();
  const accentColor = accent();
  const imageProperty = config.get("imageProperty") as BasesPropertyId;
  const colorConfigProperty = (config.get("colorProperty") ?? "note.color") as BasesPropertyId;
  const iconConfigProperty = (config.get("iconProperty") ?? "note.icon") as BasesPropertyId;

  const [, colorProperty] = colorConfigProperty.split(".");
  const [, iconProperty] = iconConfigProperty.split(".");

  return useMemo(() => {
    const folders: Folder[] = [];

    for (const group of data.groupedData) {
      const isMulti = group.key.toString().includes(",");
      const keys = isMulti
        ? group.key.toString().split(", ")
        : [group.key.toString()];

      for (const key of keys) {
        const keyIsLink = isLink(key);
        const title = key !== "null" ? parseWikilink(key) : "";

        let color = accentColor;
        let icon: string | null = null;
        let projectFile: TFile | null = null;

        if (keyIsLink) {
          projectFile = app.metadataCache.getFirstLinkpathDest(
            title,
            group.entries[0].file.path,
          );

          if (projectFile instanceof TFile) {
            const frontmatter =
              app.metadataCache.getFileCache(projectFile)?.frontmatter;
            color = (frontmatter?.[colorProperty] as string | null) ?? accentColor;
            icon = (frontmatter?.[iconProperty] as string | null) ?? null;
          }
        }

        const gradient = linear(color, 0.2);

        let folder: Folder | undefined = folders.find((f) => f.title === title);
        if (!folder) {
          folder = {
            title,
            icon,
            gradient,
            files: [],
            onClick: (event: React.MouseEvent) => {
              event.preventDefault();

              if (keyIsLink && projectFile) {
                const modEvent = Keymap.isModEvent(event.nativeEvent);
                void app.workspace.openLinkText(projectFile.path, "", modEvent);
              }
            },
          };
          folders.push(folder);
        }
        folder.files.push(
          ...group.entries.map((entry) => {
            return {
              id: entry.file.path,
              file: entry.file,
              image: getImage(app, entry, imageProperty),
              title: getTitle(entry),
              onClick: (event: React.MouseEvent) => {
                event.preventDefault();
                event.stopPropagation();

                const modEvent = Keymap.isModEvent(event.nativeEvent);
                void app.workspace.openLinkText(entry.file.path, "", modEvent);
              },
            };
          }),
        );
      }
    }
    return folders;
  }, [data, app, accentColor, imageProperty, colorProperty, iconProperty]);
};
