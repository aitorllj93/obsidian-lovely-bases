
import type { BasesEntry, BasesEntryGroup } from "obsidian";
import { useMemo } from "react";

import type { FacetsConfig } from "@/components/Facets/config";
import { useCollapsibleSections } from "@/hooks/use-collapsible-sections";
import { useGridNavigation } from "@/hooks/use-grid-navigation";

import { getRows } from "../utils";

type UseCarouselParams = {
  facetsConfig: FacetsConfig;
  items: (BasesEntry | BasesEntryGroup)[];
}

export function useCarousel({
  facetsConfig,
  items,
}: UseCarouselParams) {
  const { collapsedSections, toggleSectionCollapse } = useCollapsibleSections();

  const rows = useMemo(
    () =>
      getRows(
        facetsConfig.groupLayout,
        items,
        collapsedSections,
      ),
    [items, facetsConfig.groupLayout, collapsedSections],
  );


  const {
    activeItem,
    handleKeyDown,
  } = useGridNavigation(rows);

  return {
    activeItem,
    collapsedSections,
    handleKeyDown,
    toggleSectionCollapse,
    rows,
  };
}
