
import type { BasesPropertyId } from 'obsidian';

import { useApp } from '@/contexts/app';
import { getImage } from '@/lib/obsidian/entry';
import { useEntrySelector } from './use-entry-selector';

export function useEntryImage(id: string, propertyId?: BasesPropertyId) {
  const app = useApp();
  return useEntrySelector(id, (entry) => {
    if (!propertyId || !entry) return null;
    return getImage(entry, app, propertyId);
  });
}
