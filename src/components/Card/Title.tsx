
import { cn } from "@/lib/utils";

import type { CardItem } from "./types";

type Props = {
  layout: "horizontal" | "vertical";
  cardSize: number;
  item: CardItem;
}

const Title = ({ cardSize, item }: Props) => {
  return (
    <h3
      className={cn(
        "font-semibold mt-2 mb-0 line-clamp-1 p-(--input-padding) shrink-0",
        cardSize < 300
          ? "text-base"
          : cardSize < 400
            ? "text-lg"
            : "text-xl",
      )}
    >
      {item.title}
    </h3>
  )
}

export default Title;
