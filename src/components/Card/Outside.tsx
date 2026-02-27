import type { BasesEntry, BasesViewConfig } from "obsidian";

import type { FacetsConfig } from "@/components/Facets/config";
import { cn } from "@/lib/utils";

import Content from "./components/Content";

type Props = Pick<
  FacetsConfig,
  | "backgroundGradient"
  | "backgroundProperty"
  | "contentFont"
  | "contentMarkdownMaxHeight"
  | "contentMarkdownMaxLength"
  | "contentPosition"
  | "contentShowMarkdown"
  | "contentShowPropertyTitles"
  | "properties"
  | "titleFont"
  | "titlePosition"
> & {
  className?: string;
  config: BasesViewConfig;
  entry: BasesEntry;
  style?: React.CSSProperties;
};

const CardOutside = ({
  backgroundGradient,
  backgroundProperty,
  className,
  config,
  contentFont,
  contentMarkdownMaxHeight,
  contentMarkdownMaxLength,
  contentPosition,
  contentShowMarkdown,
  contentShowPropertyTitles,
  entry,
  properties,
  style,
  titleFont,
  titlePosition,
}: Props) => {
  const shouldShowContent =
    contentPosition === "layout" &&
    (contentShowMarkdown || properties.length > 0);
  const shouldShowTitle = titlePosition === "layout";

  if (!shouldShowContent && !shouldShowTitle) {
    return null;
  }

  return (
    <div className={cn("@container/lovely-card", className)} style={style}>
      <Content
        cardAdaptToSize
        cardLayout={
          backgroundProperty && backgroundGradient !== "light"
            ? "overlay"
            : "vertical"
        }
        config={config}
        contentFont={contentFont}
        contentMarkdownMaxHeight={contentMarkdownMaxHeight}
        contentMarkdownMaxLength={contentMarkdownMaxLength}
        contentPosition={contentPosition === "layout" ? "inside" : "layout"}
        contentShowMarkdown={contentShowMarkdown}
        contentShowPropertyTitles={contentShowPropertyTitles}
        entry={entry}
        properties={properties}
        titleFont={titleFont}
        titlePosition={titlePosition === "layout" ? "inside" : "none"}
        width={0}
      />
    </div>
  );
};

export default CardOutside;
