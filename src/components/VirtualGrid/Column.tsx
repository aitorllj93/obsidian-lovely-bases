import type { BasesEntry, BasesViewConfig } from "obsidian";
import { forwardRef } from "react";

import Card from "../Card";
import type { CardConfig } from "../Card/types";

type Props = {
  cardConfig: CardConfig;
  columnCount: number;
  config: BasesViewConfig;
  data: BasesEntry[];
  gap: number;
  index: number;
  start: number;
  cardWidth: number;
}

const Column = forwardRef<HTMLDivElement, Props>(({
  cardConfig,
  columnCount,
  config,
  data,
  gap,
  index,
  start,
  cardWidth,
}, ref) => {
  return (
    <div
      className="w-full grid box-border justify-evenly"
      data-index={index}
      ref={ref}
      tabIndex={index === 0 ? 0 : undefined}
      style={{
        gridTemplateColumns: `repeat(${columnCount}, minmax(0, ${cardWidth}px))`,
        gap,
        marginBottom: gap,
      }}
    >
      {data.map((item) => (
        <Card
          className="mx-auto"
          key={item.file.path}
          entry={item}
          config={config}
          {...cardConfig}
          cardSize={cardWidth}
        />
      ))}
    </div>
  );
})

export default Column;
