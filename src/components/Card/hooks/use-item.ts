import type { App, BasesEntry, BasesPropertyId } from "obsidian";
import { useMemo } from "react";

import { getImage, getProperty, getTitle } from "@/lib/properties";

import type { CardItem } from "../types";

type UseItemProps = {
  app: App;
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

export const useItem = ({ app, entry, propertiesToDisplay, hoverPropertyDisplay, imageProperty }: UseItemProps): CardItem => {
  return useMemo(() => {
    const title = getTitle(entry);
    const image = getImage(app, entry, imageProperty);
    const properties = propertiesToDisplay.map(prop => getProperty(entry, prop.id));
    const hoverProperty = hoverPropertyDisplay ? getProperty(entry, hoverPropertyDisplay.id) : null;


    return {
      id: entry.file.path,
      image,
      title,
      entry,
      file: entry.file,
      properties,
      hoverProperty,
    };
  }, [entry, imageProperty, propertiesToDisplay, hoverPropertyDisplay, app]);
}
