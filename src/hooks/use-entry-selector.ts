
import type { BasesEntry } from 'obsidian';
import { useCallback, useRef, useSyncExternalStore } from 'react';

import { useEntriesStore } from '@/contexts/entries-store';

export function useEntrySelector<T>(
  id: string,
  selector: (entry: BasesEntry | undefined) => T,
  isEqual: (a: T, b: T) => boolean = Object.is
): T {
  const store = useEntriesStore();
  const cachedRef = useRef<{ entry: BasesEntry | undefined; value: T } | null>(null);

  // Suscripción granular: solo se notifica cuando ESTE entry cambia
  const subscribe = useCallback(
    (onStoreChange: () => void) => store.subscribeToEntry(id, onStoreChange),
    [store, id]
  );

  // getSnapshot SOLO retorna el entry (referencia estable del Map)
  const getSnapshot = useCallback(() => store.getEntry(id), [store, id]);

  // Obtener el entry del store
  const entry = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  // Calcular el valor derivado
  const newValue = selector(entry);

  // Comparar con cache: solo actualizar si entry cambió O valor es diferente
  if (
    cachedRef.current !== null &&
    cachedRef.current.entry === entry &&
    isEqual(cachedRef.current.value, newValue)
  ) {
    return cachedRef.current.value;
  }

  cachedRef.current = { entry, value: newValue };
  return newValue;
}

