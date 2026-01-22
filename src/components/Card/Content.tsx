import type { BasesEntry, BasesViewConfig } from "obsidian";
import { memo } from "react";

import Markdown from "@/components/Obsidian/Markdown";
import { cn } from "@/lib/utils";

import PropertyList from "./PropertyList";
import Title from "./Title";
import type { CardConfig } from "./types";

type Props = {
  entry: BasesEntry;
  cardConfig: CardConfig;
  config: BasesViewConfig;
  isOverlayMode?: boolean;
}

const Content = memo(({ entry, cardConfig, config, isOverlayMode }: Props) => {
  const { showTitle, showContent, contentMaxLength, properties } = cardConfig;

  const shouldDisplayContent = showTitle || showContent || properties.length > 0;

  if (!shouldDisplayContent) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex flex-col min-h-0 min-w-0 overflow-hidden",
        !isOverlayMode && "flex-1 h-full",
        isOverlayMode && "p-2",
      )}
    >
      <Title entry={entry} cardConfig={cardConfig} isOverlayMode={isOverlayMode} />

      <div className={cn(!isOverlayMode && "flex-1 min-h-0")}>
        <PropertyList
          entry={entry}
          cardConfig={cardConfig}
          config={config}
          isOverlayMode={isOverlayMode}
        />
      </div>

      {showContent && (
        <div className="px-(--size-4-2) overflow-hidden">
          <Markdown
            file={entry.file}
            maxLength={contentMaxLength}
            className={cn(
              "text-sm line-clamp-6 overflow-hidden",
              isOverlayMode ? "text-white/90" : "text-foreground",
            )}
          />
        </div>
      )}
    </div>
  )
});

Content.displayName = "Content";

export default Content;
