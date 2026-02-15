import type { BasesEntry, BasesViewConfig } from "obsidian";
import { memo } from "react";

import type { FacetsConfig } from "@/components/Facets/config";
import LucideIcon from "@/components/Obsidian/LucideIcon";
import { useEntryPropertyValue } from "@/hooks/use-property";
import {
  contrastColor,
  darken,
  isHexColor,
  lighten,
  luminance,
} from "@/lib/colors";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  entry: BasesEntry;
  facetsConfig: FacetsConfig;
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
  ({ className, facetsConfig, entry }: Props) => {
    const { badgeProperty, badgeIconProperty, badgeColorProperty, badgeFont, cardAdaptToSize } = facetsConfig;

    const text = useEntryPropertyValue(entry, badgeProperty);
    const color = useEntryPropertyValue(entry, badgeColorProperty);
    const icon = useEntryPropertyValue(entry, badgeIconProperty);

    if (!text) return null;

    const badgeStyles = getBadgeStyles(color, badgeFont);

    return (
      <div
        className={cn(
          "absolute z-10 flex items-center rounded-full font-medium shadow-md backdrop-blur-sm border",
          !cardAdaptToSize && "text-sm top-2 right-2 gap-1 px-2 py-0.5",
          cardAdaptToSize &&
            "@[0px]/lovely-card:text-5xs @[0px]/lovely-card:top-0.5 @[0px]/lovely-card:right-0.5 @[0px]/lovely-card:gap-0.5 @[0px]/lovely-card:px-1 @[0px]/lovely-card:py-0.5 @8xs/lovely-card:text-4xs @8xs/lovely-card:top-2 @8xs/lovely-card:right-2 @8xs/lovely-card:gap-1 @8xs/lovely-card:px-2 @8xs/lovely-card:py-0.5 @7xs/lovely-card:text-3xs @7xs/lovely-card:top-2 @7xs/lovely-card:right-2 @7xs/lovely-card:gap-1 @7xs/lovely-card:px-2 @7xs/lovely-card:py-0.5 @6xs/lovely-card:text-2xs @6xs/lovely-card:top-2 @6xs/lovely-card:right-2 @6xs/lovely-card:gap-1 @6xs/lovely-card:px-2 @6xs/lovely-card:py-0.5 @5xs/lovely-card:text-xs @5xs/lovely-card:top-2 @5xs/lovely-card:right-2 @5xs/lovely-card:gap-1 @5xs/lovely-card:px-2 @5xs/lovely-card:py-0.5 @4xs/lovely-card:text-sm @4xs/lovely-card:top-2 @4xs/lovely-card:right-2 @4xs/lovely-card:gap-1 @4xs/lovely-card:px-2 @4xs/lovely-card:py-0.5",
          className,
        )}
        style={badgeStyles}
      >
        {icon && (
          <LucideIcon
            name={icon}
            className={cn(
              "shrink-0",
              !cardAdaptToSize && "size-3",
              cardAdaptToSize &&
                "@[0px]/lovely-card:size-2 @8xs/lovely-card:size-2 @7xs/lovely-card:size-2.5 @6xs/lovely-card:size-2.5 @5xs/lovely-card:size-3 @4xs/lovely-card:size-3",
            )}
          />
        )}
        <span className="truncate max-w-[120px]">{text}</span>
      </div>
    );
  },
  (prevProps, nextProps) =>
    prevProps.className === nextProps.className &&
    prevProps.entry === nextProps.entry &&
    prevProps.facetsConfig.badgeProperty === nextProps.facetsConfig.badgeProperty &&
    prevProps.facetsConfig.badgeIconProperty === nextProps.facetsConfig.badgeIconProperty &&
    prevProps.facetsConfig.badgeColorProperty === nextProps.facetsConfig.badgeColorProperty
);

Badge.displayName = "Badge";

export default Badge;
