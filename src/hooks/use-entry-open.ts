

import { Keymap } from "obsidian";
import { useCallback } from "react";

import { useApp } from "@/contexts/app";

export function useEntryOpen(entryId: string) {
  const app = useApp();

  return useCallback((event: React.MouseEvent | React.KeyboardEvent) => {
    const evt = event.nativeEvent;
    if (evt instanceof MouseEvent && evt.button !== 0 && evt.button !== 1) return;
    if (evt instanceof KeyboardEvent && evt.key !== "Enter" && evt.key !== " ") return;

    evt.preventDefault();
    const modEvent = Keymap.isModEvent(evt);
    void app.workspace.openLinkText(entryId, "", modEvent);
  }, [app.workspace.openLinkText, entryId]);
}

