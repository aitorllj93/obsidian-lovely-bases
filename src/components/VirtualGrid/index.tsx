import { useVirtualizer } from "@tanstack/react-virtual";
import type { BasesEntry, BasesViewConfig } from "obsidian";
import { memo, useLayoutEffect, useMemo } from "react";

import Card from "../Card";
import { compareCardConfig } from "../Card/config/get-config";
import type { CardConfig } from "../Card/types";

import { useElementWidth } from "./hooks/use-element-width";

function chunkIntoRows(items: BasesEntry[], columns: number): BasesEntry[][] {
  if (columns <= 0) return [];
  const rows: BasesEntry[][] = [];
  for (let i = 0; i < items.length; i += columns) {
    rows.push(items.slice(i, i + columns));
  }
  return rows;
}

type Props = {
  cardConfig: CardConfig;
  config: BasesViewConfig;
  items: BasesEntry[];
  minItemWidth?: number;
  gap?: number;
  padding?: number;
  estimateRowHeight?: number;
};

function PureVirtualGrid({
  cardConfig,
  config,
  items,
  minItemWidth = 240,
  gap = 16,
  padding = 0,
  estimateRowHeight = 320,
}: Props) {
  const [scrollRef, width] = useElementWidth<HTMLDivElement>();

  const columnCount = useMemo(() => {
    const inner = Math.max(0, width - padding * 2);
    if (inner === 0) return 1;
    return Math.max(1, Math.floor((inner + gap) / (minItemWidth + gap)));
  }, [width, padding, gap, minItemWidth]);

  const rows = useMemo(
    () => chunkIntoRows(items, columnCount),
    [items, columnCount],
  );

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => estimateRowHeight,
    overscan: 6,
    gap,
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: needed to measure the height of the rows
  useLayoutEffect(() => {
    virtualizer.measure();
  }, [columnCount, virtualizer]);

  return (
    <div
      ref={scrollRef}
      style={{
        height: "100%",
        overflow: "auto",
        opacity: width === 0 ? 0 : 1,
        padding,
      }}
    >
      <div
        style={{
          height: virtualizer.getTotalSize(),
          position: "relative",
        }}
      >
        {scrollRef.current
          ? virtualizer.getVirtualItems().map((vRow) => {
              const rowItems = rows[vRow.index] ?? [];

              return (
                <div
                  key={vRow.key}
                  ref={virtualizer.measureElement}
                  data-index={vRow.index}
                  tabIndex={vRow.index === 0 ? 0 : undefined}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    transform: `translateY(${vRow.start}px)`,
                    display: "grid",
                    gridTemplateColumns: `repeat(${columnCount}, minmax(0, ${cardConfig.cardSize}px))`,
                    gap,
                    boxSizing: "border-box",
                    justifyContent: 'space-evenly',
                  }}
                >
                  {rowItems.map((item) => (
                    <Card
                      className="mx-auto"
                      key={item.file.path}
                      entry={item}
                      config={config}
                      {...cardConfig}
                    />
                  ))}
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}

function itemsEqual(a: BasesEntry[], b: BasesEntry[]): boolean {
  if (a === b) return true;
  if (a.length !== b.length) return false;
  return a.length === 0 || a[0] === b[0];
}

const VirtualGrid = memo(PureVirtualGrid, (prevProps, nextProps) => {
  return (
    itemsEqual(prevProps.items, nextProps.items) &&
    prevProps.minItemWidth === nextProps.minItemWidth &&
    prevProps.gap === nextProps.gap &&
    prevProps.padding === nextProps.padding &&
    prevProps.estimateRowHeight === nextProps.estimateRowHeight &&
    compareCardConfig(prevProps.cardConfig, nextProps.cardConfig) &&
    prevProps.config === nextProps.config
  );
}) as typeof PureVirtualGrid;

export default VirtualGrid;
