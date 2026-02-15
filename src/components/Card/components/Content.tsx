import type { BasesEntry, BasesViewConfig } from "obsidian";
import { type CSSProperties, memo } from "react";

import type { FacetsConfig } from "@/components/Facets/config";
import { cn } from "@/lib/utils";

import type { CardColors } from "../types";

import MarkdownContent from "./MarkdownContent";
import PropertyList from "./PropertyList";
import Title from "./Title";

type Props = {
  entry: BasesEntry;
  facetsConfig: FacetsConfig;
  colors: CardColors;
  config: BasesViewConfig;
  isOverlayMode?: boolean;
};

const Content = memo(
  ({
    entry,
    facetsConfig,
    colors,
    config,
    isOverlayMode,
  }: Props) => {
    const { titlePosition, cardAdaptToSize, contentShowMarkdown, contentFont, cardLayout, properties } =
      facetsConfig;

    if (titlePosition === "none" && !contentShowMarkdown && properties.length === 0) {
      return null;
    }

    return (
      <div
        className={cn(
          "flex flex-col min-h-0 min-w-0 overflow-hidden",
          !isOverlayMode && "flex-1 h-full",
          !cardAdaptToSize && cardLayout !== "polaroid" && "p-(--size-4-2)",
          cardAdaptToSize &&
            "@[0px]/lovely-card:px-1 @4xs/lovely-card:px-(--size-4-2)",
          cardAdaptToSize &&
            "@[0px]/lovely-card:gap-1 @7xs/lovely-card:gap-1.5 @5xs/lovely-card:gap-2",
          cardAdaptToSize &&
            "@[0px]/lovely-card:pt-1 @7xs/lovely-card:pt-1.5 @5xs/lovely-card:pt-2",
          cardAdaptToSize &&
            cardLayout !== "polaroid" &&
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
          facetsConfig={facetsConfig}
          entry={entry}
          isOverlayMode={isOverlayMode}
        />

        <PropertyList
          facetsConfig={facetsConfig}
          config={config}
          entry={entry}
          isOverlayMode={isOverlayMode}
        />

        <MarkdownContent
          facetsConfig={facetsConfig}
          entry={entry}
        />
      </div>
    );
  },
);

Content.displayName = "Content";

export default Content;
