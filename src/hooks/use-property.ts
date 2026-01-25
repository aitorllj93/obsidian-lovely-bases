
import type { BasesEntry, BasesPropertyId, BasesViewConfig } from 'obsidian';
import { useMemo } from 'react';

import { getLabeledProperty } from '@/lib/obsidian/entry';

export function useEntryProperty(entry: BasesEntry | undefined, config: BasesViewConfig, propertyId?: BasesPropertyId) {
  return useMemo(() => {
    if (!propertyId || !entry) return null;
    return getLabeledProperty(entry, config, propertyId);
  }, [entry, config, propertyId]);
}

export function useEntryPropertyValue(entry: BasesEntry | undefined, propertyId?: BasesPropertyId): string | null {
  return useMemo(() => {
    if (!propertyId || !entry) return null;
    const property = entry.getValue(propertyId);
    const propertyValue = property.toString();

    return propertyValue === 'null' ? null : propertyValue;
  }, [entry, propertyId]);
};
