import type { BasesEntry, BasesPropertyId, BasesViewConfig } from "obsidian";
import { memo } from "react";


import PropertyValue from "@/components/Obsidian/PropertyValue";
import { useApp } from "@/contexts/app";
import { useEntryProperty } from "@/hooks/use-property";
import { cn } from "@/lib/utils";

import type { CardConfig } from "./types";

const EMPTY_PLACEHOLDER = "—";

type PropertyItemProps = {
  entry: BasesEntry;
	propertyId: BasesPropertyId;
	showPropertyTitles: boolean;
	config: BasesViewConfig;
};

const PropertyItem = memo(
	({ entry, propertyId, showPropertyTitles, config }: PropertyItemProps) => {
		const property = useEntryProperty(entry, config, propertyId);
		const renderContext = useApp().renderContext;

		if (!property) return null;

		return (
			<div className="flex flex-col gap-0.5">
				{showPropertyTitles && (
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
							className="text-foreground text-sm line-clamp-3"
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
	},
	(prevProps, nextProps) =>
		prevProps.entry === nextProps.entry &&
		prevProps.propertyId === nextProps.propertyId &&
		prevProps.showPropertyTitles === nextProps.showPropertyTitles &&
		prevProps.config === nextProps.config,
);

PropertyItem.displayName = "PropertyItem";

type Props = {
  entry: BasesEntry;
  cardConfig: CardConfig;
  config: BasesViewConfig;
};

const PropertyList = memo(
	({ entry, cardConfig, config }: Props) => {
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
			prevProps.config === nextProps.config
		);
	},
);

PropertyList.displayName = "PropertyList";

export default PropertyList;
