
import { useMemo } from "react";

import { useObsidian } from "@/components/Obsidian/Context";

import { type ContainerData, getContainerData } from "../helpers/get-container-data";
import type { Props } from "../types";

export function useContainerData(props: Props, fallback?: Partial<ContainerData>): ContainerData {
  const { app, containerEl } = useObsidian();

  return useMemo(() => {
    return getContainerData(props, app, containerEl, fallback);
  }, [props, app, containerEl, fallback])
}
