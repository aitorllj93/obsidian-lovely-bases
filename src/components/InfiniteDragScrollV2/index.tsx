import type { BasesEntry } from "obsidian";
import { useEffect, useState } from "react";

import { useObsidian } from "../Obsidian/Context";
import { DragContainer } from "./DragContainer";
import type { ItemConfig } from "./ItemContent";
import type { Variants } from "./types";
import { VirtualGrid } from "./VirtualGrid";

type Props = {
	items: BasesEntry[];
	itemConfig: ItemConfig;
	variant: Variants;
};

const InfiniteDragScrollV2 = ({ items, itemConfig, variant }: Props) => {
	const { containerEl } = useObsidian();

	// Cell dimensions
	const cellWidth = itemConfig.cardSize;
	const cellHeight = itemConfig.cardSize * itemConfig.aspectRatio;
	const gapX = itemConfig.cardSize / 2;
	const gapY = 0;

	// Reactive state for layout calculations
	const [columns, setColumns] = useState(1);
	const [viewportDimensions, setViewportDimensions] = useState({ width: 0, height: 0 });

	// Single ResizeObserver for all dimension tracking
	useEffect(() => {
		if (!containerEl) return;

		const updateDimensions = () => {
			const width = containerEl.clientWidth;
			const height = containerEl.clientHeight;

			// Only update if we have valid dimensions
			if (width > 0 && height > 0) {
				// Update viewport dimensions
				setViewportDimensions((prev) => {
					if (prev.width !== width || prev.height !== height) {
						return { width, height };
					}
					return prev;
				});

				// Calculate and update columns
				if (cellWidth > 0) {
					const calculatedColumns = Math.floor((width + gapX) / (cellWidth + gapX));
					const newColumns = Math.max(1, calculatedColumns);
					setColumns((prev) => (prev !== newColumns ? newColumns : prev));
				}
			}
		};

		// Use ResizeObserver for efficient resize tracking
		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				if (entry.contentRect.width > 0 && entry.contentRect.height > 0) {
					updateDimensions();
					break;
				}
			}
		});

		resizeObserver.observe(containerEl);

		// Initial calculation - use requestAnimationFrame to ensure layout is complete
		const rafId = requestAnimationFrame(() => {
			updateDimensions();
		});

		return () => {
			cancelAnimationFrame(rafId);
			resizeObserver.disconnect();
		};
	}, [containerEl, cellWidth, gapX]);

	return (
		<DragContainer>
			{(scrollPos) => (
				<VirtualGrid
					items={items}
					itemConfig={itemConfig}
					columns={columns}
					cellWidth={cellWidth}
					cellHeight={cellHeight}
					gapX={gapX}
					gapY={gapY}
					scrollPosition={scrollPos}
					variant={variant}
					viewportWidth={viewportDimensions.width}
					viewportHeight={viewportDimensions.height}
				/>
			)}
		</DragContainer>
	);
};

export default InfiniteDragScrollV2;
