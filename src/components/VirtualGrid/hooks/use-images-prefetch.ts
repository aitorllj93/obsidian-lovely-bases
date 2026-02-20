import { BasesEntryGroup, type BasesPropertyId } from "obsidian";
import { useEffect, useRef } from "react";

import type { Column } from '../types';

export function useVirtualGridImagePrefetch(
  vitems: Array<{ index: number }>,
  rows: Column[][],
  mediaProperty?: BasesPropertyId,
  opts?: { marginRows?: number; enabled?: boolean }
) {
  const marginRows = opts?.marginRows ?? 8;
  const enabled = opts?.enabled ?? true;

  const prefetched = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!enabled) return;
    if (rows.length === 0 || vitems.length === 0) return;

    const min = Math.max(0, vitems[0]?.index - marginRows);
    const max = Math.min(rows.length - 1, vitems[vitems.length - 1]?.index + marginRows);

    for (let r = min; r <= max; r++) {
      const row = rows[r];
      if (!row) continue;

      for (const col of row) {
        if (col.data instanceof BasesEntryGroup) continue;

        const urls = [mediaProperty && col.data.getValue(mediaProperty)?.toString()].filter(
          (v) => v !== undefined && v !== null && v !== "null",
        );
        for (const url of urls) {
          if (!url || prefetched.current.has(url)) continue;
          prefetched.current.add(url);

          const img = new Image();
          img.decoding = "async";
          // img.fetchPriority = "low";
          img.src = url;
        }
      }
    }
  }, [enabled, marginRows, rows, vitems, mediaProperty]);
}
