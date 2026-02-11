import type { BasesEntry, BasesPropertyId, BasesViewConfig } from "obsidian";
import { memo } from "react";

import { useObsidian } from "@/components/Obsidian/Context";
import PropertyValue from "@/components/Obsidian/PropertyValue";
import { useEntryProperty } from "@/hooks/use-property";
import { cn } from "@/lib/utils";

const EMPTY_PLACEHOLDER = "—";

type Props = {
  adaptToSize?: boolean;
  config: BasesViewConfig;
  entry: BasesEntry;
  isOverlayMode?: boolean;
  propertyId: BasesPropertyId;
  showPropertyTitles: boolean;
};

const Property = memo(
  ({
    adaptToSize = false,
    config,
    entry,
    isOverlayMode,
    propertyId,
    showPropertyTitles,
  }: Props) => {
    const property = useEntryProperty(entry, config, propertyId);
    const { renderContext } = useObsidian().app;

    if (!property) return null;

    return (
      <div className="flex flex-col gap-0.5">
        {showPropertyTitles && (
          <span
            className={cn(
              "font-medium tracking-wide",
              !adaptToSize && "text-xs",
              adaptToSize &&
                "@[0px]/lovely-card:text-6xs @8xs/lovely-card:text-5xs @7xs/lovely-card:text-4xs @6xs/lovely-card:text-3xs @5xs/lovely-card:text-sm @4xs/lovely-card:text-xs",
              isOverlayMode ? "text-white/70" : "text-muted-foreground",
            )}
          >
            {property.displayName}
          </span>
        )}
        <div>
          {!property.isEmpty ? (
            <PropertyValue
              renderContext={renderContext}
              as="div"
              className={cn(
                "line-clamp-3",
                !adaptToSize && "text-sm",
                adaptToSize &&
                  "@[0px]/lovely-card:text-5xs @8xs/lovely-card:text-4xs @7xs/lovely-card:text-3xs @6xs/lovely-card:text-2xs @5xs/lovely-card:text-xs @4xs/lovely-card:text-sm",
                isOverlayMode ? "text-white/90" : "text-foreground",
              )}
              value={property.value}
            />
          ) : (
            <span
              className={cn(
                "tracking-wide",
                !adaptToSize && "text-xs",
                adaptToSize &&
                  "@[0px]/lovely-card:text-6xs @8xs/lovely-card:text-5xs @7xs/lovely-card:text-4xs @6xs/lovely-card:text-3xs @5xs/lovely-card:text-sm @4xs/lovely-card:text-xs",
                isOverlayMode ? "text-white/50" : "text-muted-foreground",
              )}
            >
              {EMPTY_PLACEHOLDER}
            </span>
          )}
        </div>
      </div>
    );
  },
  (prevProps, nextProps) =>
    prevProps.entry === nextProps.entry &&
    prevProps.propertyId === nextProps.propertyId &&
    prevProps.showPropertyTitles === nextProps.showPropertyTitles &&
    prevProps.config === nextProps.config &&
    prevProps.isOverlayMode === nextProps.isOverlayMode,
);

Property.displayName = "Property";

export default Property;
