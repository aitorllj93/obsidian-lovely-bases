import type { BasesEntry } from "obsidian";

import Markdown from "@/components/Obsidian/Markdown";
import { cn } from "@/lib/utils";

import type { CardConfig } from "../types";

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
  const { contentFont, contentMaxLength, showContent } = cardConfig;

  if (!showContent) return null;

  return (
    <div className="overflow-hidden">
      <Markdown
        file={entry.file}
        maxLength={contentMaxLength}
        className={cn(
          "text-foreground line-clamp-6 overflow-hidden",
          !adaptToSize && "text-sm",
          adaptToSize &&
            "@[0px]/lovely-card:text-5xs @8xs/lovely-card:text-4xs @7xs/lovely-card:text-3xs @6xs/lovely-card:text-2xs @5xs/lovely-card:text-xs @4xs/lovely-card:text-sm",
        )}
        showEllipsis
        style={{
          fontFamily: contentFont,
        }}
      />
    </div>
  );
}
