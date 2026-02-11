import type { BasesEntry, BasesViewConfig } from "obsidian";
import { memo } from "react";

import { cn } from "@/lib/utils";

import type { CardConfig } from "../types";

import Property from "./Property";

type Props = {
  adaptToSize?: boolean;
  entry: BasesEntry;
  cardConfig: CardConfig;
  config: BasesViewConfig;
  isOverlayMode?: boolean;
};

const PropertyList = memo(
  ({
    adaptToSize = false,
    entry,
    cardConfig,
    config,
    isOverlayMode,
  }: Props) => {
    const { contentFont, properties, showPropertyTitles } = cardConfig;

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
            !adaptToSize && "gap-2",
            adaptToSize &&
              "@[0px]/lovely-card:gap-1 @7xs/lovely-card:gap-1.5 @5xs/lovely-card:gap-2",
          )}
        >
          {properties.map((property) => (
            <Property
              adaptToSize={adaptToSize}
              key={property}
              entry={entry}
              propertyId={property}
              showPropertyTitles={showPropertyTitles}
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
      prevProps.adaptToSize === nextProps.adaptToSize &&
      prevProps.entry === nextProps.entry &&
      prevProps.cardConfig === nextProps.cardConfig &&
      prevProps.config === nextProps.config &&
      prevProps.isOverlayMode === nextProps.isOverlayMode
    );
  },
);

PropertyList.displayName = "PropertyList";

export default PropertyList;
