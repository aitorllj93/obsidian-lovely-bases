import { type BasesEntry, BasesEntryGroup, type BasesViewConfig } from "obsidian"

import CardOutside from "../Card/Outside";

import type { FacetsConfig } from "./config";

type Props = {
  className?: string;
  config: BasesViewConfig;
  facetsConfig: FacetsConfig;
  item?: BasesEntry | BasesEntryGroup;
}

const FacetsOutside = ({
  className,
  config,
  facetsConfig,
  item,
}: Props) => {
  if (!item) {
    return null;
  }

  if (item instanceof BasesEntryGroup) {
    // not implemented yet
    return null;
  }

  return (
    <CardOutside
      backgroundGradient={facetsConfig.backgroundGradient}
      backgroundProperty={facetsConfig.backgroundProperty}
      className={className}
      config={config}
      contentFont={facetsConfig.contentFont}
      contentMarkdownMaxHeight={facetsConfig.contentMarkdownMaxHeight}
      contentMarkdownMaxLength={facetsConfig.contentMarkdownMaxLength}
      contentPosition={facetsConfig.contentPosition}
      contentShowMarkdown={facetsConfig.contentShowMarkdown}
      contentShowPropertyTitles={facetsConfig.contentShowPropertyTitles}
      entry={item}
      properties={facetsConfig.properties}
      titlePosition={facetsConfig.titlePosition}
      titleFont={facetsConfig.titleFont}
    />
  )
}

export default FacetsOutside;
