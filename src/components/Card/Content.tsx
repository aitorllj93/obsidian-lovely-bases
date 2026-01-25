import type { BasesEntry, BasesViewConfig } from "obsidian";
import { type CSSProperties, memo } from "react";

import Markdown from "@/components/Obsidian/Markdown";
import { cn } from "@/lib/utils";

import PropertyList from "./PropertyList";
import Title from "./Title";
import type { CardColors, CardConfig } from "./types";

type Props = {
  entry: BasesEntry;
  cardConfig: CardConfig;
  colors: CardColors;
  config: BasesViewConfig;
  isOverlayMode?: boolean;
}

const getContentColors = (
  colors: CardColors,
  contentFont: string | undefined,
) => {
  return {
    backgroundColor: colors.contentBackground,
    '--font-interface': contentFont,
    '--foreground': colors.contentForeground,
    '--h3-color': colors.titleForeground,
    '--pill-color': colors.contentForeground,
    '--link-color': colors.linkForeground,
    '--link-external-color': colors.linkForeground,
    '--link-unresolved-color': colors.linkForeground,
    '--link-color-hover': colors.contentForeground,
    '--link-external-color-hover': colors.contentForeground,
  } as CSSProperties;
}

const Content = memo(({ entry, cardConfig, colors, config, isOverlayMode }: Props) => {
  const { showTitle, showContent, contentFont, contentMaxLength, properties } = cardConfig;
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
      style={getContentColors(colors, contentFont)}>
      <Title entry={entry} cardConfig={cardConfig} isOverlayMode={isOverlayMode} />

      <div className={cn(!isOverlayMode && "flex-1 min-h-0")} style={{
        fontFamily: contentFont,
      } as CSSProperties}>
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
              "text-foreground text-sm line-clamp-6 overflow-hidden",
            )}
            style={{
              fontFamily: contentFont,
            } as CSSProperties}
          />
        </div>
      )}
    </div>
  )
});

Content.displayName = "Content";

export default Content;
