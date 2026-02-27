import type { Virtualizer } from "@tanstack/react-virtual";

import { type KeyboardEvent, type RefObject, useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  type Direction,
  type GridColumn,
  type GridPosition,
  getNextItem,
  getPositionId,
  scrollToPosition,
} from "@/lib/navigation/grid";

export const useGridNavigation = <T extends GridColumn = GridColumn>(
  rows: T[][],
  container?: Virtualizer<HTMLDivElement, Element> | RefObject<HTMLDivElement | null>,
) => {
  const keyDownRafRef = useRef<number | null>(null);
  const [activeItemKey, setActiveItemKey] = useState<string>(rows[0]?.[0]?.key);
  const [activeItemPosition, setActiveItemPosition] = useState<GridPosition>({ col: 0, row: 0 });

  const colsByKey = useMemo(() => {
    return new Map(rows.flatMap(r => r.map(c => ([
      c.key,
      c,
    ]))));
  }, [rows]);

  const colsByIndex = useMemo(() => {
    return new Map(rows.flatMap(r => r.map(c => ([
      c.id,
      c,
    ]))));
  }, [rows]);

  // Reconciliation
  useEffect(() => {
    if (rows.length === 0) return;

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

    const activeColByIndex = colsByIndex.get(getPositionId(activeItemPosition)) ?? null;

    if (activeColByIndex) {
      setActiveItemKey(activeColByIndex.key);
    }
  }, [rows, colsByKey, activeItemPosition, colsByIndex, activeItemKey]);

  const scrollTo = useCallback(
    (pos: GridPosition, behavior) => scrollToPosition(pos, behavior, container),
    [container]
  )

  const getPosition = useCallback((direction: Direction) => getNextItem(
    rows,
    activeItemPosition,
    direction,
  ), [rows, activeItemPosition]);

  const activate = useCallback((
    position: GridPosition,
    scroll?: boolean,
    scrollBehavior?: 'auto' | 'smooth',
  ) => {
    const nextItem = colsByIndex.get(getPositionId(position));

    if (!nextItem) {
      console.warn(`Item with position ${getPositionId(position)} not found`);
      return;
    }

    setActiveItemPosition(position);
    setActiveItemKey(nextItem.key);

    if (scroll) {
      // add some delay for activation effects to happen
      setTimeout(() => {
        const element = scrollTo(position, scrollBehavior);
        element?.focus({ preventScroll: true });
      }, 100);
    }


  }, [colsByIndex, scrollTo]);

  const handleKeyDown = useCallback((
    e: KeyboardEvent,
  ) => {
    const navigateTo = (direction: Direction) => {
      if (keyDownRafRef.current) return;

      keyDownRafRef.current = requestAnimationFrame(() => {
        keyDownRafRef.current = null;
        const nextItemPosition = getPosition(
          direction,
        );
        activate(
          nextItemPosition,
          true,
          e.repeat ? "auto" : "smooth"
        );
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
  }, [activate, getPosition]);

  return {
    activeItem: colsByKey.get(activeItemKey) as T | undefined,
    activeItemKey,
    activeItemPosition,
    activate,
    handleKeyDown,
    scrollTo,
  };
}
