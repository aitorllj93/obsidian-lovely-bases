import type { App } from "obsidian";
import { memo } from "react";

import PropertyValue from "@/components/Obsidian/PropertyValue";
import { cn } from "@/lib/utils";

import type { ItemProperty } from "./types";

const EMPTY_PLACEHOLDER = "—";

type PropertyItemProps = {
	app: App;
	property: ItemProperty;
	showTitle: boolean;
};

const PropertyItem = ({ app, property, showTitle }: PropertyItemProps) => {
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
						renderContext={app.renderContext}
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

type Props = {
	app: App;
	properties: ItemProperty[];
	showTitles: boolean;
};

const PropertyList = memo(
	({ app, properties, showTitles }: Props) => {
		return (
			<div className="flex flex-col gap-2 overflow-y-auto">
				{properties.map((property) => {
					return (
						<PropertyItem
							key={property.id}
							app={app}
							property={property}
							showTitle={showTitles}
						/>
					);
				})}
			</div>
		);
	},
	(prevProps, nextProps) => {
		return (
			prevProps.properties.every((prop, index) => {
				return (
					prop.value.toString() ===
						nextProps.properties[index].value.toString() &&
					prop.displayName === nextProps.properties[index].displayName
				);
			}) &&
			prevProps.showTitles === nextProps.showTitles
		);
	},
);

PropertyList.displayName = "PropertyList";

export default PropertyList;
