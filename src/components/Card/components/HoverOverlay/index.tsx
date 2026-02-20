import type { BasesEntry, BasesViewConfig } from "obsidian";
import { memo } from "react";

import type { FacetsConfig } from "@/components/Facets/config";
import { getPropertyValue } from "@/lib/obsidian/entry";

import OverlayContent from "./OverlayContent";

type Props = Pick<FacetsConfig,
  'actionHoverProperty' |
  'actionHoverStyle' |
  'cardAdaptToSize' |
  'contentShowPropertyTitles'
> & {
  entry: BasesEntry;
  config: BasesViewConfig;
};

const PureHoverOverlay = ({
  actionHoverStyle,
  actionHoverProperty,
  cardAdaptToSize,
  contentShowPropertyTitles,
  config,
  entry
}: Props) => {
  const property = getPropertyValue(entry, actionHoverProperty);

  if (!actionHoverProperty || !property) return null;

  if (actionHoverStyle === "overlay") {
    return (
      <div className="absolute bottom-0 left-0 right-0 bg-popover/60 backdrop-blur-sm p-3 animate-in fade-in slide-in-from-bottom-2 duration-200 border-t border-border/60 transition-all">
        <OverlayContent
          adaptToSize={cardAdaptToSize}
          config={config}
          propertyId={actionHoverProperty}
          entry={entry}
          showPropertyTitles={contentShowPropertyTitles}
        />
      </div>
    );
  }

  // Tooltip style - positioned at top
  return (
    <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full bg-popover text-popover-foreground rounded-md shadow-lg p-2 max-w-xs animate-in fade-in zoom-in-95 duration-150 z-50">
      <OverlayContent
        adaptToSize={cardAdaptToSize}
        config={config}
        propertyId={actionHoverProperty}
        entry={entry}
        showPropertyTitles={contentShowPropertyTitles}
      />
      {/* Tooltip arrow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-8 border-transparent border-t-popover" />
    </div>
  );
};

const HoverOverlay = memo(PureHoverOverlay);

HoverOverlay.displayName = "HoverOverlay";

export default HoverOverlay;
