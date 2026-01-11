
import type { BasesPropertyId } from 'obsidian';
import { useSyncExternalStore } from 'react';

import { useEntriesStore } from '@/contexts/entries-store';

export function useEntryImage(id: string, propertyId?: BasesPropertyId) {
  const store = useEntriesStore();
  return useSyncExternalStore(
    store.subscribe,
    () => propertyId ? store.getImage(id, propertyId) : null,
    () => propertyId ? store.getImage(id, propertyId) : null
  );
}
