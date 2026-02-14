import type { BasesEntry, BasesViewConfig } from "obsidian";
import { type CSSProperties, forwardRef, memo } from "react";

import { shallowEqual } from "@/lib/utils";

import type { CardConfig } from "../Card/types";
import type { GroupConfig } from "../Group/types";

import GroupOrEntry from "../GroupOrEntry";

type Props = {
  cardConfig: CardConfig;
  cardWidth: number;
  config: BasesViewConfig;
  data: BasesEntry[];
  groupConfig?: GroupConfig;
  index: number;
  style?: CSSProperties;
}

const PureColumn = forwardRef<HTMLDivElement, Props>(({
  cardConfig,
  config,
  data,
  groupConfig,
  index,
  cardWidth,
  style,
}, ref) => {
  return (
    <div
      className="w-full grid box-border justify-evenly will-change-transform"
      data-index={index}
      ref={ref}
      tabIndex={index === 0 ? 0 : undefined}
      style={style}
    >
      {data.map((item) => (
        <GroupOrEntry
          className="mx-auto"
          key={item.file.path}
          data={item}
          cardConfig={{
            ...cardConfig,
            cardSize: cardWidth,
          }}
          config={config}
          groupConfig={groupConfig}
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
    prevProps.config === nextProps.config &&
    prevProps.groupConfig === nextProps.groupConfig
  );
});

export default Column;
