import { useVirtualizer } from "@tanstack/react-virtual";
import type { BasesEntry, BasesEntryGroup, BasesPropertyId } from "obsidian"
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { FacetsConfig } from "@/components/Facets/config";

import type { Direction, Position } from "../types";
import { getGridConfig, getNextItemFromRows, getRows } from "../utils";

import { useElementWidth } from "./use-element-width";
import { useVirtualGridImagePrefetch } from "./use-images-prefetch";

type UseVirtualGridParams = {
  estimatedRowHeight: number;
  facetsConfig: FacetsConfig;
  imageProperty?: BasesPropertyId,
  items: (BasesEntry | BasesEntryGroup)[];
  minItemWidth: number;
}



export function useVirtualGrid({
  estimatedRowHeight,
  facetsConfig,
  items,
  minItemWidth,
}: UseVirtualGridParams) {
  const keyDownRafRef = useRef<number | null>(null);
  const [scrollRef, width] = useElementWidth<HTMLDivElement>();
  const [collapsedSectionKeys, setCollapsedSectionKeys] = useState<Set<string>>(
    () => new Set(),
  );

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
        collapsedSectionKeys,
      ),
    [items, facetsConfig.groupLayout, columnCount, collapsedSectionKeys],
  );
  const [activeItemKey, setActiveItemKey] = useState<string>(rows[0]?.[0]?.key);
  const [activeItemPosition, setActiveItemPosition] = useState<Position>({ col: 0, row: 0 });

  const colsByKey = useMemo(() => {
    return new Map(rows.flatMap(r => r.map(c => ([
      c.key,
      c,
    ]))));
  }, [rows]);
  const colsByIndex = useMemo(() => {
    return new Map(rows.flatMap(r => r.map(c => ([
      `${c.row}-${c.col}`,
      c,
    ]))));
  }, [rows]);

  // Reconciliation
  useEffect(() => {
    if (rows.length === 0 || columnCount === 0) return;

    const activeCol = activeItemKey ? colsByKey.get(activeItemKey) : null;

    if (activeCol) {
      if (activeItemPosition.row !== activeCol.row || activeItemPosition.col !== activeCol.col) {
        setActiveItemPosition({
          row: activeCol.row,
          col: activeCol.col,
        });
      }
      return;
    }

    const activeColByIndex = colsByIndex.get(`${activeItemPosition.row}-${activeItemPosition.col}`) ?? null;

    if (activeColByIndex) {
      setActiveItemKey(activeColByIndex.key);
    }
}, [rows, columnCount, colsByKey, activeItemPosition, colsByIndex, activeItemKey]);

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => estimatedRowHeight,
    overscan: 6,
    gap: facetsConfig.layoutGap,
  });

  const vitems = virtualizer.getVirtualItems();

  useVirtualGridImagePrefetch(
    vitems,
    rows,
    facetsConfig.imageProperty
  );

  const handleToggleSection = useCallback((key: string) => {
    setCollapsedSectionKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (columnCount === 0) return;

    const navigateTo = (direction: Direction) => {
      if (keyDownRafRef.current) return; // ya hay uno pendiente

      keyDownRafRef.current = requestAnimationFrame(() => {
        keyDownRafRef.current = null;
        const nextItemPosition = getNextItemFromRows(
          rows,
          activeItemPosition,
          direction,
        );
        const nextItem = colsByIndex.get(`${nextItemPosition.row}-${nextItemPosition.col}`);

        if (!nextItem) {
          return;
        }

        setActiveItemPosition(nextItemPosition);
        setActiveItemKey(nextItem.key);
        virtualizer.scrollToIndex(nextItem.row, {
          align: "center",
          behavior: e.repeat ? "auto" : "smooth",
        })

        const elementId = `row-${nextItem.row}-${nextItem.key}`;
        const element = document.getElementById(elementId);
        element?.focus();
      });
    }

    switch (e.key) {
      case "ArrowLeft":
        navigateTo('left');
        e.preventDefault();
        break;
      case "ArrowRight":
        navigateTo('right');
        e.preventDefault();
        break;
      case "ArrowUp":
        navigateTo('up');
        e.preventDefault();
        break;
      case "ArrowDown":
        navigateTo('down');
        e.preventDefault();
        break;
    }

}, [rows, activeItemPosition, colsByIndex, columnCount, virtualizer]);

  return {
    activeItemKey,
    activeItemPosition,
    collapsedSectionKeys,
    columnCount,
    columnStyle,
    handleKeyDown,
    handleToggleSection,
    itemWidth,
    rows,
    scrollRef,
    virtualizer,
    vitems,
    width,
  }

}
