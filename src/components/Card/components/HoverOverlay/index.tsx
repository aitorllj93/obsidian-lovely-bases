import type { BasesEntry, BasesViewConfig } from "obsidian";
import { memo } from "react";

import { useEntryProperty } from "@/hooks/use-property";

import type { CardConfig } from "../../types";

import OverlayContent from "./OverlayContent";

type Props = {
  adaptToSize?: boolean;
  entry: BasesEntry;
  cardConfig: CardConfig;
  config: BasesViewConfig;
};

const HoverOverlay = memo(({ adaptToSize, cardConfig, config, entry }: Props) => {
  const { hoverProperty, hoverStyle, showPropertyTitles } = cardConfig;
  const property = useEntryProperty(entry, config, hoverProperty);

  if (hoverStyle === "none" || !property || !property.value) return null;

  if (hoverStyle === "overlay") {
    return (
      <div className="absolute bottom-0 left-0 right-0 bg-popover/60 backdrop-blur-sm p-3 animate-in fade-in slide-in-from-bottom-2 duration-200 border-t border-border/60 transition-all">
        <OverlayContent
          adaptToSize={adaptToSize}
          config={config}
          propertyId={hoverProperty}
          entry={entry}
          showPropertyTitles={showPropertyTitles}
        />
      </div>
    );
  }

  // Tooltip style - positioned at top
  return (
    <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full bg-popover text-popover-foreground rounded-md shadow-lg p-2 max-w-xs animate-in fade-in zoom-in-95 duration-150 z-50">
      <OverlayContent
        adaptToSize={adaptToSize}
        config={config}
        propertyId={hoverProperty}
        entry={entry}
        showPropertyTitles={showPropertyTitles}
      />
      {/* Tooltip arrow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-8 border-transparent border-t-popover" />
    </div>
  );
});

HoverOverlay.displayName = "HoverOverlay";

export default HoverOverlay;
