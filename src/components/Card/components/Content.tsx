import type { BasesEntry, BasesViewConfig } from "obsidian";
import { type CSSProperties, memo } from "react";

import { cn } from "@/lib/utils";

import type { CardColors, CardConfig } from "../types";

import MarkdownContent from "./MarkdownContent";
import PropertyList from "./PropertyList";
import Title from "./Title";

type Props = {
  adaptToSize?: boolean;
  entry: BasesEntry;
  cardConfig: CardConfig;
  colors: CardColors;
  config: BasesViewConfig;
  isOverlayMode?: boolean;
};

const Content = memo(
  ({
    adaptToSize = false,
    entry,
    cardConfig,
    colors,
    config,
    isOverlayMode,
  }: Props) => {
    const { showTitle, showContent, contentFont, layout, properties } =
      cardConfig;

    if (!showTitle && !showContent && properties.length === 0) {
      return null;
    }

    return (
      <div
        className={cn(
          "flex flex-col min-h-0 min-w-0 overflow-hidden",
          !isOverlayMode && "flex-1 h-full",
          !adaptToSize && "p-(--size-4-2)",
          adaptToSize &&
            "@[0px]/lovely-card:px-1 @4xs/lovely-card:px-(--size-4-2)",
          adaptToSize &&
            "@[0px]/lovely-card:gap-1 @7xs/lovely-card:gap-1.5 @5xs/lovely-card:gap-2",
          adaptToSize &&
            "@[0px]/lovely-card:pt-1 @7xs/lovely-card:pt-1.5 @5xs/lovely-card:pt-2",
          adaptToSize &&
            layout !== "polaroid" &&
            "@[0px]/lovely-card:pb-1 @7xs/lovely-card:pb-1.5 @5xs/lovely-card:pb-2",
        )}
        style={
          {
            backgroundColor: colors.contentBackground,
            "--font-interface": contentFont,
            "--foreground": colors.contentForeground,
            "--h3-color": colors.titleForeground,
            "--pill-color": colors.contentForeground,
            "--link-color": colors.linkForeground,
            "--link-external-color": colors.linkForeground,
            "--link-unresolved-color": colors.linkForeground,
            "--link-color-hover": colors.contentForeground,
            "--link-external-color-hover": colors.contentForeground,
          } as CSSProperties
        }
      >
        <Title
          adaptToSize={adaptToSize}
          cardConfig={cardConfig}
          entry={entry}
          isOverlayMode={isOverlayMode}
        />

        <PropertyList
          adaptToSize={adaptToSize}
          cardConfig={cardConfig}
          config={config}
          entry={entry}
          isOverlayMode={isOverlayMode}
        />

        <MarkdownContent
          adaptToSize={adaptToSize}
          cardConfig={cardConfig}
          entry={entry}
        />
      </div>
    );
  },
);

Content.displayName = "Content";

export default Content;
