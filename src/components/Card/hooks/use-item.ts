import type { App, BasesEntry, BasesPropertyId, BasesViewConfig } from "obsidian";
import { useMemo } from "react";

import { getImage, getProperty, getTitle } from "@/lib/properties";

import type { CardItem } from "../types";

type UseItemProps = {
  app: App;
  config: BasesViewConfig;
  entry: BasesEntry;
  propertiesToDisplay: {
    id: BasesPropertyId;
    displayName: string;
  }[];
  hoverPropertyDisplay: {
    id: BasesPropertyId;
    displayName: string;
  } | null;
  imageProperty?: BasesPropertyId;
}

export const useItem = ({ app, config, entry, propertiesToDisplay, hoverPropertyDisplay, imageProperty }: UseItemProps): CardItem => {
  return useMemo(() => {
    const title = getTitle(entry);
    const image = getImage(app, entry, imageProperty);
    const properties = propertiesToDisplay.map(prop => getProperty(entry, config, prop.id));
    const hoverProperty = hoverPropertyDisplay ? getProperty(entry, config, hoverPropertyDisplay.id) : null;


    return {
      id: entry.file.path,
      image,
      title,
      entry,
      file: entry.file,
      properties,
      hoverProperty,
    };
  }, [entry, imageProperty, propertiesToDisplay, hoverPropertyDisplay, app, config]);
}
