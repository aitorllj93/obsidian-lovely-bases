import type { BasesEntry } from "obsidian";
import { useEffect, useState } from "react";

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
	// gapY is always 0 because masonry/polaroid variants use offset-based positioning
	// instead of uniform vertical gaps. Keeping it as a prop maintains flexibility
	// for potential future variants that might need vertical spacing.
	const gapY = 0;

	// Calculate columns reactively based on container width
	// Formula: (width + gapX) / (cellWidth + gapX) to account for gaps between items
	const [columns, setColumns] = useState(() => {
		if (!containerEl) return 1;
		const width = containerEl.clientWidth;
		const calculatedColumns = Math.floor((width + gapX) / (cellWidth + gapX));
		return Math.max(1, calculatedColumns);
	});

	// Update columns when container size changes
	useEffect(() => {
		if (!containerEl) return;

		const updateColumns = () => {
			const width = containerEl.clientWidth;
			const calculatedColumns = Math.floor((width + gapX) / (cellWidth + gapX));
			setColumns(Math.max(1, calculatedColumns));
		};

		// Initial calculation
		updateColumns();

		// Use ResizeObserver to react to container size changes
		const resizeObserver = new ResizeObserver(() => {
			updateColumns();
		});

		resizeObserver.observe(containerEl);

		return () => {
			resizeObserver.disconnect();
		};
	}, [containerEl, cellWidth, gapX]);

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
