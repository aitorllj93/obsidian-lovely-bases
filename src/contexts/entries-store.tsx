
import type { BasesEntry } from "obsidian";
import type React from "react";
import { createContext, useContext, useMemo } from "react";

const EntriesContext = createContext<Map<string, BasesEntry>>(new Map());

export function EntriesStoreProvider({ initialEntries, children }: { initialEntries: BasesEntry[]; children: React.ReactNode }) {
  const entriesMap = useMemo(
    () => new Map(initialEntries.map((e) => [e.file.path, e])),
    [initialEntries],
  );
  return <EntriesContext.Provider value={entriesMap}>{children}</EntriesContext.Provider>;
}

export function useEntry(id: string): BasesEntry | undefined {
  return useContext(EntriesContext).get(id);
}
