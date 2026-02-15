import type { BasesEntry } from "obsidian";

import type { FacetsConfig } from "@/components/Facets/config";
import Markdown from "@/components/Obsidian/Markdown";
import MarkdownSkeleton from "@/components/Obsidian/Markdown/Skeleton";
import { cn } from "@/lib/utils";

type Props = {
  facetsConfig: FacetsConfig;
  entry: BasesEntry;
  showSkeleton?: boolean;
};

export default function MarkdownContent({
  facetsConfig,
  entry,
  showSkeleton = false,
}: Props) {
  const { cardAdaptToSize, contentFont, contentMarkdownMaxHeight, contentMarkdownMaxLength, contentShowMarkdown } = facetsConfig;

  if (!contentShowMarkdown) return null;

  return (
    <div className="overflow-hidden">
      <Markdown
        file={entry.file}
        maxLength={contentMarkdownMaxLength}
        className={cn(
          "text-foreground overflow-auto [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
          cardAdaptToSize ? "card-markdown-adaptable" : "card-markdown",
        )}
        skeleton={() => (
          <MarkdownSkeleton
            lines={contentMarkdownMaxHeight / 12}
            className={cn(
              cardAdaptToSize ? "card-skeleton-adaptable" : "card-skeleton",
              !showSkeleton && "invisible"
            )}
            style={{
              maxHeight: `${contentMarkdownMaxHeight}px`,
            }}
          />
        )}
        showEllipsis
        style={{
          fontFamily: contentFont,
          maxHeight: `${contentMarkdownMaxHeight}px`
        }}
      />
    </div>
  );
}
