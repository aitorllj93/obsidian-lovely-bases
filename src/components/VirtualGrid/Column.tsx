import { type BasesEntry, BasesEntryGroup, type BasesViewConfig } from "obsidian";
import { type CSSProperties, forwardRef, memo } from "react";

import { shallowEqual } from "@/lib/utils";

import type { CardConfig } from "../Card/types";
import type { GroupConfig } from "../Group/types";

import GroupOrEntry from "../GroupOrEntry";

type Props = {
  cardConfig: CardConfig;
  cardWidth: number;
  config: BasesViewConfig;
  data: (BasesEntry | BasesEntryGroup)[];
  groupConfig?: GroupConfig;
  index: number;
  layoutIdPrefix?: string;
  style?: CSSProperties;
}

const PureColumn = forwardRef<HTMLDivElement, Props>(({
  cardConfig,
  config,
  data,
  groupConfig,
  index,
  cardWidth,
  layoutIdPrefix,
  style,
}, ref) => {
  return (
    <div
      className="w-full grid box-border justify-evenly will-change-transform items-center"
      data-index={index}
      ref={ref}
      tabIndex={index === 0 ? 0 : undefined}
      style={style}
    >
      {data.map((item) => (
        <GroupOrEntry
          className="mx-auto h-fit"
          key={item instanceof BasesEntryGroup ? item.key?.toString() : item.file.path}
          data={item as BasesEntryGroup}
          cardConfig={{
            ...cardConfig,
            cardSize: cardWidth,
          }}
          config={config}
          groupConfig={groupConfig}
          layoutIdPrefix={layoutIdPrefix}
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
