import { useVirtualizer } from "@tanstack/react-virtual";
import type { BasesEntry, BasesEntryGroup, BasesViewConfig } from "obsidian";
import {
  type CSSProperties,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { estimateCardHeight } from "@/components/Card/helpers/estimate-card-height";
import type { FacetsConfig } from "@/components/Facets/config";
import { arrayEqual, cn, shallowEqual } from "@/lib/utils";

import { useElementWidth } from "./hooks/use-element-width";
import { useVirtualGridImagePrefetch } from "./hooks/use-images-prefetch";
import Row from "./Row";
import { getGridConfig, getNextItemFromRows, getRows } from "./utils";
import type { Direction } from "./types";

type Props = {
  facetsConfig: FacetsConfig;
  className?: string;
  config: BasesViewConfig;
  gap?: number;
  items: (BasesEntry | BasesEntryGroup)[];
  layoutIdPrefix?: string;
  minItemWidth?: number;
  style?: CSSProperties;
};

function PureVirtualGrid({
  facetsConfig,
  className,
  config,
  items,
  layoutIdPrefix,
  minItemWidth = 240,
  style,
}: Props) {
  const { imageProperty } = facetsConfig;
  const [scrollRef, width] = useElementWidth<HTMLDivElement>();
  const estimatedRowHeight = useMemo(
    () => estimateCardHeight(facetsConfig),
    [facetsConfig],
  );
  const [activeItemKey, setActiveItemKey] = useState<string>();
  const [activeItemPosition, setActiveItemPosition] = useState<{
    col: number;
    row: number;
  }>({ col: 0, row: 0 });
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

    setActiveItemKey(activeColByIndex?.key);
}, [rows, columnCount, colsByKey, activeItemPosition, colsByIndex, activeItemKey]);

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => estimatedRowHeight,
    overscan: 6,
    gap: facetsConfig.layoutGap,
  });

  const vitems = virtualizer.getVirtualItems();

  useVirtualGridImagePrefetch(vitems, rows, (entry) =>
    [imageProperty && entry.getValue(imageProperty)?.toString()].filter(
      (v) => v !== undefined && v !== null && v !== "null",
    ),
  );

  const handleToggleSection = useCallback((key: string) => {
    setCollapsedSectionKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  const rafRef = useRef<number | null>(null);
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (columnCount === 0) return;

    const navigateTo = (direction: Direction) => {
      if (rafRef.current) return; // ya hay uno pendiente

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const nextItemPosition = getNextItemFromRows(
          rows,
          activeItemPosition,
          direction,
        );
        const nextItem = colsByIndex.get(`${nextItemPosition.row}-${nextItemPosition.col}`);

        setActiveItemPosition(nextItemPosition);
        setActiveItemKey(nextItem.key);
        virtualizer.scrollToIndex(nextItem.row, {
          align: "center",
          behavior: e.repeat ? "auto" : "smooth",
        })
      });
    }

    switch (e.key) {
      case "ArrowLeft":
        navigateTo('left');
        break;
      case "ArrowRight":
        navigateTo('right');
        break;
      case "ArrowUp":
        navigateTo('up');
        break;
      case "ArrowDown":
        navigateTo('down');
        break;
      case " ":
      case "Enter":
        console.log('triggerEvent');
        break;
      default:
        return;
    }

    e.preventDefault();
}, [rows, activeItemPosition, colsByIndex, columnCount, virtualizer]);

  return (
    // biome-ignore lint/a11y/useAriaPropsSupportedByRole: virtual navigation
    <div
      className={cn(
        "h-full overflow-auto [overflow-anchor:none] outline-none",
        width === 0 ? "opacity-0" : "opacity-100",
        className,
      )}
      ref={scrollRef}
      style={style}
      // biome-ignore lint/a11y/noNoninteractiveTabindex: virtual scrollable
      tabIndex={0}
      aria-activedescendant={`row-${activeItemPosition.row}-${activeItemPosition.col}`}
      onKeyDown={handleKeyDown}
    >
      {width !== 0 && (
        <div
          className="relative"
          style={{
            height: virtualizer.getTotalSize(),
          }}
        >
          <div
            className="absolute top-0 left-0 w-full"
            style={{
              transform: `translateY(${vitems[0]?.start ?? 0}px)`,
            }}
          >
            {scrollRef.current
              ? vitems.map((vRow) => (
                  <div
                    key={vRow.key}
                    className="focus-visible:outline-none"
                    style={{ paddingBottom: facetsConfig.layoutGap }}
                  >
                    <Row
                      activeItemKey={activeItemKey}
                      collapsedSectionKeys={collapsedSectionKeys}
                      config={config}
                      columns={rows[vRow.index] ?? []}
                      facetsConfig={facetsConfig}
                      index={vRow.index}
                      itemWidth={itemWidth}
                      itemsPerColumn={columnCount}
                      layoutIdPrefix={layoutIdPrefix}
                      onToggleSection={handleToggleSection}
                      ref={virtualizer.measureElement}
                      style={columnStyle}
                    />
                  </div>
                ))
              : null}
          </div>
        </div>
      )}
    </div>
  );
}

const VirtualGrid = memo(PureVirtualGrid, (prevProps, nextProps) => {
  return (
    arrayEqual(prevProps.items, nextProps.items) &&
    prevProps.minItemWidth === nextProps.minItemWidth &&
    prevProps.gap === nextProps.gap &&
    shallowEqual(prevProps.facetsConfig, nextProps.facetsConfig) &&
    prevProps.config === nextProps.config
  );
});

export default VirtualGrid;
