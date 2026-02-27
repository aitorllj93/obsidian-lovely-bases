import { useVirtualizer } from "@tanstack/react-virtual";
import type { BasesEntry, BasesEntryGroup, BasesPropertyId } from "obsidian";
import { useMemo } from "react";

import type { FacetsConfig } from "@/components/Facets/config";
import { useCollapsibleSections } from "@/hooks/use-collapsible-sections";
import { useGridNavigation } from "@/hooks/use-grid-navigation";

import { getGridConfig, getRows } from "../utils";

import { useElementWidth } from "./use-element-width";
import { useVirtualGridImagePrefetch } from "./use-images-prefetch";

type UseVirtualGridParams = {
  estimatedRowHeight: number;
  facetsConfig: FacetsConfig;
  mediaProperty?: BasesPropertyId,
  items: (BasesEntry | BasesEntryGroup)[];
  minItemWidth: number;
}

export function useVirtualGrid({
  estimatedRowHeight,
  facetsConfig,
  items,
  minItemWidth,
}: UseVirtualGridParams) {
  const [scrollRef, width] = useElementWidth<HTMLDivElement>();
  const { collapsedSections, toggleSectionCollapse } = useCollapsibleSections();

  const { columnCount, itemWidth, columnStyle } = useMemo(
    () => getGridConfig(width, facetsConfig.layoutGap, minItemWidth),
    [width, facetsConfig.layoutGap, minItemWidth],
  );

  const rows = useMemo(
    () =>
      getRows(
        facetsConfig.groupLayout,
        items,
        columnCount,
        collapsedSections,
      ),
    [items, facetsConfig.groupLayout, columnCount, collapsedSections],
  );

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => estimatedRowHeight,
    overscan: 6,
    gap: facetsConfig.layoutGap,
  });

  const {
    activeItem,
    handleKeyDown,
  } = useGridNavigation(rows, virtualizer);

  const vitems = virtualizer.getVirtualItems();

  useVirtualGridImagePrefetch(
    vitems,
    rows,
    facetsConfig.mediaProperty
  );

  return {
    activeItem,
    collapsedSections,
    columnCount,
    columnStyle,
    handleKeyDown,
    toggleSectionCollapse,
    itemWidth,
    rows,
    scrollRef,
    virtualizer,
    vitems,
    width,
  }
}
