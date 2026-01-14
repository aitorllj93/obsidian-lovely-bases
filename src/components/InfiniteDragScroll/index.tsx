import type { BasesEntry } from "obsidian";

import { useObsidian } from "../Obsidian/Context";
import { DraggableContainer } from "./DraggableContainer"
import type { ItemConfig } from "./ItemContent";
import { VirtualGrid } from "./VirtualGrid";

type Props = {
  items: BasesEntry[];
  itemConfig: ItemConfig;
  variant: "default" | "masonry" | "polaroid";
}

const InfiniteDragScroll = ({
  items,
  itemConfig,
  variant
}: Props) => {
  const { containerEl } = useObsidian();

  // Cell dimensions matching original Tailwind classes
	// w-36 = 144px, h-54 = 216px (mobile)
	// md:w-64 = 256px, md:h-96 = 384px (desktop)
	// gap-x-14 = 56px (mobile), md:gap-x-28 = 112px (desktop)
	const cellWidth = itemConfig.cardSize;
	const cellHeight = itemConfig.cardSize * itemConfig.aspectRatio;
	const gapX = itemConfig.cardSize / 2;
	const gapY = 0; // Masonry doesn't use vertical gap, uses offset instead
	const columns = Math.floor(containerEl.clientWidth / cellWidth);

  return (
			<DraggableContainer variant={variant}>
        <VirtualGrid
          items={items}
          itemConfig={itemConfig}
          columns={columns}
          cellWidth={cellWidth}
          cellHeight={cellHeight}
          gapX={gapX}
          gapY={gapY}
        />
    </DraggableContainer>
  );
};

export default InfiniteDragScroll;
