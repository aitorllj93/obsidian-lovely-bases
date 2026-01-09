import type { RenderContext } from "obsidian";
import { memo } from "react";

import PropertyValue from "@/components/Obsidian/PropertyValue";
import { cn } from "@/lib/utils";

import type { ItemProperty } from "./types";

type HoverOverlayProps = {
	renderContext: RenderContext;
	property: ItemProperty | null;
	style: 'overlay' | 'tooltip';
	cardSize: number;
  }

  const getTextSizeClass = (cardSize: number) => {
	if (cardSize < 100) return 'text-xs';
	if (cardSize < 200) return 'text-sm';
	if (cardSize < 300) return 'text-base';
	if (cardSize < 400) return 'text-lg';
	if (cardSize < 500) return 'text-xl';
	if (cardSize < 600) return 'text-2xl';
	if (cardSize < 700) return 'text-3xl';
	if (cardSize < 800) return 'text-4xl';
	return 'text-5xl';
  }

  const HoverOverlay = memo(({ renderContext, property, style, cardSize }: HoverOverlayProps) => {
	if (!property || !property.value) return null;

	const textSizeClass = getTextSizeClass(cardSize);

	if (style === 'overlay') {
	  return (
		<div className="absolute bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm p-3 animate-in fade-in slide-in-from-bottom-2 duration-200 border-t border-border">
		  <div className="flex flex-col gap-1">
			<span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
			  {property.displayName}
			</span>
			<PropertyValue
				renderContext={renderContext}
				as="div"
				className={cn(
					"text-foreground line-clamp-3",
					textSizeClass,
				)}
				value={property.value}
			/>
		  </div>
		</div>
	  );
	}

	// Tooltip style - positioned at top
	return (
	  <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full bg-popover text-popover-foreground rounded-md shadow-lg p-2 max-w-xs animate-in fade-in zoom-in-95 duration-150 z-50">
		<div className="flex flex-col gap-0.5">
		  <span className="text-xs font-medium uppercase tracking-wide opacity-70">
			{property.displayName}
		  </span>
		  <PropertyValue
			renderContext={renderContext}
			as="div"
			className={cn(
				"text-foreground line-clamp-2",
				textSizeClass,
			)}
			value={property.value}
		  />
		</div>
		{/* Tooltip arrow */}
		<div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-8 border-transparent border-t-popover" />
	  </div>
	);
  });

  HoverOverlay.displayName = "HoverOverlay";

  export default HoverOverlay;
