import { cva } from "class-variance-authority";
import type { BasesEntry, BasesViewConfig } from "obsidian";
import { type CSSProperties, memo, useMemo } from "react";

import type { CardLayout, FacetsConfig } from "@/components/Facets/config";
import { getTitle } from "@/lib/obsidian/entry";

import {
  getContentBackgroundColor,
  getContentMutedColor,
} from "../helpers/get-colors";

import MarkdownContent from "./MarkdownContent";
import PropertyList from "./PropertyList";
import Title from "./Title";

const ADAPT_CLASSES = {
  GAP: "@[0px]/lovely-card:gap-1 @7xs/lovely-card:gap-1.5 @5xs/lovely-card:gap-2",
  PADDING_BOTTOM:
    "@[0px]/lovely-card:pb-1 @7xs/lovely-card:pb-1.5 @5xs/lovely-card:pb-2",
  PADDING_INLINE: "@[0px]/lovely-card:px-1 @4xs/lovely-card:px-(--size-4-2)",
  PADDING_TOP:
    "@[0px]/lovely-card:pt-1 @7xs/lovely-card:pt-1.5 @5xs/lovely-card:pt-2",
};

const getContentStyle = (
  accentColor: string | undefined,
  cardLayout: CardLayout,
  contentFont: string | undefined,
) => {
  const background = getContentBackgroundColor(accentColor, cardLayout);
  const foreground = cardLayout === "overlay" ? "#fff" : accentColor;
  const muted = getContentMutedColor(background, cardLayout);

  return {
    backgroundColor: background,
    "--font-interface": contentFont,
    "--foreground": foreground,
    "--h3-color": cardLayout === "overlay" ? foreground : muted,
    "--pill-color": foreground,
    "--link-color": muted,
    "--link-external-color": muted,
    "--link-unresolved-color": muted,
    "--link-color-hover": foreground,
    "--link-external-color-hover": foreground,
  } as CSSProperties;
};

const contentVariants = cva("flex flex-col min-h-0 min-w-0 overflow-hidden", {
  variants: {
    cardLayout: {
      horizontal: "flex-1 h-full",
      vertical: "flex-1 h-full",
      polaroid: "flex-1 h-full",
      overlay: "",
    },
    cardAdaptToSize: {
      true: `${ADAPT_CLASSES.PADDING_INLINE} ${ADAPT_CLASSES.GAP} ${ADAPT_CLASSES.PADDING_TOP}`,
    },
  },
  defaultVariants: {
    cardLayout: "vertical",
    cardAdaptToSize: false,
  },
  compoundVariants: [
    {
      cardAdaptToSize: false,
      cardLayout: "horizontal",
      className: "p-(--size-4-2)",
    },
    {
      cardAdaptToSize: true,
      cardLayout: "horizontal",
      className: ADAPT_CLASSES.PADDING_BOTTOM,
    },
    {
      cardAdaptToSize: false,
      cardLayout: "vertical",
      className: "p-(--size-4-2)",
    },
    {
      cardAdaptToSize: true,
      cardLayout: "vertical",
      className: ADAPT_CLASSES.PADDING_BOTTOM,
    },
    {
      cardAdaptToSize: false,
      cardLayout: "overlay",
      className: "p-(--size-4-2)",
    },
    {
      cardAdaptToSize: true,
      cardLayout: "overlay",
      className: ADAPT_CLASSES.PADDING_BOTTOM,
    },
  ],
});

type Props = Pick<
  FacetsConfig,
  | "cardAdaptToSize"
  | "cardLayout"
  | "contentFont"
  | "contentMarkdownMaxHeight"
  | "contentMarkdownMaxLength"
  | "contentPosition"
  | "contentShowMarkdown"
  | "contentShowPropertyTitles"
  | "titleFont"
  | "titlePosition"
  | "properties"
> & {
  accentColor?: string;
  entry: BasesEntry;
  config: BasesViewConfig;
  isOverlayMode?: boolean;
  width: number;
};

const PureContent = ({
  accentColor,
  cardAdaptToSize,
  cardLayout,
  config,
  contentFont,
  contentMarkdownMaxHeight,
  contentMarkdownMaxLength,
  contentPosition,
  contentShowMarkdown,
  contentShowPropertyTitles,
  entry,
  titleFont,
  titlePosition,
  properties,
  width,
}: Props) => {
  const shouldShow =
    titlePosition === "inside" ||
    (contentPosition === "inside" &&
      (contentShowMarkdown || properties.length > 0));

  const className = contentVariants({
    cardAdaptToSize,
    cardLayout,
  });
  const style = useMemo(() => {
    if (!shouldShow) {
      return {};
    }

    return getContentStyle(accentColor, cardLayout, contentFont);
  }, [accentColor, cardLayout, contentFont, shouldShow]);

  if (!shouldShow) {
    return null;
  }

  return (
    <div className={className} style={style}>
      <Title
        cardAdaptToSize={cardAdaptToSize}
        layoutItemSize={width}
        title={getTitle(entry)}
        titleFont={titleFont}
        titlePosition={titlePosition}
      />

      <PropertyList
        cardAdaptToSize={cardAdaptToSize}
        cardLayout={cardLayout}
        contentFont={contentFont}
        contentPosition={contentPosition}
        contentShowPropertyTitles={contentShowPropertyTitles}
        config={config}
        entry={entry}
        properties={properties}
      />

      <MarkdownContent
        cardAdaptToSize={cardAdaptToSize}
        contentFont={contentFont}
        contentMarkdownMaxHeight={contentMarkdownMaxHeight}
        contentMarkdownMaxLength={contentMarkdownMaxLength}
        contentPosition={contentPosition}
        contentShowMarkdown={contentShowMarkdown}
        entry={entry}
      />
    </div>
  );
};

const Content = memo(PureContent);

Content.displayName = "Content";

export default Content;
