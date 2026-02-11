import type { BasesEntry, BasesViewConfig } from "obsidian";
import { forwardRef } from "react";

import type { CardConfig } from "../Card/types";
import type { GroupConfig } from "../Group/types";

import { Next, Previous } from "./components/Arrows";
import Header from "./components/Header";
import Item from "./components/Item";

import { useCarouselScroll } from "./hooks/use-carousel-scroll";

type Props = {
  cardConfig: CardConfig;
  config: BasesViewConfig;
  groupConfig: GroupConfig;
  items: BasesEntry[];
  groupKey: string;
};

const Carousel = forwardRef<HTMLDivElement, Props>(
  ({ cardConfig, config, groupConfig, items, groupKey }, ref) => {
    const {
      carouselRef,
      isAtStart,
      isAtEnd,
      scroll,
    } = useCarouselScroll();

    return (
      <section aria-labelledby="carousel-title" className="w-full" ref={ref}>
        <div className="container mx-auto px-4 md:px-6">
          <Header
            config={config}
            groupKey={groupKey}
            groupConfig={groupConfig}
            items={items}
          />

          <div className="relative">
            <div
              className="flex w-full space-x-4 overflow-x-auto pb-4 scrollbar-hide"
              ref={carouselRef}
            >
              {items.map((item, index) => (
                <Item
                  cardConfig={cardConfig}
                  config={config}
                  key={item.file.path}
                  entry={item}
                  index={index}
                />
              ))}
            </div>

            {/* Navigation Buttons */}
            {!isAtStart && <Previous onClick={() => scroll("left")} />}
            {!isAtEnd && <Next onClick={() => scroll("right")} />}
          </div>
        </div>
      </section>
    );
  },
);

Carousel.displayName = "Carousel";

export default Carousel;
