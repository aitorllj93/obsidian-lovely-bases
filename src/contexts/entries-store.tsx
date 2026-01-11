
import type { BasesEntry } from "obsidian";
import type React from "react";
import { createContext, useContext, useMemo } from "react";

import { createEntriesStore } from "@/stores/entries";

type EntriesStore = ReturnType<typeof createEntriesStore>;
const EntriesStoreContext = createContext<EntriesStore | null>(null);

export function EntriesStoreProvider({ initialEntries, children }: { initialEntries: BasesEntry[]; children: React.ReactNode }) {
  const store = useMemo(() => createEntriesStore({
    initialEntries,
  }), [initialEntries]);
  return <EntriesStoreContext.Provider value={store}>{children}</EntriesStoreContext.Provider>;
}

export function useEntriesStore() {
  const store = useContext(EntriesStoreContext);
  if (!store) throw new Error("Missing EntriesStoreProvider");
  return store;
}
