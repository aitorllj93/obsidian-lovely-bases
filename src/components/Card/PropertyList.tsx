import type { BasesPropertyId } from "obsidian";
import { memo } from "react";


import PropertyValue from "@/components/Obsidian/PropertyValue";
import { useApp } from "@/contexts/app";
import { useConfigOrder } from "@/hooks/use-config-order";
import { useConfigValue } from "@/hooks/use-config-value";
import { useEntryProperty } from "@/hooks/use-property";
import { cn } from "@/lib/utils";

const EMPTY_PLACEHOLDER = "—";

type PropertyItemProps = {
  entryId: string;
	propertyId: BasesPropertyId;
};

const PropertyItem = ({ entryId, propertyId }: PropertyItemProps) => {
  const property = useEntryProperty(entryId, propertyId);
  const showTitle = useConfigValue<boolean>("showPropertyTitles", true);
  const renderContext = useApp().renderContext;

  if (!property) return null;

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

type Props = {
  entryId: string;
};

const PropertyList = memo(
	({ entryId }: Props) => {

    const configOrder = useConfigOrder();

		return (
			<div className="flex flex-col gap-2 overflow-y-auto">
				{configOrder.map((property) => {
					return (
						<PropertyItem
              key={property}
              entryId={entryId}
              propertyId={property}
						/>
					);
				})}
			</div>
		);
	},
	(prevProps, nextProps) => {
		return prevProps.entryId === nextProps.entryId;
	},
);

PropertyList.displayName = "PropertyList";

export default PropertyList;
