import type { BasesEntry } from "obsidian";

import Markdown from "@/components/Obsidian/Markdown";
import { cn } from "@/lib/utils";

import type { CardConfig } from "../types";
import MarkdownSkeleton from "@/components/Obsidian/Markdown/Skeleton";

type Props = {
  adaptToSize?: boolean;
  cardConfig: CardConfig;
  entry: BasesEntry;
};

export default function MarkdownContent({
  adaptToSize = false,
  cardConfig,
  entry,
}: Props) {
  const { contentFont, contentMaxHeight, contentMaxLength, showContent } = cardConfig;

  if (!showContent) return null;

  return (
    <div className="overflow-hidden">
      <Markdown
        file={entry.file}
        maxLength={contentMaxLength}
        className={cn(
          "text-foreground overflow-auto [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
          adaptToSize ? "card-markdown-adaptable" : "card-markdown",
        )}
        skeleton={() => (
          <MarkdownSkeleton
            lines={contentMaxHeight / 12}
            className={
              adaptToSize ? "card-skeleton-adaptable" : "card-skeleton"
            }
            style={{
              maxHeight: `${contentMaxHeight}px`,
            }}
          />
        )}
        showEllipsis
        style={{
          fontFamily: contentFont,
          maxHeight: `${contentMaxHeight}px`
        }}
      />
    </div>
  );
}
