import type { BasesEntryGroup, BasesViewConfig } from "obsidian";
import { type CSSProperties, forwardRef, memo } from "react";

import type { FacetsConfig } from "@/components/Facets/config";
import FacetsOutside from "@/components/Facets/Outside";
import Header from "@/components/Sections/Header";

import type { Column } from "../types";

import ScrollableItems from "./ScrollableItems";

type Props = {
  activeItem?: Column;
  collapsedSections?: Set<string>;
  config: BasesViewConfig;
  columns: Column[];
  facetsConfig: FacetsConfig;
  onToggleSection?: (key: string) => void;
  layoutIdPrefix?: string;
  style?: CSSProperties;
};

const PureRow = forwardRef<HTMLDivElement, Props>(
  (
    {
      activeItem,
      facetsConfig,
      collapsedSections,
      config,
      columns,
      onToggleSection,
      layoutIdPrefix,
      style,
    },
    ref,
  ) => {
    const isSection =
      facetsConfig.groupLayout === "sections" &&
      columns.length === 1 &&
      columns[0].type === "header";
    const containsActiveItem =
      activeItem && columns.some((c) => c.id === activeItem.id);

    return (
      <section className="container mx-auto px-4 md:px-6" ref={ref}>
        {isSection ? (
          <Header
            active={activeItem?.id === columns[0].id}
            id={`row-${columns[0].id}`}
            data={columns[0].data as BasesEntryGroup}
            key={columns[0].key}
            isCollapsed={collapsedSections?.has(columns[0].key)}
            onToggleCollapse={() => onToggleSection?.(columns[0].key)}
            facetsConfig={facetsConfig}
            config={config}
          />
        ) : (
          <>
            <ScrollableItems
              activeItemId={activeItem?.id}
              facetsConfig={facetsConfig}
              collapsedSections={collapsedSections}
              config={config}
              columns={columns}
              layoutIdPrefix={layoutIdPrefix}
              style={style}
            />
            {containsActiveItem && activeItem.type === "item" && (
              <FacetsOutside
                className="w-full max-w-2xl"
                config={config}
                facetsConfig={facetsConfig}
                item={activeItem.data}
              />
            )}
          </>
        )}
      </section>
    );
  },
);

const CarouselRow = memo(PureRow);

CarouselRow.displayName = "CarouselRow";

export default CarouselRow;
