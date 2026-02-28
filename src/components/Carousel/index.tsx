import type { BasesEntry, BasesEntryGroup, BasesViewConfig } from "obsidian";
import { type CSSProperties, forwardRef, memo } from "react";

import Background from "@/components/Background";
import type { FacetsConfig } from "@/components/Facets/config";
import { arrayEqual, cn, shallowEqual } from "@/lib/utils";

import CarouselRow from "./components/Row";
import { useCarousel } from "./hooks/use-carousel";

type Props = {
  className?: string;
  config: BasesViewConfig;
  facetsConfig: FacetsConfig;
  items: (BasesEntry | BasesEntryGroup)[];
  layoutIdPrefix?: string;
  style?: CSSProperties;
};

const PureCarousel = forwardRef<HTMLDivElement, Props>(
  ({ className, config, facetsConfig, items, layoutIdPrefix, style }, ref) => {
    const {
      activeItem,
      collapsedSections,
      handleKeyDown,
      rows,
      toggleSectionCollapse,
    } = useCarousel({ facetsConfig, items });

    return (
      <div className={
        cn(
          className,
          "isolate relative overflow-hidden",
        )
      }>
        <Background
          backgroundGradient={facetsConfig.backgroundGradient}
          backgroundInferFrom={facetsConfig.backgroundInferFrom}
          backgroundProperty={facetsConfig.backgroundProperty}
          items={items}
          activeItem={activeItem?.data}
        />
        {/** biome-ignore lint/a11y/useAriaPropsSupportedByRole: navigation */}
        <div
          // biome-ignore lint/a11y/noAutofocus: navigation
          autoFocus
          className="h-full max-h-screen w-full overflow-auto"
          style={style}
          ref={ref}
          // biome-ignore lint/a11y/noNoninteractiveTabindex: virtual scrollable
          tabIndex={0}
          aria-activedescendant={`row-${activeItem?.id}`}
          onKeyDown={handleKeyDown}
        >
          {rows.map((cols, idx) => (
            <div
              key={idx.toString()}
              className="focus-visible:outline-none"
              style={{ paddingBottom: facetsConfig.layoutGap }}
            >
              <CarouselRow
                activeItem={activeItem}
                collapsedSections={collapsedSections}
                config={config}
                columns={cols}
                facetsConfig={facetsConfig}
                onToggleSection={toggleSectionCollapse}
                layoutIdPrefix={layoutIdPrefix}
              />
            </div>
          ))}
        </div>
      </div>
    );
  },
);

const Carousel = memo(PureCarousel, (prevProps, nextProps) => {
  return (
    arrayEqual(prevProps.items, nextProps.items) &&
    shallowEqual(prevProps.facetsConfig, nextProps.facetsConfig) &&
    prevProps.config === nextProps.config
  );
});

Carousel.displayName = "Carousel";

export default Carousel;
