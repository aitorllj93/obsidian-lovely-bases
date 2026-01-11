
import type { BasesPropertyId } from 'obsidian';
import { useSyncExternalStore } from 'react';

import { useEntriesStore } from '@/contexts/entries-store';

export function useEntryProperty(id: string, propertyId?: BasesPropertyId) {
  const store = useEntriesStore();
  return useSyncExternalStore(
    store.subscribe,
    () => propertyId ? store.getProperty(id, propertyId) : null,
    () => propertyId ? store.getProperty(id, propertyId) : null
  );
}
