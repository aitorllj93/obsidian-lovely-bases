
import { useEntrySelector } from './use-entry-selector';

export function useEntry(id: string) {
  return useEntrySelector(id, (entry) => entry);
}
