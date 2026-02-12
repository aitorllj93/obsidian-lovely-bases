import { useMemo } from "react";

import { useObsidian } from "@/components/Obsidian/Context";

import { getFolderColors } from "../helpers/get-folder-colors";
import type { FolderColors } from "../types";

export const useFolderColors = (
  gradient?: string,
  colors?: FolderColors,
): FolderColors => {
  const { containerEl } = useObsidian();
  return useMemo(() => {
    if (colors) {
      return colors;
    }

    return getFolderColors(gradient, containerEl);
  }, [gradient, colors, containerEl]);
}
