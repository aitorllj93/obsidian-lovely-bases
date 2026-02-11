import { useVirtualizer } from "@tanstack/react-virtual";
import type { BasesEntry, BasesViewConfig } from "obsidian";
import { memo, useEffect, useMemo } from "react";

import { afterRaf, arrayEqual, chunk, cn, shallowEqual } from "@/lib/utils";

import type { CardConfig } from "../Card/types";

import Column from "./Column";
import { useElementWidth } from "./hooks/use-element-width";

type Props = {
  cardConfig: CardConfig;
  className?: string;
  config: BasesViewConfig;
  estimateRowHeight?: number;
  gap?: number;
  items: BasesEntry[];
  minItemWidth?: number;
};

function PureVirtualGrid({
  cardConfig,
  className,
  config,
  items,
  minItemWidth = 240,
  gap = 16,
  estimateRowHeight = 320,
}: Props) {
  const [scrollRef, width] = useElementWidth<HTMLDivElement>();

  const columnCount = useMemo(() => {
    const inner = Math.max(0, width);
    if (inner === 0) return 1;
    return Math.max(1, Math.floor((inner + gap) / (minItemWidth + gap)));
  }, [width, gap, minItemWidth]);

  const rows = useMemo(
    () => chunk(items, columnCount),
    [items, columnCount],
  );

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => estimateRowHeight,
    measureElement: (el) => el.getBoundingClientRect().height,
    overscan: 6,
    gap,
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: needed to measure the height of the rows
  useEffect(() => {
    if (width === 0) return;
    return afterRaf(() => virtualizer.measure(), 2);
  }, [virtualizer, items, width]);

  return (
    <div
      className={cn(
        "h-full overflow-auto",
        width === 0 ? "opacity-0" : "opacity-100",
        className,
      )}
      ref={scrollRef}
    >
      <div
        className="relative"
        style={{
          height: virtualizer.getTotalSize(),
        }}
      >
        {scrollRef.current
          ? virtualizer.getVirtualItems().map((vRow) => (
            <Column
              cardConfig={cardConfig}
              columnCount={columnCount}
              config={config}
              data={rows[vRow.index] ?? []}
              gap={gap}
              key={vRow.key}
              index={vRow.index}
              ref={virtualizer.measureElement}
              start={vRow.start}
            />
          ))
          : null}
      </div>
    </div>
  );
}

const VirtualGrid = memo(PureVirtualGrid, (prevProps, nextProps) => {
  return (
    arrayEqual(prevProps.items, nextProps.items) &&
    prevProps.minItemWidth === nextProps.minItemWidth &&
    prevProps.gap === nextProps.gap &&
    prevProps.estimateRowHeight === nextProps.estimateRowHeight &&
    shallowEqual(prevProps.cardConfig, nextProps.cardConfig) &&
    prevProps.config === nextProps.config
  );
});

export default VirtualGrid;
