import type { BasesEntry, BasesViewConfig } from "obsidian";
import { memo } from "react";

import type { FacetsConfig } from "@/components/Facets/config";
import { arrayEqual, cn } from "@/lib/utils";

import Property from "./Property";

type Props = Pick<
  FacetsConfig,
  | "cardAdaptToSize"
  | "cardLayout"
  | "contentFont"
  | "contentPosition"
  | "properties"
  | "contentShowPropertyTitles"
> & {
  entry: BasesEntry;
  config: BasesViewConfig;
};

const PurePropertyList = ({
  cardAdaptToSize,
  cardLayout,
  contentFont,
  contentPosition,
  contentShowPropertyTitles,
  properties,
  entry,
  config,
}: Props) => {
  if (contentPosition !== 'inside' || properties.length === 0) return null;

  return (
    <div
      className={cn(!(cardLayout === "overlay") && "flex-1 min-h-0")}
      style={{
        fontFamily: contentFont,
      }}
    >
      <div
        className={cn(
          "flex flex-col overflow-y-auto",
          !cardAdaptToSize && "gap-2",
          cardAdaptToSize &&
            "@[0px]/lovely-card:gap-1 @7xs/lovely-card:gap-1.5 @5xs/lovely-card:gap-2",
        )}
      >
        {properties.map((property) => (
          <Property
            adaptToSize={cardAdaptToSize}
            key={property}
            entry={entry}
            propertyId={property}
            showPropertyTitles={contentShowPropertyTitles}
            config={config}
            isOverlayMode={cardLayout === "overlay"}
          />
        ))}
      </div>
    </div>
  );
};

const PropertyList = memo(PurePropertyList, (prevProps, nextProps) =>
  prevProps.cardAdaptToSize === nextProps.cardAdaptToSize &&
  prevProps.cardLayout === nextProps.cardLayout &&
  prevProps.contentFont === nextProps.contentFont &&
  prevProps.contentPosition === nextProps.contentPosition &&
  prevProps.contentShowPropertyTitles === nextProps.contentShowPropertyTitles &&
  arrayEqual(prevProps.properties, nextProps.properties) &&
  prevProps.entry === nextProps.entry &&
  prevProps.config === nextProps.config
);

PropertyList.displayName = "PropertyList";

export default PropertyList;
