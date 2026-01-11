
import { useSyncExternalStore } from 'react';

import { useEntriesStore } from '@/contexts/entries-store';

export function useEntry(id: string) {
  const store = useEntriesStore();
  return useSyncExternalStore(
    store.subscribe,
    () => store.getEntry(id),
    () => store.getEntry(id)
  );
}
