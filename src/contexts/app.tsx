
import type { App } from "obsidian";
import { createContext, useContext } from "react";


const AppContext = createContext<App | undefined>(undefined);

export const AppProvider = AppContext.Provider;

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
