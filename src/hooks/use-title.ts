
import { useEntrySelector } from './use-entry-selector';

export function useEntryTitle(id: string) {
  return useEntrySelector(id, (entry) => entry?.file.basename ?? "");
}
