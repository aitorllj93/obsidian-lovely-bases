

import { useObsidian } from "@/components/Obsidian/Context";

export const useApp = () => {
  const context = useObsidian();
  if (!context) {
    throw new Error("useApp must be used within an ObsidianProvider");
  }
  return context.app;
};
