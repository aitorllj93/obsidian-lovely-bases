import { useVirtualizer } from "@tanstack/react-virtual";
import type { BasesEntry, BasesViewConfig } from "obsidian";
import { memo, useEffect, useMemo } from "react";

import { afterRaf, arrayEqual, chunk, cn, shallowEqual } from "@/lib/utils";

import { estimateCardHeight } from "../Card/helpers/estimate-card-height";
import type { CardConfig } from "../Card/types";

import Column from "./Column";
import { useElementWidth } from "./hooks/use-element-width";

const getCardWidth = (
  columns: number,
  gap: number,
  width: number
): number => {
  if (!width) return 0;

  const totalGap = (columns - 1) * gap;

  return (width - totalGap) / columns;
}

type Props = {
  cardConfig: CardConfig;
  className?: string;
  config: BasesViewConfig;
  gap?: number;
  items: BasesEntry[];
  minItemWidth?: number;
  measureAfterRaf?: number;
};

function PureVirtualGrid({
  cardConfig,
  className,
  config,
  items,
  minItemWidth = 240,
  gap = 16,
  measureAfterRaf = 0,
}: Props) {
  const [scrollRef, width] = useElementWidth<HTMLDivElement>();
  const estimatedRowHeight = useMemo(() => estimateCardHeight(cardConfig), [cardConfig])

  const columnCount = useMemo(() => {
    const inner = Math.max(0, width);
    if (inner === 0) return 1;
    return Math.max(1, Math.floor((inner + gap) / (minItemWidth + gap)));
  }, [width, gap, minItemWidth]);

  const rows = useMemo(
    () => chunk(items, columnCount),
    [items, columnCount],
  );

  const cardWidth = getCardWidth(columnCount, gap, width)

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => estimatedRowHeight,
    overscan: 6,
    gap,
  });

  const vitems = virtualizer.getVirtualItems()


  // biome-ignore lint/correctness/useExhaustiveDependencies: needed to measure the height of the rows
  useEffect(() => {
    if (width === 0) return;
    return afterRaf(() => virtualizer.measure(), measureAfterRaf);
  }, [virtualizer, items, width, measureAfterRaf]);

  return (
    <div
      className={cn(
        "h-full overflow-auto contain-strict [overflow-anchor:none]",
        width === 0 ? "opacity-0" : "opacity-100",
        className,
      )}
      ref={scrollRef}
    >
      {width !== 0 && (<div
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
              cardWidth={cardWidth}
            />
          ))
          : null}
          </div>
      </div>)}
    </div>
  );
}

const VirtualGrid = memo(PureVirtualGrid, (prevProps, nextProps) => {
  return (
    arrayEqual(prevProps.items, nextProps.items) &&
    prevProps.minItemWidth === nextProps.minItemWidth &&
    prevProps.gap === nextProps.gap &&
    prevProps.measureAfterRaf === nextProps.measureAfterRaf &&
    shallowEqual(prevProps.cardConfig, nextProps.cardConfig) &&
    prevProps.config === nextProps.config
  );
});

export default VirtualGrid;
