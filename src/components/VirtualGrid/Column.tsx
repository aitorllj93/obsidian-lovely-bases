import type { BasesEntry, BasesViewConfig } from "obsidian";
import { type CSSProperties, forwardRef, memo } from "react";

import { shallowEqual } from "@/lib/utils";

import Card from "../Card";
import type { CardConfig } from "../Card/types";

type Props = {
  cardConfig: CardConfig;
  config: BasesViewConfig;
  data: BasesEntry[];
  index: number;
  cardWidth: number;
  style?: CSSProperties;
}

const PureColumn = forwardRef<HTMLDivElement, Props>(({
  cardConfig,
  config,
  data,
  index,
  cardWidth,
  style,
}, ref) => {
  return (
    <div
      className="w-full grid box-border justify-evenly contain-[layout_paint] will-change-transform"
      data-index={index}
      ref={ref}
      tabIndex={index === 0 ? 0 : undefined}
      style={style}
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

const Column = memo(PureColumn, (prevProps, nextProps) => {
  return (
    prevProps.index === nextProps.index &&
    prevProps.cardWidth === nextProps.cardWidth &&
    shallowEqual(prevProps.style, nextProps.style) &&
    prevProps.cardConfig === nextProps.cardConfig &&
    prevProps.config === nextProps.config
  );
});

export default Column;
