import type { BasesEntryGroup, BasesViewConfig } from "obsidian";
import { type CSSProperties, forwardRef, memo } from "react";

import Facets from "@/components/Facets";
import type { FacetsConfig } from "@/components/Facets/config";

import { useCarouselScroll } from "../hooks/use-carousel-scroll";
import type { Column } from "../types";

import { Next, Previous } from "./Arrows";

type Props = {
  activeItemId?: string;
  collapsedSections?: Set<string>;
  config: BasesViewConfig;
  columns: Column[];
  facetsConfig: FacetsConfig;
  layoutIdPrefix?: string;
  style?: CSSProperties;
};

const PureScrollableItems = forwardRef<HTMLDivElement, Props>(
  (
    {
      activeItemId,
      facetsConfig,
      config,
      columns,
      layoutIdPrefix,
    },
    ref,
  ) => {
    const {
      carouselRef,
      isAtStart,
      isAtEnd,
      scroll,
    } = useCarouselScroll();

    return (
      <div ref={ref} className="relative">
        <div
          className="flex w-full py-4 px-4 overflow-x-auto pb-4 scrollbar-hide focus-visible:outline-none"
          style={{
            gap: `${facetsConfig.layoutGap}px`,
          }}
          ref={carouselRef}
          // biome-ignore lint/a11y/noNoninteractiveTabindex: enable navigation
          tabIndex={0}
        >
          {columns.map((col, index) => (
            <Facets
              active={activeItemId === col.id}
              id={`row-${col.id}`}
              initialAnimation
              index={index}
              key={col.key}
              data={col.data as BasesEntryGroup}
              facetsConfig={facetsConfig}
              config={config}
              layoutIdPrefix={layoutIdPrefix}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        {!isAtStart && <Previous onClick={() => scroll("left")} />}
        {!isAtEnd && <Next onClick={() => scroll("right")} />}
      </div>
    );
  }
);

const ScrollableItems = memo(PureScrollableItems)

export default ScrollableItems;
