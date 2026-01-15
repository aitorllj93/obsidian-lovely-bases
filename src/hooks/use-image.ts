
import type { BasesEntry, BasesPropertyId } from 'obsidian';
import { useMemo } from 'react';

import { useObsidian } from '@/components/Obsidian/Context';
import { getImage } from '@/lib/obsidian/entry';

export function useEntryImage(entry: BasesEntry | undefined, propertyId?: BasesPropertyId) {
  const { app } = useObsidian();
  return useMemo(() => {
    if (!propertyId || !entry) return null;
    return getImage(entry, app, propertyId);
  }, [entry, app, propertyId]);
}
