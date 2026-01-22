import type { BasesEntry, BasesPropertyId, BasesViewConfig } from "obsidian";
import { memo } from "react";

import { useObsidian } from "@/components/Obsidian/Context";
import PropertyValue from "@/components/Obsidian/PropertyValue";
import { useEntryProperty } from "@/hooks/use-property";
import { cn } from "@/lib/utils";

import type { CardConfig } from "./types";

const EMPTY_PLACEHOLDER = "—";

type PropertyItemProps = {
  entry: BasesEntry;
	propertyId: BasesPropertyId;
	showPropertyTitles: boolean;
	config: BasesViewConfig;
	isOverlayMode?: boolean;
};

const PropertyItem = memo(
	({ entry, propertyId, showPropertyTitles, config, isOverlayMode }: PropertyItemProps) => {
		const property = useEntryProperty(entry, config, propertyId);
		const { renderContext } = useObsidian().app;

		if (!property) return null;

		return (
			<div className="flex flex-col gap-0.5">
				{showPropertyTitles && (
					<span
						className={cn(
							"font-medium text-xs tracking-wide p-[0_var(--size-4-2)]",
							isOverlayMode ? "text-white/70" : "text-muted-foreground",
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
							className={cn(
								"text-sm line-clamp-3",
								isOverlayMode ? "text-white/90" : "text-foreground",
							)}
							value={property.value}
						/>
					) : (
						<span className={cn(
							"text-xs tracking-wide",
							isOverlayMode ? "text-white/50" : "text-muted-foreground",
						)}>
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

PropertyItem.displayName = "PropertyItem";

type Props = {
  entry: BasesEntry;
  cardConfig: CardConfig;
  config: BasesViewConfig;
  isOverlayMode?: boolean;
};

const PropertyList = memo(
	({ entry, cardConfig, config, isOverlayMode }: Props) => {
		const { properties, showPropertyTitles } = cardConfig;

		return (
			<div className="flex flex-col gap-2 overflow-y-auto">
				{properties.map((property) => {
					return (
						<PropertyItem
							key={property}
							entry={entry}
							propertyId={property}
							showPropertyTitles={showPropertyTitles}
							config={config}
							isOverlayMode={isOverlayMode}
						/>
					);
				})}
			</div>
		);
	},
	(prevProps, nextProps) => {
		return (
			prevProps.entry === nextProps.entry &&
			prevProps.cardConfig === nextProps.cardConfig &&
			prevProps.config === nextProps.config &&
			prevProps.isOverlayMode === nextProps.isOverlayMode
		);
	},
);

PropertyList.displayName = "PropertyList";

export default PropertyList;
