import type { App, BasesEntry, BasesPropertyId, BasesViewConfig } from "obsidian";

import { entry } from "@/lib/obsidian";

type NotesState = {
  byId: Map<string, BasesEntry>;
};

type Listener = () => void;

type CreateEntriesStoreProps = {
  initialEntries?: Iterable<BasesEntry>;
  app: App;
  config: BasesViewConfig;
}

export function createEntriesStore({ initialEntries, app, config }: CreateEntriesStoreProps) {
  const state: NotesState = { byId: new Map() };
  if (initialEntries) for (const e of initialEntries) state.byId.set(e.file.path, e);

  const listeners = new Set<Listener>();

  const api = {
    getEntry(id: string) {
      return state.byId.get(id);
    },
    getImage(id: string, propertyId: BasesPropertyId) {
      return entry.getImage(state.byId.get(id), app, propertyId);
    },
    getProperty(id: string, propertyId: BasesPropertyId) {
      return entry.getLabeledProperty(state.byId.get(id), config, propertyId);
    },
    getSnapshot() {
      return state;
    },
    subscribe(fn: Listener) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    upsert(entry: BasesEntry) {
      const prev = state.byId.get(entry.file.path);
      if (prev && prev.file.stat.mtime === entry.file.stat.mtime) return;
      state.byId.set(entry.file.path, entry);
      for (const l of listeners) l();
    },
  };

  return api;
}
