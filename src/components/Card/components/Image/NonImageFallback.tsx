import type { BasesEntry, BasesViewConfig } from "obsidian";

import type { FacetsConfig } from "@/components/Facets/config";
import LucideIcon from "@/components/Obsidian/LucideIcon";
import { useEntryProperty } from "@/hooks/use-property";
import { cn } from "@/lib/utils";

import type { CardColors } from "../../types";

const ICON_BY_EXTENSION = {
  md: "text-align-start",
  pdf: "file-text",
  epub: "book",
  base: "database",
  canvas: "layout-dashboard",
  unknown: "file-question-mark",
} as const;

type Props = {
  entry: BasesEntry;
  facetsConfig: FacetsConfig;
  config: BasesViewConfig;
  colors: Pick<CardColors, "imageBackground" | "imageForeground">;
};

const NonImageFallback = ({ entry, facetsConfig, colors, config }: Props) => {
  const { iconProperty } = facetsConfig;
  const iconValue = useEntryProperty(entry, config, iconProperty);

  const icon =
    iconValue && !iconValue.isEmpty
      ? iconValue.value.toString()
      : ICON_BY_EXTENSION[
          entry.file.extension as keyof typeof ICON_BY_EXTENSION
        ] || ICON_BY_EXTENSION.unknown;

  return (
    <div className="h-full w-full flex items-center justify-center">
      <LucideIcon
        className={cn(
          "w-[80%] aspect-square block",
          !colors.imageForeground && "text-(--text-faint)",
        )}
        name={icon}
        style={{ color: colors.imageForeground }}
      />
    </div>
  );
};

export default NonImageFallback;
