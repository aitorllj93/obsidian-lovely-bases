
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

	const [viewportWidth, setViewportWidth] = useState(
		typeof window !== "undefined" ? window.innerWidth : 1920,
	);
	const [viewportHeight, setViewportHeight] = useState(
		typeof window !== "undefined" ? window.innerHeight : 1080,
	);

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
					lastUpdateRef.current = Date.now();
					forceUpdate((n) => n + 1);
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
			unsubscribeX();
			unsubscribeY();
			if (rafRef.current) {
				cancelAnimationFrame(rafRef.current);
			}
		};
	}, [scrollContext]);

	// Update viewport dimensions
	useEffect(() => {
		const updateViewport = () => {
			setViewportWidth(window.innerWidth);
			setViewportHeight(window.innerHeight);
		};

		updateViewport();
		window.addEventListener("resize", updateViewport);
		return () => window.removeEventListener("resize", updateViewport);
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
