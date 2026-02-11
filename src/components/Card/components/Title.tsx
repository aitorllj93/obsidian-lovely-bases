import type { BasesEntry } from "obsidian";
import { memo } from "react";

import { useEntryTitle } from "@/hooks/use-title";
import { cn } from "@/lib/utils";

import type { CardConfig } from "../types";

type Props = {
  adaptToSize?: boolean;
  entry: BasesEntry;
  cardConfig: CardConfig;
  isOverlayMode?: boolean;
};

const Title = memo(({ adaptToSize = false, entry, cardConfig }: Props) => {
  const title = useEntryTitle(entry);
  const { cardSize, titleFont, showTitle } = cardConfig;

  if (!showTitle) return null;

  return (
    <h3
      className={cn(
        "font-semibold m-0 line-clamp-1 shrink-0",
        !adaptToSize &&
          (cardSize < 300
            ? "text-base"
            : cardSize < 400
              ? "text-lg"
              : "text-xl"),
        adaptToSize &&
          "@[0px]/lovely-card:text-3xs @7xs/lovely-card:text-2xs @6xs/lovely-card:text-xs @5xs/lovely-card:text-sm @4xs/lovely-card:text-base @2xs/lovely-card:text-lg @sm/lovely-card:text-xl",
      )}
      style={{
        fontFamily: titleFont,
      }}
    >
      {title}
    </h3>
  );
});

Title.displayName = "Title";

export default Title;
