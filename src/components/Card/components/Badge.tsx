import type { BasesEntry, BasesViewConfig } from "obsidian";
import { memo, useMemo } from "react";

import LucideIcon from "@/components/Obsidian/LucideIcon";
import { useEntryProperty } from "@/hooks/use-property";
import {
  contrastColor,
  darken,
  isHexColor,
  lighten,
  luminance,
} from "@/lib/colors";
import { cn } from "@/lib/utils";

import type { CardConfig } from "../types";

type Props = {
  adaptToSize?: boolean;
  entry: BasesEntry;
  cardConfig: CardConfig;
  config: BasesViewConfig;
};

const getBadgeStyles = (
  color: string | undefined,
  badgesFont: string | undefined,
): React.CSSProperties => {
  if (!color || !isHexColor(color)) {
    return {
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      color: "var(--color-white)",
      borderColor: "transparent",
      fontFamily: badgesFont,
    };
  }

  const l = luminance(color);
  const borderColor = l > 0.5 ? darken(color, 0.2) : lighten(color, 0.2);

  return {
    backgroundColor: color,
    color: contrastColor(color),
    borderColor: borderColor,
    fontFamily: badgesFont,
  };
};

const Badge = memo(
  ({ adaptToSize = false, cardConfig, config, entry }: Props) => {
    const { badgeProperty, badgeIcon, badgeColor, badgesFont } = cardConfig;

    const property = useEntryProperty(entry, config, badgeProperty);

    const badgeValue = useMemo(() => {
      if (!property || property.isEmpty) return null;
      return property.value.toString();
    }, [property]);

    if (!badgeValue) return null;

    const badgeStyles = getBadgeStyles(badgeColor, badgesFont);

    return (
      <div
        className={cn(
          "absolute z-10 flex items-center rounded-full font-medium shadow-md backdrop-blur-sm border",
          !adaptToSize && "text-sm top-2 right-2 gap-1 px-2 py-0.5",
          adaptToSize &&
            "@[0px]/lovely-card:text-5xs @[0px]/lovely-card:top-0.5 @[0px]/lovely-card:right-0.5 @[0px]/lovely-card:gap-0.5 @[0px]/lovely-card:px-1 @[0px]/lovely-card:py-0.5 @8xs/lovely-card:text-4xs @8xs/lovely-card:top-2 @8xs/lovely-card:right-2 @8xs/lovely-card:gap-1 @8xs/lovely-card:px-2 @8xs/lovely-card:py-0.5 @7xs/lovely-card:text-3xs @7xs/lovely-card:top-2 @7xs/lovely-card:right-2 @7xs/lovely-card:gap-1 @7xs/lovely-card:px-2 @7xs/lovely-card:py-0.5 @6xs/lovely-card:text-2xs @6xs/lovely-card:top-2 @6xs/lovely-card:right-2 @6xs/lovely-card:gap-1 @6xs/lovely-card:px-2 @6xs/lovely-card:py-0.5 @5xs/lovely-card:text-xs @5xs/lovely-card:top-2 @5xs/lovely-card:right-2 @5xs/lovely-card:gap-1 @5xs/lovely-card:px-2 @5xs/lovely-card:py-0.5 @4xs/lovely-card:text-sm @4xs/lovely-card:top-2 @4xs/lovely-card:right-2 @4xs/lovely-card:gap-1 @4xs/lovely-card:px-2 @4xs/lovely-card:py-0.5",
        )}
        style={badgeStyles}
      >
        {badgeIcon && (
          <LucideIcon
            name={badgeIcon}
            className={cn(
              "shrink-0",
              !adaptToSize && "size-3",
              adaptToSize &&
                "@[0px]/lovely-card:size-2 @8xs/lovely-card:size-2 @7xs/lovely-card:size-2.5 @6xs/lovely-card:size-2.5 @5xs/lovely-card:size-3 @4xs/lovely-card:size-3",
            )}
          />
        )}
        <span className="truncate max-w-[120px]">{badgeValue}</span>
      </div>
    );
  },
  (prevProps, nextProps) =>
    prevProps.entry === nextProps.entry &&
    prevProps.cardConfig.badgeProperty === nextProps.cardConfig.badgeProperty &&
    prevProps.cardConfig.badgeIcon === nextProps.cardConfig.badgeIcon &&
    prevProps.cardConfig.badgeColor === nextProps.cardConfig.badgeColor,
);

Badge.displayName = "Badge";

export default Badge;
