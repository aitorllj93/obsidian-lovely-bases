import { useVirtualizer } from "@tanstack/react-virtual";
import type { BasesEntry, BasesEntryGroup, BasesViewConfig } from "obsidian";
import {
  type CSSProperties,
  memo,
  useCallback,
  useMemo,
  useState,
} from "react";

import { estimateCardHeight } from "@/components/Card/helpers/estimate-card-height";
import type { FacetsConfig } from "@/components/Facets/config";
import { arrayEqual, cn, shallowEqual } from "@/lib/utils";

import Column from "./Column";
import { useElementWidth } from "./hooks/use-element-width";
import { useVirtualGridImagePrefetch } from "./hooks/use-images-prefetch";
import { getGridConfig, getRows } from "./utils";

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

  return (
    <div
      className={cn(
        "h-full overflow-auto [overflow-anchor:none]",
        width === 0 ? "opacity-0" : "opacity-100",
        className,
      )}
      ref={scrollRef}
      style={style}
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
                    style={{ paddingBottom: facetsConfig.layoutGap }}
                  >
                    <Column
                      collapsedSectionKeys={collapsedSectionKeys}
                      config={config}
                      data={rows[vRow.index] ?? []}
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
