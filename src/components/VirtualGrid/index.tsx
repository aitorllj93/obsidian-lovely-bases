import type { BasesEntry, BasesEntryGroup, BasesViewConfig } from "obsidian";
import { type CSSProperties, memo, useMemo } from "react";

import Background from "@/components/Background";
import { estimateCardHeight } from "@/components/Card/helpers/estimate-card-height";
import type { FacetsConfig } from "@/components/Facets/config";
import { arrayEqual, cn, shallowEqual } from "@/lib/utils";

import FacetsOutside from "../Facets/Outside";

import { useVirtualGrid } from "./hooks/use-virtual-grid";

import Row from "./Row";

type Props = {
  className?: string;
  config: BasesViewConfig;
  facetsConfig: FacetsConfig;
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
  const { mediaProperty } = facetsConfig;
  const estimatedRowHeight = useMemo(
    () => estimateCardHeight(facetsConfig),
    [facetsConfig],
  );
  const {
    activeItem,
    collapsedSections,
    columnCount,
    columnStyle,
    itemWidth,
    handleKeyDown,
    toggleSectionCollapse,
    rows,
    scrollRef,
    vitems,
    virtualizer,
    width,
  } = useVirtualGrid({
    estimatedRowHeight,
    facetsConfig,
    mediaProperty,
    items,
    minItemWidth,
  });

  return (
    <div className={
      cn(
        className,
        "isolate relative overflow-hidden px-(--size-4-2)",
      )
    }>
      <Background
        backgroundGradient={facetsConfig.backgroundGradient}
        backgroundInferFrom={facetsConfig.backgroundInferFrom}
        backgroundProperty={facetsConfig.backgroundProperty}
        items={items}
        activeItem={activeItem?.data}
      />
      {/** biome-ignore lint/a11y/useAriaPropsSupportedByRole: virtual navigation */}
      <div
        // biome-ignore lint/a11y/noAutofocus: navigation
        autoFocus
        className={cn(
          "h-full overflow-auto [overflow-anchor:none] outline-none",
          width === 0 ? "opacity-0" : "opacity-100",
          className,
        )}
        ref={scrollRef}
        style={style}
        // biome-ignore lint/a11y/noNoninteractiveTabindex: virtual scrollable
        tabIndex={0}
        aria-activedescendant={`row-${activeItem?.id}`}
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
                        activeItemId={activeItem?.id}
                        collapsedSections={collapsedSections}
                        config={config}
                        columns={rows[vRow.index] ?? []}
                        facetsConfig={facetsConfig}
                        index={vRow.index}
                        itemWidth={itemWidth}
                        itemsPerColumn={columnCount}
                        layoutIdPrefix={layoutIdPrefix}
                        onToggleSection={toggleSectionCollapse}
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
      {
        (activeItem && activeItem.type === 'item' && (
          <FacetsOutside
            className="absolute bottom-0 bg-background/60 backdrop-blur w-full"
            config={config}
            facetsConfig={facetsConfig}
            item={activeItem.data}
          />
        ))
      }
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

VirtualGrid.displayName = 'VirtualGrid';

export default VirtualGrid;
