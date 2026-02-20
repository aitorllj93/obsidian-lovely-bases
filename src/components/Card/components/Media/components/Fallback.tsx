import type { BasesEntry, BasesPropertyId } from "obsidian";

import { getIcon } from "@/components/Card/helpers/get-icon";
import LucideIcon from "@/components/Obsidian/LucideIcon";
import { cn } from "@/lib/utils";
import { getForegroundColor } from "@/components/Card/helpers/get-colors";
import { useMemo } from "react";

type Props = {
  accentColor?: string;
  entry: BasesEntry;
  iconProperty?: BasesPropertyId;
};

const MediaFallback = ({
  accentColor,
  entry,
  iconProperty
 }: Props) => {
  const icon = useMemo(() => {
    return getIcon(entry, iconProperty);
  }, [entry, iconProperty]);
  const color = useMemo(() => {
    return accentColor ? getForegroundColor(accentColor) : undefined;
  }, [accentColor]);

  return (
    <div className="h-full w-full flex items-center justify-center">
      <LucideIcon
        className={cn(
          "w-[80%] aspect-square block",
          !color && "text-(--text-faint)",
        )}
        name={icon}
        style={{ color }}
      />
    </div>
  );
};

export default MediaFallback;
