
import { useObsidian } from "@/components/Obsidian/Context";

export const useContainerEl = () => {
  const context = useObsidian();
  if (!context) {
    throw new Error("useContainerEl must be used within a ObsidianProvider");
  }
  return context.containerEl;
};
