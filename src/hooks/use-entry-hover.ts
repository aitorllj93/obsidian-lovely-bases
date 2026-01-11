
import { useCallback } from "react";

import { useApp } from "@/contexts/app";
import { useContainerEl } from "@/contexts/container-el";

export function useEntryHover(entryId: string, linkRef: React.RefObject<HTMLAnchorElement>) {
  const app = useApp();
  const containerEl = useContainerEl();

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
