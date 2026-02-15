import {
  type BasesEntry,
  BasesEntryGroup,
  type BasesViewConfig,
} from "obsidian";
import { type CSSProperties, forwardRef, memo } from "react";

import Facets from "@/components/Facets";
import { shallowEqual } from "@/lib/utils";

import type { FacetsConfig } from "../Facets/config";

type Props = {
  config: BasesViewConfig;
  data: (BasesEntry | BasesEntryGroup)[];
  facetsConfig: FacetsConfig;
  itemsPerColumn: number;
  itemWidth: number;
  index: number;
  layoutIdPrefix?: string;
  style?: CSSProperties;
};

const PureColumn = forwardRef<HTMLDivElement, Props>(
  (
    { facetsConfig, config, data, index, itemWidth, layoutIdPrefix, style },
    ref,
  ) => {
    return (
      <div
        className="w-full grid box-border justify-evenly will-change-transform items-center"
        data-index={index}
        ref={ref}
        tabIndex={index === 0 ? 0 : undefined}
        style={style}
      >
        {data.map((item, dataIndex) => (
          <Facets
            className="mx-auto h-fit"
            initialAnimation
            index={dataIndex}
            key={
              item instanceof BasesEntryGroup
                ? item.key?.toString()
                : item.file.path
            }
            data={item as BasesEntryGroup}
            facetsConfig={{
              ...facetsConfig,
              layoutItemSize: itemWidth,
            }}
            config={config}
            layoutIdPrefix={layoutIdPrefix}
          />
        ))}
      </div>
    );
  },
);

const Column = memo(PureColumn, (prevProps, nextProps) => {
  return (
    prevProps.index === nextProps.index &&
    prevProps.itemWidth === nextProps.itemWidth &&
    shallowEqual(prevProps.style, nextProps.style) &&
    shallowEqual(prevProps.facetsConfig, nextProps.facetsConfig) &&
    prevProps.config === nextProps.config
  );
});

export default Column;
