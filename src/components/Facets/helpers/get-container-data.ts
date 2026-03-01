import { type App, TFile } from "obsidian";

import { accent } from "@/lib/colors";
import { getPropertyValue, getTitle } from "@/lib/obsidian/entry";
import type { GroupBy } from "@/lib/obsidian/groups";
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
    return {
      color: getPropertyValue(props.data, facetsConfig.groupColorProperty) ?? fallback?.color ?? accent(containerEl),
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

  if (facetsConfig.groupInferPropertiesFrom === 'none') {
    return {
      color: fallback?.color ?? accent(containerEl),
      title,
    };
  }

  if (facetsConfig.groupInferPropertiesFrom === 'first-item') {
    const groupByConfig = (props.config as { groupBy?: GroupBy }).groupBy;
    const item = groupByConfig ?
      (props.data.entries.find(entry => {
        const keys = getPropertyValue(entry, groupByConfig.property)?.split(',');
        return keys?.some(k =>
          k === title || (isWikiLink(k) ?
            parseWikilink(k) === title :
            false),
        )
      }) ?? props.data.entries[0]) :
      props.data.entries[0];

    if (item) {
      return {
        color: getPropertyValue(item, facetsConfig.groupColorProperty) ?? fallback?.color ?? accent(containerEl),
        title: getPropertyValue(item, facetsConfig.groupTitleProperty) ?? key,
        file: item.file,
        icon: getPropertyValue(item, facetsConfig.groupIconProperty) ?? fallback?.icon ?? undefined,
      };
    }
  }

  if (!isLink) {
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

  const [, colorProperty] = facetsConfig.groupColorProperty?.split(".") ?? [];
  const [, iconProperty] = facetsConfig.groupIconProperty?.split(".") ?? [];

  const frontmatter =
    app.metadataCache.getFileCache(file)?.frontmatter;

  return {
    color: (frontmatter?.[colorProperty] as string | null) ?? fallback?.color ?? accent(containerEl),
    icon: (frontmatter?.[iconProperty] as string | null) ?? fallback?.icon ?? undefined,
    title,
    file,
  };

}
