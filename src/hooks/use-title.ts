
import type { BasesEntry } from 'obsidian';
import { useMemo } from 'react';

export function useEntryTitle(entry: BasesEntry | undefined) {
  return useMemo(() => entry?.file.basename ?? "", [entry]);
}
