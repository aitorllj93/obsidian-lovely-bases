import { BasesEntry, type BasesEntryGroup, type BasesViewConfig } from "obsidian";
import { type CSSProperties, memo, useMemo } from "react";

import { estimateCardHeight } from "@/components/Card/helpers/estimate-card-height";
import type { FacetsConfig } from "@/components/Facets/config";
import { arrayEqual, cn, shallowEqual } from "@/lib/utils";

import CardOutside from "../Card/Outside";

import { useVirtualGrid } from "./hooks/use-virtual-grid";

import Row from "./Row";

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
  const { mediaProperty } = facetsConfig;
  const estimatedRowHeight = useMemo(
    () => estimateCardHeight(facetsConfig),
    [facetsConfig],
  );
  const {
    activeItem,
    activeItemKey,
    activeItemPosition,
    collapsedSectionKeys,
    columnCount,
    columnStyle,
    itemWidth,
    handleKeyDown,
    handleToggleSection,
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
    <>
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
      {
         (activeItem?.data instanceof BasesEntry && (
          <CardOutside
            className="absolute bottom-0 bg-background/30 backdrop-blur-lg w-full"
            config={config}
            contentFont={facetsConfig.contentFont}
            contentMarkdownMaxHeight={facetsConfig.contentMarkdownMaxHeight}
            contentMarkdownMaxLength={facetsConfig.contentMarkdownMaxLength}
            contentPosition={facetsConfig.contentPosition}
            contentShowMarkdown={facetsConfig.contentShowMarkdown}
            contentShowPropertyTitles={facetsConfig.contentShowPropertyTitles}
            entry={activeItem.data}
            properties={facetsConfig.properties}
            titlePosition={facetsConfig.titlePosition}
            titleFont={facetsConfig.titleFont}
          />
        ))
      }
    </>
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
