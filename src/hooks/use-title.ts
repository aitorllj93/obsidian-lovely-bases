
import { useSyncExternalStore } from 'react';

import { useEntriesStore } from '@/contexts/entries-store';

export function useEntryTitle(id: string) {
  const store = useEntriesStore();
  return useSyncExternalStore(
    store.subscribe,
    () => store.getEntry(id)?.file.basename ?? "",
    () => store.getEntry(id)?.file.basename ?? ""
  );
}
