
import type { BasesPropertyId } from 'obsidian';

import { useConfig } from '@/contexts/config';
import { getLabeledProperty } from '@/lib/obsidian/entry';
import { shallowEqual } from '@/lib/utils';
import { useEntrySelector } from './use-entry-selector';

export function useEntryProperty(id: string, propertyId?: BasesPropertyId) {
  const config = useConfig();
  return useEntrySelector(
    id,
    (entry) => {
      if (!propertyId || !entry) return null;
      return getLabeledProperty(entry, config, propertyId);
    },
    shallowEqual
  );
}
