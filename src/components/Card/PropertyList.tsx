import type { App } from "obsidian";
import { memo } from "react";

import PropertyValue from "@/components/Obsidian/PropertyValue";
import { cn } from "@/lib/utils";

import type { ItemProperty } from "./types";

type PropertyListProps = {
	app: App;
	properties: ItemProperty[];
	showTitles: boolean;
	cardSize: number;
}

  const PropertyList = memo(({ app, properties, showTitles, cardSize }: PropertyListProps) => {
	// Determine text size based on card size
	const textSizeClass = cardSize < 300 ? 'text-xs' : cardSize < 400 ? 'text-sm' : 'text-base';
	const titleSizeClass = cardSize < 300 ? 'text-xs' : cardSize < 400 ? 'text-xs' : 'text-sm';

	return (
	  <div className="flex flex-col gap-2 overflow-y-auto">
		{properties.map(prop => {
		  if (!prop.value) return null;

		  return (
			<div key={prop.id} className="flex flex-col gap-0.5">
			  {showTitles && (
				<span className={cn(
				  "font-medium text-muted-foreground tracking-wide p-[0_var(--size-4-2)]",
				  titleSizeClass
				)}>
				  {prop.displayName}
				</span>
			  )}
			  <div className={cn(
				"p-(--input-padding)",
				textSizeClass
			  )}>
				<PropertyValue
				  renderContext={app.renderContext}
				  as="div"
				  className="text-foreground line-clamp-3"
				  value={prop.value}
				/>
			  </div>
			</div>
		  );
		})}
	  </div>
	);
  }, (prevProps, nextProps) => {
	return prevProps.properties.every((prop, index) => {
	  return prop.value.toString() === nextProps.properties[index].value.toString() &&
		prop.displayName === nextProps.properties[index].displayName
	}) &&
	  prevProps.showTitles === nextProps.showTitles &&
	  prevProps.cardSize === nextProps.cardSize;
  });

  PropertyList.displayName = "PropertyList";

  export default PropertyList;
