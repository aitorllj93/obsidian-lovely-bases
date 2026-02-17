import { TFile } from "obsidian";

import { useObsidian } from "@/components/Obsidian/Context";
import { accent } from "@/lib/colors";

import { getPropertyValue, getTitle } from "@/lib/obsidian/entry";
import { isWikiLink, parseWikilink } from "@/lib/properties";
import { isGroup, type Props } from "../types";

type ContainerData = {
  color: string;
  title: string;
  icon?: string;
  file?: TFile;
};

export function useContainerData(props: Props, fallback?: Partial<ContainerData>): ContainerData {
  const { facetsConfig } = props;
  const { app, containerEl } = useObsidian();

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
