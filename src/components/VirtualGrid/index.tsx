import { useVirtualizer } from "@tanstack/react-virtual";
import type { BasesEntry } from "obsidian";
import { type ComponentType, useLayoutEffect, useMemo } from "react";

import { useElementWidth } from "./hooks/use-element-width";

function chunkIntoRows(items: BasesEntry[], columns: number): BasesEntry[][] {
	if (columns <= 0) return [];
	const rows: BasesEntry[][] = [];
	for (let i = 0; i < items.length; i += columns) {
		rows.push(items.slice(i, i + columns));
	}
	return rows;
}

type Props = {
	component: ComponentType<{
		className?: string;
		entryId: string;
	}>;
	items: BasesEntry[];
	minItemWidth?: number;
	gap?: number;
	padding?: number;
	estimateRowHeight?: number;
};

const VirtualGrid = ({
	component: Component,
	items,
	minItemWidth = 240,
	gap = 16,
	padding = 0,
	estimateRowHeight = 320,
}: Props) => {
	const [scrollRef, width] = useElementWidth<HTMLDivElement>();

	const columnCount = useMemo(() => {
		const inner = Math.max(0, width - padding * 2);
		if (inner === 0) return 1;
		return Math.max(1, Math.floor((inner + gap) / (minItemWidth + gap)));
	}, [width, padding, gap, minItemWidth]);

	const rows = useMemo(
		() => chunkIntoRows(items, columnCount),
		[items, columnCount],
	);

	const virtualizer = useVirtualizer({
		count: rows.length,
		getScrollElement: () => scrollRef.current,
		estimateSize: () => estimateRowHeight,
		overscan: 6,
		gap,
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: needed to measure the height of the rows
	useLayoutEffect(() => {
		virtualizer.measure();
	}, [columnCount, virtualizer]);

	return (
		<div
			ref={scrollRef}
			style={{
				height: "100%",
				overflow: "auto",
				opacity: width === null ? 0 : 1,
				padding,
			}}
		>
			<div
				style={{
					height: virtualizer.getTotalSize(),
					position: "relative",
				}}
			>
				{virtualizer.getVirtualItems().map((vRow) => {
					const rowItems = rows[vRow.index] ?? [];

					return (
						<div
							key={vRow.key}
							ref={virtualizer.measureElement}
							data-index={vRow.index}
							style={{
								position: "absolute",
								top: 0,
								left: 0,
								width: "100%",
								transform: `translateY(${vRow.start}px)`,
								display: "grid",
								gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
								gap,
								boxSizing: "border-box",
							}}
						>
							{rowItems.map((item) => (
								<Component
									key={item.file.path}
									entryId={item.file.path}
									className="mb-3"
								/>
							))}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default VirtualGrid;
