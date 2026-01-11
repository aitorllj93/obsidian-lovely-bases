import type { BasesPropertyId } from "obsidian";
import { memo } from "react";

import PropertyValue from "@/components/Obsidian/PropertyValue";
import { useApp } from "@/contexts/app";
import { useConfigValue } from "@/hooks/use-config-value";
import { useEntryProperty } from "@/hooks/use-property";
import { cn } from "@/lib/utils";
import type { ItemProperty } from "./types";

const EMPTY_PLACEHOLDER = "—";

type OverlayContentProps = {
	property: ItemProperty;
};

const OverlayContent = ({
	property,
}: OverlayContentProps) => {
  const renderContext = useApp().renderContext;
  const showTitle = useConfigValue<boolean>("showPropertyTitles", true);

	return (
		<div className="flex flex-col gap-0.5">
			{showTitle && (
				<span
					className={cn(
						"font-medium text-muted-foreground text-xs tracking-wide p-[0_var(--size-4-2)]",
					)}
				>
					{property.displayName}
				</span>
			)}
			<div className={cn("p-(--input-padding)")}>
				{!property.isEmpty ? (
					<PropertyValue
						renderContext={renderContext}
						as="div"
						className="text-foreground text-sm line-clamp-1"
						value={property.value}
					/>
				) : (
					<span className="text-muted-foreground text-xs tracking-wide">
						{EMPTY_PLACEHOLDER}
					</span>
				)}
			</div>
		</div>
	);
};

type HoverOverlayProps = {
  entryId: string;
};

const HoverOverlay = memo(
	({ entryId }: HoverOverlayProps) => {
    const hoverPropertyId = useConfigValue<BasesPropertyId | undefined>("hoverProperty", undefined);
    const hoverStyle = useConfigValue<"overlay" | "tooltip" | "none">("hoverStyle", "none");

    const property = useEntryProperty(entryId, hoverPropertyId);

		if (hoverStyle === "none" || !property || !property.value) return null;

		if (hoverStyle === "overlay") {
			return (
				<div className="absolute bottom-0 left-0 right-0 bg-popover backdrop-blur-sm p-3 animate-in fade-in slide-in-from-bottom-2 duration-200 border-t border-border">
					<OverlayContent
						property={property}
					/>
				</div>
			);
		}

		// Tooltip style - positioned at top
		return (
			<div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full bg-popover text-popover-foreground rounded-md shadow-lg p-2 max-w-xs animate-in fade-in zoom-in-95 duration-150 z-50">
				<OverlayContent
					property={property}
				/>
				{/* Tooltip arrow */}
				<div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-8 border-transparent border-t-popover" />
			</div>
		);
	},
);

HoverOverlay.displayName = "HoverOverlay";

export default HoverOverlay;
