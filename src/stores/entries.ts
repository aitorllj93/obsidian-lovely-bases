import type { BasesEntry } from "obsidian";

type Listener = () => void;

type CreateEntriesStoreProps = {
  initialEntries?: Iterable<BasesEntry>;
}

export function createEntriesStore({ initialEntries }: CreateEntriesStoreProps) {
  const byId = new Map<string, BasesEntry>();
  if (initialEntries) for (const e of initialEntries) byId.set(e.file.path, e);

  const globalListeners = new Set<Listener>();
  const entryListeners = new Map<string, Set<Listener>>();

  const api = {
    getEntry(id: string) {
      return byId.get(id);
    },

    getSnapshot() {
      return byId;
    },

    subscribe(fn: Listener) {
      globalListeners.add(fn);
      return () => globalListeners.delete(fn);
    },

    subscribeToEntry(id: string, fn: Listener) {
      let listeners = entryListeners.get(id);
      if (!listeners) {
        listeners = new Set();
        entryListeners.set(id, listeners);
      }
      listeners.add(fn);
      return () => {
        listeners.delete(fn);
        if (listeners.size === 0) entryListeners.delete(id);
      };
    },

    upsert(entry: BasesEntry) {
      const prev = byId.get(entry.file.path);
      if (prev && prev.file.stat.mtime === entry.file.stat.mtime) return;

      byId.set(entry.file.path, entry);

      const listeners = entryListeners.get(entry.file.path);
      if (listeners) for (const l of listeners) l();

      for (const l of globalListeners) l();
    },
  };

  return api;
}
