import type { BasesEntry, BasesViewConfig } from "obsidian";
import { useEffect, useState } from "react";

import type { CardConfig } from "@/components/Card/types";

import { useObsidian } from "../Obsidian/Context";
import { DragContainer } from "./DragContainer";
import { VirtualGrid } from "./VirtualGrid";

type Props = {
	items: BasesEntry[];
	cardConfig: CardConfig;
	config: BasesViewConfig;
	masonry?: boolean;
};

const InfiniteDragScrollV2 = ({ items, cardConfig, config, masonry = false }: Props) => {
	const { containerEl } = useObsidian();

	// Cell dimensions
	const cellWidth = cardConfig.cardSize;
	// For polaroid layout, add extra height for borders (10px top + 28px bottom) and content area
	const polaroidExtraHeight = cardConfig.layout === "polaroid" ? 38 + 40 : 0;
	const cellHeight = cardConfig.cardSize * cardConfig.imageAspectRatio + polaroidExtraHeight;
	const gap = cardConfig.cardSize / 2;
	const gapX = gap;
	const gapY = gap;

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
					cardConfig={cardConfig}
					config={config}
					columns={columns}
					cellWidth={cellWidth}
					cellHeight={cellHeight}
					gapX={gapX}
					gapY={gapY}
					scrollPosition={scrollPos}
					viewportWidth={viewportDimensions.width}
					viewportHeight={viewportDimensions.height}
					masonry={masonry}
				/>
			)}
		</DragContainer>
	);
};

export default InfiniteDragScrollV2;
