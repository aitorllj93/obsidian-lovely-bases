import type { BasesEntryGroup, BasesViewConfig } from "obsidian";
import { type CSSProperties, forwardRef, memo } from "react";

import Facets from "@/components/Facets";
import { arrayEqual, shallowEqual } from "@/lib/utils";

import type { FacetsConfig } from "../Facets/config";
import { Header } from "./Header";

import type { Column } from "./types";

type Props = {
  activeItemId?: string;
  collapsedSections?: Set<string>;
  config: BasesViewConfig;
  columns: Column[];
  facetsConfig: FacetsConfig;
  onToggleSection?: (key: string) => void;
  itemsPerColumn: number;
  itemWidth: number;
  index: number;
  layoutIdPrefix?: string;
  style?: CSSProperties;
};

const PureRow = forwardRef<HTMLDivElement, Props>(
  (
    {
      activeItemId,
      facetsConfig,
      collapsedSections,
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
            active={activeItemId === columns[0].id}
            id={`row-${columns[0].id}`}
            data={columns[0].data as BasesEntryGroup}
            key={columns[0].key}
            isCollapsed={collapsedSections?.has(columns[0].key)}
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
              active={activeItemId === col.id}
              className="mx-auto min-h-fit"
              id={`row-${col.id}`}
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
    prevProps.activeItemId === nextProps.activeItemId &&
    prevProps.index === nextProps.index &&
    prevProps.itemWidth === nextProps.itemWidth &&
    prevProps.itemsPerColumn === nextProps.itemsPerColumn &&
    prevProps.collapsedSections === nextProps.collapsedSections &&
    prevProps.onToggleSection === nextProps.onToggleSection &&
    shallowEqual(prevProps.style, nextProps.style) &&
    shallowEqual(prevProps.facetsConfig, nextProps.facetsConfig) &&
    arrayEqual(prevProps.columns, nextProps.columns) &&
    prevProps.config === nextProps.config
  );
});

export default Row;
