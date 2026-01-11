
import type { BasesEntry, BasesPropertyId } from 'obsidian';
import { useMemo } from 'react';

import { useApp } from '@/contexts/app';
import { getImage } from '@/lib/obsidian/entry';

export function useEntryImage(entry: BasesEntry | undefined, propertyId?: BasesPropertyId) {
  const app = useApp();
  return useMemo(() => {
    if (!propertyId || !entry) return null;
    return getImage(entry, app, propertyId);
  }, [entry, app, propertyId]);
}
