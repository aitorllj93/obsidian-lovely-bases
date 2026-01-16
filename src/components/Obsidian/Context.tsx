import type { App, Component } from "obsidian";
import { createContext, useContext, useState } from "react";
import { detectLocale, type SupportedLocale } from "@/lib/i18n";

export type ObsidianContextValue = {
  app: App;
  component: Component;
  containerEl: HTMLElement;
  isEmbedded: boolean;
  locale: SupportedLocale;
}
const ObsidianContext = createContext<ObsidianContextValue | undefined>(undefined);

export const ObsidianProvider = ({ value, children }: { value: Omit<ObsidianContextValue, "locale">; children: React.ReactNode }) => {
  // this should be set once, ignore changes to the value
  const [contextValue] = useState<ObsidianContextValue>({
    app: value.app,
    component: value.component,
    containerEl: value.containerEl,
    isEmbedded: value.isEmbedded,
    locale: detectLocale(),
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
