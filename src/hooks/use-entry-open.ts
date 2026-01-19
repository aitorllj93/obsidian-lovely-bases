

import { type BasesEntry, type BasesPropertyId, type BasesViewConfig, Keymap } from "obsidian";
import { useCallback } from "react";

import { useObsidian } from "@/components/Obsidian/Context";
import { useEntryProperty } from "./use-property";
import { isWikiLink, parseWikilink } from "@/lib/properties";

const openExternal = (url: string): void => {
  window.open(url, '_blank');
}

export function useEntryOpen(
  entry: BasesEntry, config: BasesViewConfig, linkProperty?: BasesPropertyId) {
  const { app } = useObsidian();
  const linkValue = useEntryProperty(entry, config, linkProperty);
  const link = !linkValue || linkValue?.isEmpty ? null : linkValue.value.toString();

  return useCallback((event: React.MouseEvent | React.KeyboardEvent) => {
    const evt = event.nativeEvent;
    if (evt instanceof MouseEvent && evt.button !== 0 && evt.button !== 1) return;
    if (evt instanceof KeyboardEvent && evt.key !== "Enter" && evt.key !== " ") return;

    evt.preventDefault();
    const modEvent = Keymap.isModEvent(evt);
    if (!modEvent && link) {
      if (isWikiLink(link)) {
        void app.workspace.openLinkText(parseWikilink(link), "", modEvent);
      } else {
        openExternal(link);
      }
    } else {
      void app.workspace.openLinkText(entry.file.path, "", modEvent);
    }
  }, [app.workspace.openLinkText, entry.file.path, link]);
}

