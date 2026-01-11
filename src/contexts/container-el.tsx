
import { createContext, useContext } from "react";


const ContainerElContext = createContext<HTMLElement | undefined>(undefined);

export const ContainerElProvider = ContainerElContext.Provider;

export const useContainerEl = () => {
  const context = useContext(ContainerElContext);
  if (!context) {
    throw new Error("useContainerEl must be used within a ContainerElProvider");
  }
  return context;
};
