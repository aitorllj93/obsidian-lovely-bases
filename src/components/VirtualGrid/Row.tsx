import type { BasesEntryGroup, BasesViewConfig } from "obsidian";
import { type CSSProperties, forwardRef, memo } from "react";

import Facets from "@/components/Facets";
import { arrayEqual, shallowEqual } from "@/lib/utils";

import type { FacetsConfig } from "../Facets/config";
import { Header } from "./Header";

import type { Column } from "./types";

type Props = {
  activeItemIndex?: number;
  activeItemKey?: string;
  collapsedSectionKeys?: Set<string>;
  config: BasesViewConfig;
  columns: Column[];
  facetsConfig: FacetsConfig;
  onToggleSection?: (key: string) => void;
  itemsPerColumn: number;
  itemWidth: number;
  index: number;
  layoutIdPrefix?: string;
  onSetActiveIndex?: (activeItemIndex: number) => void;
  style?: CSSProperties;
};

const PureRow = forwardRef<HTMLDivElement, Props>(
  (
    {
      activeItemKey,
      facetsConfig,
      collapsedSectionKeys,
      config,
      columns,
      onToggleSection,
      index,
      itemsPerColumn,
      itemWidth,
      layoutIdPrefix,
      style,
    },
    ref,
  ) => {
    const isSection =
      facetsConfig.groupLayout === "sections" &&
      columns.length === 1 &&
      columns[0].type === "header";

    return (
      <div
        className="w-full grid box-border justify-evenly will-change-transform items-center focus-visible:outline-none"
        data-index={index}
        ref={ref}
        tabIndex={index === 0 ? 0 : undefined}
        style={style}
      >
        {isSection ? (
          <Header
            active={activeItemKey === columns[0].key}
            id={`row-${columns[0].row}-${columns[0].key}`}
            data={columns[0].data as BasesEntryGroup}
            key={columns[0].key}
            isCollapsed={collapsedSectionKeys?.has(columns[0].key)}
            onToggleCollapse={() => onToggleSection?.(columns[0].key)}
            facetsConfig={facetsConfig}
            config={config}
            style={{
              gridColumn: `span ${itemsPerColumn}`,
            }}
          />
        ) : (
          columns.map((col, dataIndex) => (
            <Facets
              active={activeItemKey === col.key}
              className="mx-auto min-h-fit"
              id={`row-${col.row}-${col.key}`}
              initialAnimation
              index={dataIndex}
              key={col.key}
              data={col.data as BasesEntryGroup}
              facetsConfig={{
                ...facetsConfig,
                layoutItemSize: itemWidth,
              }}
              config={config}
              layoutIdPrefix={layoutIdPrefix}
            />
          ))
        )}
      </div>
    );
  },
);

const Row = memo(PureRow, (prevProps, nextProps) => {
  return (
    prevProps.activeItemIndex === nextProps.activeItemIndex &&
    prevProps.activeItemKey === nextProps.activeItemKey &&
    prevProps.index === nextProps.index &&
    prevProps.itemWidth === nextProps.itemWidth &&
    prevProps.itemsPerColumn === nextProps.itemsPerColumn &&
    prevProps.collapsedSectionKeys === nextProps.collapsedSectionKeys &&
    prevProps.onToggleSection === nextProps.onToggleSection &&
    shallowEqual(prevProps.style, nextProps.style) &&
    shallowEqual(prevProps.facetsConfig, nextProps.facetsConfig) &&
    arrayEqual(prevProps.columns, nextProps.columns) &&
    prevProps.config === nextProps.config
  );
});

export default Row;
