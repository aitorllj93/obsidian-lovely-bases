
import { createContext, useContext } from "react";

import type { ReactBaseViewProps } from "@/types";

const ObsidianContext = createContext<ReactBaseViewProps | undefined>(undefined);

export const ObsidianProvider = ObsidianContext.Provider;

export const useObsidian = () => {
  const context = useContext(ObsidianContext);
  if (!context) {
    throw new Error("useObsidian must be used within an ObsidianProvider");
  }
  return context;
};
