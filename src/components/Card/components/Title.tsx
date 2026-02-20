import { memo } from "react";

import type { FacetsConfig } from "@/components/Facets/config";
import { cn } from "@/lib/utils";


type Props = Pick<FacetsConfig,
  'cardAdaptToSize'|
  'layoutItemSize' |
  'titleFont' |
  'titlePosition'> & {
  title: string;
};

const PureTitle = ({
  cardAdaptToSize,
  layoutItemSize,
  title,
  titleFont,
  titlePosition,
}: Props) => {
  if (titlePosition !== 'inside') return null;

  return (
    <h3
      className={cn(
        "font-semibold m-0 line-clamp-1 shrink-0",
        !cardAdaptToSize &&
          (layoutItemSize < 300
            ? "text-base"
            : layoutItemSize < 400
              ? "text-lg"
              : "text-xl"),
        cardAdaptToSize &&
          "@[0px]/lovely-card:text-3xs @7xs/lovely-card:text-2xs @6xs/lovely-card:text-xs @5xs/lovely-card:text-sm @4xs/lovely-card:text-base @2xs/lovely-card:text-lg @sm/lovely-card:text-xl",
      )}
      style={{
        fontFamily: titleFont,
      }}
    >
      {title}
    </h3>
  );
};

const Title = memo(PureTitle);

Title.displayName = "Title";

export default Title;
