import { useVirtualizer } from "@tanstack/react-virtual";
import type { BasesEntry, BasesViewConfig } from "obsidian";
import { memo, useMemo } from "react";

import { arrayEqual, chunk, cn, shallowEqual } from "@/lib/utils";

import { estimateCardHeight } from "../Card/helpers/estimate-card-height";
import type { CardConfig } from "../Card/types";
import type { GroupConfig } from "../Group/types";

import Column from "./Column";
import { useElementWidth } from "./hooks/use-element-width";
import { useVirtualGridImagePrefetch } from "./hooks/use-images-prefetch";
import { getGridConfig } from "./utils";

type Props = {
  cardConfig: CardConfig;
  className?: string;
  config: BasesViewConfig;
  gap?: number;
  groupConfig?: GroupConfig;
  items: BasesEntry[];
  minItemWidth?: number;
};

function PureVirtualGrid({
  cardConfig,
  className,
  config,
  gap = 16,
  groupConfig,
  items,
  minItemWidth = 240,
}: Props) {
  const { imageProperty } = cardConfig;
  const [scrollRef, width] = useElementWidth<HTMLDivElement>();
  const estimatedRowHeight = useMemo(
    () => estimateCardHeight(cardConfig),
    [cardConfig],
  );

  const {
    columnCount,
    cardWidth,
    columnStyle,
  } = useMemo(
    () => getGridConfig(width, gap, minItemWidth),
    [width, gap, minItemWidth],
  );

  const rows = useMemo(() => chunk(items, columnCount), [items, columnCount]);

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => estimatedRowHeight,
    overscan: 6,
    gap,
  });

  const vitems = virtualizer.getVirtualItems();

  useVirtualGridImagePrefetch(vitems, rows, (entry) =>
    [imageProperty && entry.getValue(imageProperty)?.toString()].filter(
      (v) => v !== undefined && v !== null && v !== 'null',
    ),
  );

  return (
    <div
      className={cn(
        "h-full overflow-auto [overflow-anchor:none]",
        width === 0 ? "opacity-0" : "opacity-100",
        className,
      )}
      ref={scrollRef}
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
                  <div key={vRow.key} style={{ paddingBottom: gap }}>
                    <Column
                      cardConfig={cardConfig}
                      cardWidth={cardWidth}
                      config={config}
                      data={rows[vRow.index] ?? []}
                      groupConfig={groupConfig}
                      index={vRow.index}
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
    shallowEqual(prevProps.cardConfig, nextProps.cardConfig) &&
    shallowEqual(prevProps.groupConfig, nextProps.groupConfig) &&
    prevProps.config === nextProps.config
  );
});

export default VirtualGrid;
