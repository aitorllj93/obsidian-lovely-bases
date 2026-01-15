
import { useCallback } from "react";

import { useObsidian } from "@/components/Obsidian/Context";

export function useEntryHover(entryId: string, linkRef: React.RefObject<HTMLAnchorElement>) {
  const { app, containerEl } = useObsidian();

  return useCallback((event: React.MouseEvent) => {
    app.workspace.trigger("hover-link", {
      event: event.nativeEvent,
      source: "bases",
      hoverParent: containerEl,
      targetEl: linkRef.current,
      linktext: entryId,
    });
  }, [app.workspace.trigger, containerEl, linkRef, entryId]);
}
