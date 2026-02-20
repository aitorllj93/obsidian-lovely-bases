import type { BasesEntry, BasesViewConfig } from "obsidian";

import type { FacetsConfig } from "@/components/Facets/config";
import Content from "./components/Content";
import { cn } from "@/lib/utils";

type Props = Pick<
  FacetsConfig,
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
        cardLayout="vertical"
        config={config}
        contentFont={contentFont}
        contentMarkdownMaxHeight={contentMarkdownMaxHeight}
        contentMarkdownMaxLength={contentMarkdownMaxLength}
        contentPosition="inside"
        contentShowMarkdown={contentShowMarkdown}
        contentShowPropertyTitles={contentShowPropertyTitles}
        entry={entry}
        properties={properties}
        titleFont={titleFont}
        titlePosition={titlePosition === "layout" ? "inside" : titlePosition}
        width={0}
      />
    </div>
  );
};

export default CardOutside;
