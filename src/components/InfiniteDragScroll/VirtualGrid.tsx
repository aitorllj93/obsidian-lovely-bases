
import type { BasesEntry } from "obsidian";
import { useContext, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { GridVariantContext, ScrollContext } from "./contexts";
import { useVirtualGrid } from "./hooks/use-virtual-grid";
import ItemContent, { type ItemConfig } from "./ItemContent";
import VirtualGridItem from "./VirtualGridItem";


type VirtualGridProps = {
	items: BasesEntry[];
  itemConfig: ItemConfig;
	columns: number;
	cellWidth: number;
	cellHeight: number;
	gapX: number;
	gapY: number;
	className?: string;
};

export const VirtualGrid = ({
	items,
  itemConfig,
	columns,
	cellWidth,
	cellHeight,
	gapX,
	gapY,
	className,
}: VirtualGridProps) => {
	const scrollContext = useContext(ScrollContext);
	const variant = useContext(GridVariantContext);
	const containerRef = useRef<HTMLDivElement>(null);

	// Use refs to track scroll position without causing re-renders on every frame
	const scrollXRef = useRef(0);
	const scrollYRef = useRef(0);
	const [, forceUpdate] = useState(0);
	const rafRef = useRef<number | null>(null);
	const lastUpdateRef = useRef(0);
	const isMountedRef = useRef(true);

	const [viewportWidth, setViewportWidth] = useState(0);
	const [viewportHeight, setViewportHeight] = useState(0);

	// Subscribe to scroll changes with throttling
	useEffect(() => {
		if (!scrollContext) return;

		const scheduleUpdate = () => {
			const now = Date.now();
			// Throttle updates to ~60fps max
			if (now - lastUpdateRef.current > 8) {
				lastUpdateRef.current = now;
				forceUpdate((n) => n + 1);
			} else if (!rafRef.current) {
				rafRef.current = requestAnimationFrame(() => {
					rafRef.current = null;
					if (isMountedRef.current) {
						lastUpdateRef.current = Date.now();
						forceUpdate((n) => n + 1);
					}
				});
			}
		};

		const unsubscribeX = scrollContext.scrollX.on("change", (latest) => {
			scrollXRef.current = latest;
			scheduleUpdate();
		});

		const unsubscribeY = scrollContext.scrollY.on("change", (latest) => {
			scrollYRef.current = latest;
			scheduleUpdate();
		});

		return () => {
			isMountedRef.current = false;
			unsubscribeX();
			unsubscribeY();
			if (rafRef.current) {
				cancelAnimationFrame(rafRef.current);
			}
		};
	}, [scrollContext]);

	// Update viewport dimensions based on container size
	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const updateViewport = () => {
			setViewportWidth(container.clientWidth);
			setViewportHeight(container.clientHeight);
		};

		// Initial update
		updateViewport();

		// Use ResizeObserver to react to container size changes
		const resizeObserver = new ResizeObserver(() => {
			updateViewport();
		});

		resizeObserver.observe(container);

		return () => {
			resizeObserver.disconnect();
		};
	}, []);

	// Calculate visible items using current ref values
	const visibleItems = useVirtualGrid({
		totalItems: items.length,
		columns,
		cellWidth,
		cellHeight,
		gapX,
		gapY,
		scrollX: scrollXRef.current,
		scrollY: scrollYRef.current,
		viewportWidth,
		viewportHeight,
		variant,
		buffer: 3,
	});

	if (!scrollContext) return null;

	return (
		<div ref={containerRef} className={cn("absolute inset-0", className)}>
			{visibleItems.map(({ key, realIndex, baseX, baseY }) => (
				<VirtualGridItem
					key={key}
					scrollX={scrollContext.scrollX}
					scrollY={scrollContext.scrollY}
					baseX={baseX}
					baseY={baseY}
					width={cellWidth}
					height={cellHeight}
				>
					<ItemContent
						item={items[realIndex]}
						tabIndex={realIndex === 0 ? 0 : undefined}
            {...itemConfig}
					/>
				</VirtualGridItem>
			))}
		</div>
	);
};
