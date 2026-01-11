
import type { BasesViewConfig } from "obsidian";
import { createContext, useContext } from "react";

const ConfigContext = createContext<BasesViewConfig | undefined>(undefined);

export const ConfigProvider = ConfigContext.Provider;

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return context;
};
