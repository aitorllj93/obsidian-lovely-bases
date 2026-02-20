import type { BasesEntry, BasesViewConfig } from "obsidian";
import { forwardRef, useCallback, useRef, useState } from "react";

import type { FacetsConfig } from "@/components/Facets/config";

import { Next, Previous } from "./components/Arrows";
import Header from "./components/Header";
import Item from "./components/Item";

import { useCarouselScroll } from "./hooks/use-carousel-scroll";

type Props = {
  config: BasesViewConfig;
  facetsConfig: FacetsConfig;
  items: BasesEntry[];
  groupKey: string;
};

type Direction = 'left' | 'right';

type Position = {
  row: number;
  col: number;
}

const Carousel = forwardRef<HTMLDivElement, Props>(
  ({ config, facetsConfig, items, groupKey }, ref) => {
    const [activeItemKey, setActiveItemKey] = useState<string>(items[0].file.path);
    const [activeItemPosition, setActiveItemPosition] = useState<Position>({ col: 0, row: 0 });
    const keyDownRafRef = useRef<number | null>(null);
    const {
      carouselRef,
      isAtStart,
      isAtEnd,
      scroll,
    } = useCarouselScroll();



  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (items.length === 0) return;

    const navigateTo = (direction: Direction) => {
      if (keyDownRafRef.current) return; // ya hay uno pendiente

      keyDownRafRef.current = requestAnimationFrame(() => {
        keyDownRafRef.current = null;
        const canNavigate = direction === 'left' ?
          activeItemPosition.col !== 0 :
          activeItemPosition.col <= items.length;
        const nextItemPosition: Position = {
          row: 0,
          col: canNavigate ?
            direction === 'left' ? activeItemPosition.col - 1 : activeItemPosition.col + 1 :
            activeItemPosition.col,
        };
        const nextItem = items[nextItemPosition.col];

        if (!nextItem) {
          return;
        }

        setActiveItemPosition(nextItemPosition);
        setActiveItemKey(nextItem.file.path);
        carouselRef.current?.scrollTo({
          left: facetsConfig.layoutItemSize * nextItemPosition.col,
          behavior: 'smooth',
        })

        // const elementId = `row-${nextItem.row}-${nextItem.key}`;
        // const element = document.getElementById(elementId);
        // element?.focus();
      });
    }

    switch (e.key) {
      case "ArrowLeft":
        navigateTo('left');
        e.preventDefault();
        break;
      case "ArrowRight":
        navigateTo('right');
        e.preventDefault();
        break;
    }

}, [activeItemPosition.col, carouselRef.current, facetsConfig.layoutItemSize, items]);

    return (
      <section aria-labelledby="carousel-title" className="w-full" ref={ref}>
        <div className="container mx-auto px-4 md:px-6">
          <Header
            config={config}
            groupKey={groupKey}
            facetsConfig={facetsConfig}
            items={items}
          />

          <div className="relative">
            <div
              className="flex w-full py-4 px-4 overflow-x-auto pb-4 scrollbar-hide focus-visible:outline-none"
              style={{
                gap: `${facetsConfig.layoutGap}px`,
              }}
              ref={carouselRef}
              // biome-ignore lint/a11y/noNoninteractiveTabindex: <explanation>
              tabIndex={0}
              onKeyDown={handleKeyDown}
            >
              {items.map((item, index) => (
                <Item
                  active={item.file.path === activeItemKey}
                  facetsConfig={facetsConfig}
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
