
import type { App, Component } from "obsidian";
import { createContext, useContext, useState } from "react";

export type ObsidianContextValue = {
  app: App;
  component: Component;
  containerEl: HTMLElement;
  isEmbedded: boolean;
}
const ObsidianContext = createContext<ObsidianContextValue | undefined>(undefined);

export const ObsidianProvider = ({ value, children }: { value: ObsidianContextValue; children: React.ReactNode }) => {
  // this should be set once, ignore changes to the value
  const [contextValue] = useState<ObsidianContextValue>({
    app: value.app,
    component: value.component,
    containerEl: value.containerEl,
    isEmbedded: value.isEmbedded,
  });

  return (
    <ObsidianContext.Provider value={contextValue}>
      {children}
    </ObsidianContext.Provider>
  );
};

export const useObsidian = () => {
  const context = useContext(ObsidianContext);
  if (!context) {
    throw new Error("useObsidian must be used within an ObsidianProvider");
  }
  return context;
};
