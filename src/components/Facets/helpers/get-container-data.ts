import { type App, TFile } from "obsidian";

import { accent } from "@/lib/colors";

import { getPropertyValue, getTitle } from "@/lib/obsidian/entry";
import { isWikiLink, parseWikilink } from "@/lib/properties";
import { isGroup, type Props } from "../types";

export type ContainerData = {
  color: string;
  title: string;
  icon?: string;
  file?: TFile;
};

export const getContainerData = (
  props: Props,
  app: App,
  containerEl?: HTMLElement,
  fallback?: Partial<ContainerData>,
): ContainerData => {
  const { facetsConfig } = props;
  if (!isGroup(props)) {
    const colorProperty = facetsConfig.colorProperty;

    return {
      color: getPropertyValue(props.data, colorProperty) ?? fallback?.color ?? accent(containerEl),
      title: getTitle(props.data),
      file: props.data.file,
    };
  }

  const key = props.data.key?.toString() ?? "null";

  if (key === 'null') {
    return {
      color: fallback?.color ?? accent(containerEl),
      title: '',
    };
  }

  const isLink = isWikiLink(key);
  const title = isLink ? parseWikilink(key) : key;

  if (!isLink || !facetsConfig.groupInferPropertiesFromLinkedNotes) {
    return {
      color: fallback?.color ?? accent(containerEl),
      title,
    };
  }

  const file = app.metadataCache.getFirstLinkpathDest(
    title,
    props.data.entries[0]?.file.path ?? "",
  );

  if (!file || !(file instanceof TFile)) {
    return {
      color: fallback?.color ?? accent(containerEl),
      title,
    };
  }

  const [, colorProperty] = facetsConfig.colorProperty?.split(".") ?? [];
  const [, iconProperty] = facetsConfig.iconProperty?.split(".") ?? [];

  const frontmatter =
    app.metadataCache.getFileCache(file)?.frontmatter;

  return {
    color: (frontmatter?.[colorProperty] as string | null) ?? fallback?.color ?? accent(containerEl),
    icon: (frontmatter?.[iconProperty] as string | null) ?? fallback?.icon ?? undefined,
    title,
    file,
  };

}
