import type { BasesEntry, BasesPropertyId, BasesViewConfig, Value } from "obsidian";
import { BasesEntryGroup } from 'obsidian';

export type Property = {
  displayName: string;
  id: BasesPropertyId;
  value: Value;
  isEmpty: boolean;
}

export const getIdentifier = (item: BasesEntry | BasesEntryGroup ) =>
  (item instanceof BasesEntryGroup ? item.key?.toString() : item.file.path) as string;


export const getTitle = (entry: BasesEntry): string => {
  return entry.file.basename.replace(/\.[^.]+$/, '');
}


export const getProperty = (entry: BasesEntry, propertyId?: BasesPropertyId) => {
  if (!propertyId || !entry) return null;
  const property = entry.getValue(propertyId);

  return property;
}

export const getPropertyValue = (entry: BasesEntry, propertyId?: BasesPropertyId): string | null => {
  if (!propertyId || !entry) return null;
  const property = entry.getValue(propertyId);
  const propertyValue = property?.toString() ?? null;

  return propertyValue === 'null' ? null : propertyValue;
}

export const getLabeledProperty = (entry: BasesEntry, config: BasesViewConfig, propertyId: BasesPropertyId): Property => {
  const value = entry.getValue(propertyId) as Value;
  const displayName = config.getDisplayName(propertyId) as string;

  const isEmpty = value === null || value === undefined || value.toString() === 'null';

  return {
    id: propertyId,
    displayName,
    value,
    isEmpty,
  }
}
