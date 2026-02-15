import type { BasesEntry, BasesViewConfig } from "obsidian";
import { memo } from "react";

import type { FacetsConfig } from "@/components/Facets/config";
import { cn } from "@/lib/utils";

import Property from "./Property";

type Props = {
  entry: BasesEntry;
  facetsConfig: FacetsConfig;
  config: BasesViewConfig;
  isOverlayMode?: boolean;
};

const PropertyList = memo(
  ({
    entry,
    facetsConfig,
    config,
    isOverlayMode,
  }: Props) => {
    const { cardAdaptToSize, contentFont, properties, contentShowPropertyTitles } = facetsConfig;

    if (properties.length === 0) return null;

    return (
      <div
        className={cn(!isOverlayMode && "flex-1 min-h-0")}
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
              isOverlayMode={isOverlayMode}
            />
          ))}
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.entry === nextProps.entry &&
      prevProps.facetsConfig === nextProps.facetsConfig &&
      prevProps.config === nextProps.config &&
      prevProps.isOverlayMode === nextProps.isOverlayMode
    );
  },
);

PropertyList.displayName = "PropertyList";

export default PropertyList;
