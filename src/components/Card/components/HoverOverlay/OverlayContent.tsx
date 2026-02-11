import { useObsidian } from "@/components/Obsidian/Context";
import PropertyValue from "@/components/Obsidian/PropertyValue";
import type { Property } from "@/lib/obsidian/entry";
import { cn } from "@/lib/utils";

const EMPTY_PLACEHOLDER = "—";

type Props = {
  property: Property;
  showPropertyTitles: boolean;
};

const OverlayContent = ({ property, showPropertyTitles }: Props) => {
  const { renderContext } = useObsidian().app;

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

export default OverlayContent;
