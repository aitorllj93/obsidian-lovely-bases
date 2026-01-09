import { cva } from "class-variance-authority";
import {
	animate,
	cubicBezier,
	type MotionValue,
	motion,
	useMotionValue,
	useTransform,
} from "motion/react";
import {
	createContext,
	type MouseEventHandler,
	memo,
	type PointerEvent,
	type PointerEventHandler,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";

import { cn } from "@/lib/utils";

//Types
type variants = "default" | "masonry" | "polaroid";

// Create Contexts
const GridVariantContext = createContext<variants | undefined>(undefined);

type ScrollContextType = {
	scrollX: MotionValue<number>;
	scrollY: MotionValue<number>;
};

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

// Memoized grid item styles outside component
const gridItemStyles = cva(
	"overflow-hidden hover:cursor-pointer w-full h-full",
	{
		variants: {
			variant: {
				default: "rounded-sm",
				masonry: "rounded-sm",
				polaroid:
					"border-10 border-b-28 border-card shadow-xl even:rotate-3 odd:-rotate-2 hover:rotate-0 transition-transform ease-out duration-300",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

// Helper function to wrap index to valid range
const wrapIndex = (index: number, total: number): number => {
	if (total === 0) return 0;
	return ((index % total) + total) % total;
};

// Hook to calculate visible items in virtual grid
type VirtualItem = {
	virtualCol: number;
	virtualRow: number;
	realIndex: number;
	baseX: number; // Grid position without scroll offset
	baseY: number; // Grid position without scroll offset
	key: string;
};

type UseVirtualGridParams = {
	totalItems: number;
	columns: number;
	cellWidth: number;
	cellHeight: number;
	gapX: number;
	gapY: number;
	scrollX: number;
	scrollY: number;
	viewportWidth: number;
	viewportHeight: number;
	variant?: variants;
	buffer?: number;
};

const useVirtualGrid = ({
	totalItems,
	columns,
	cellWidth,
	cellHeight,
	gapX,
	gapY,
	scrollX,
	scrollY,
	viewportWidth,
	viewportHeight,
	variant,
	buffer = 2,
}: UseVirtualGridParams): VirtualItem[] => {
	return useMemo(() => {
		if (totalItems === 0 || viewportWidth === 0 || viewportHeight === 0)
			return [];

		// Cell spacing including gap
		const cellSpacingX = cellWidth + gapX;
		const cellSpacingY = cellHeight + gapY;

		// For masonry, account for the offset
		const masonryOffset =
			variant === "masonry" || variant === "polaroid" ? cellHeight * 0.6 : 0;
		const effectiveCellSpacingY =
			cellSpacingY + (masonryOffset > 0 ? masonryOffset / 2 : 0);

		// Calculate visible range of columns (infinite in both directions)
		const startCol = Math.floor(-scrollX / cellSpacingX) - buffer;
		const endCol =
			Math.ceil((-scrollX + viewportWidth) / cellSpacingX) + buffer;

		// Calculate visible range of rows (infinite in both directions)
		const startRow = Math.floor(-scrollY / effectiveCellSpacingY) - buffer;
		const endRow =
			Math.ceil((-scrollY + viewportHeight) / effectiveCellSpacingY) + buffer;

		const visibleItems: VirtualItem[] = [];

		// Iterate through ALL visible columns and rows (infinite grid)
		for (let virtualRow = startRow; virtualRow <= endRow; virtualRow++) {
			for (let virtualCol = startCol; virtualCol <= endCol; virtualCol++) {
				// Wrap column to [0, columns-1] for index calculation
				const wrappedCol = wrapIndex(virtualCol, columns);

				// Calculate the virtual index in the infinite grid
				const virtualIndex = virtualRow * columns + wrappedCol;
				const realIndex = wrapIndex(virtualIndex, totalItems);

				// Calculate position in grid coordinates
				const gridX = virtualCol * cellSpacingX;
				let gridY = virtualRow * effectiveCellSpacingY;

				// Apply masonry offset for columns with even wrapped index
				if (
					(variant === "masonry" || variant === "polaroid") &&
					wrappedCol % 2 === 0
				) {
					gridY += masonryOffset;
				}

				// Store base grid position (without scroll offset)
				// The scroll offset will be applied reactively via useTransform
				visibleItems.push({
					virtualCol,
					virtualRow,
					realIndex,
					baseX: gridX,
					baseY: gridY,
					key: `${virtualCol}-${virtualRow}`,
				});
			}
		}

		return visibleItems;
	}, [
		totalItems,
		columns,
		cellWidth,
		cellHeight,
		gapX,
		gapY,
		scrollX,
		scrollY,
		viewportWidth,
		viewportHeight,
		variant,
		buffer,
	]);
};

export const DraggableContainer = ({
	className,
	children,
	variant,
}: {
	className?: string;
	children: ReactNode;
	variant?: variants;
}) => {
	const containerRef = useRef<HTMLDivElement | null>(null);

	const scrollX = useMotionValue(0);
	const scrollY = useMotionValue(0);

	const [isDragging, setIsDragging] = useState(false);

	// For tracking drag velocity
	const dragState = useRef({
		startX: 0,
		startY: 0,
		startScrollX: 0,
		startScrollY: 0,
		lastX: 0,
		lastY: 0,
		lastTime: 0,
		velocityX: 0,
		velocityY: 0,
	});

	const onPointerDown = useCallback(
		(e: PointerEvent) => {
			setIsDragging(true);
			const state = dragState.current;
			state.startX = e.clientX;
			state.startY = e.clientY;
			state.startScrollX = scrollX.get();
			state.startScrollY = scrollY.get();
			state.lastX = e.clientX;
			state.lastY = e.clientY;
			state.lastTime = Date.now();
			state.velocityX = 0;
			state.velocityY = 0;
			(e.target as HTMLElement).setPointerCapture(e.pointerId);
		},
		[scrollX, scrollY],
	);

	const onPointerMove = useCallback(
		(e: PointerEvent) => {
			if (!isDragging) return;

			const state = dragState.current;
			const now = Date.now();
			const dt = now - state.lastTime;

			const currentX = state.startScrollX + (e.clientX - state.startX);
			const currentY = state.startScrollY + (e.clientY - state.startY);

			// Calculate velocity (pixels per second)
			if (dt > 0) {
				const instantVelX = ((e.clientX - state.lastX) / dt) * 1000;
				const instantVelY = ((e.clientY - state.lastY) / dt) * 1000;

				// Time-dependent smoothing factor
				// Decays faster with longer intervals between events
				const smoothingFactor = Math.min(dt / 100, 1);
				const alpha = 0.3 + 0.4 * smoothingFactor;

				state.velocityX = state.velocityX * (1 - alpha) + instantVelX * alpha;
				state.velocityY = state.velocityY * (1 - alpha) + instantVelY * alpha;
			}

			state.lastX = e.clientX;
			state.lastY = e.clientY;
			state.lastTime = now;

			scrollX.set(currentX);
			scrollY.set(currentY);
		},
		[isDragging, scrollX, scrollY],
	);

	const onPointerUp = useCallback(
		(e: PointerEvent) => {
			if (!isDragging) return;
			setIsDragging(false);
			(e.target as HTMLElement).releasePointerCapture(e.pointerId);

			const state = dragState.current;
			const now = Date.now();
			const timeSinceLastMove = now - state.lastTime;

			// Decay velocity if user paused before releasing
			// After ~150ms of no movement, velocity should be near zero
			const decayFactor = Math.exp(-timeSinceLastMove / 50);
			const velocityX = state.velocityX * decayFactor;
			const velocityY = state.velocityY * decayFactor;

			const currentX = scrollX.get();
			const currentY = scrollY.get();

			// Apply momentum using same physics as original:
			// timeConstant: 200, power: 0.28
			// Motion's formula: target = current + velocity * power * timeConstant / 1000
			const timeConstant = 200;
			const power = 0.28;
			const momentumFactor = (power * timeConstant) / 1000;

			const targetX = currentX + velocityX * momentumFactor;
			const targetY = currentY + velocityY * momentumFactor;

			// Animate with deceleration curve
			// Duration based on velocity magnitude
			const velocityMag = Math.sqrt(velocityX ** 2 + velocityY ** 2);

			// Don't animate if velocity is negligible
			if (velocityMag < 50) return;

			const duration = Math.min(Math.max(velocityMag / 1000, 0.3), 1.2);

			animate(scrollX, targetX, {
				type: "tween",
				duration,
				ease: [0.32, 0.72, 0, 1], // Custom ease similar to iOS momentum
			});
			animate(scrollY, targetY, {
				type: "tween",
				duration,
				ease: [0.32, 0.72, 0, 1],
			});
		},
		[isDragging, scrollX, scrollY],
	);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const handleWheelScroll = (event: WheelEvent) => {
			if (!isDragging) {
				const absDeltaX = Math.abs(event.deltaX);
				const absDeltaY = Math.abs(event.deltaY);
				const hasHorizontalDelta = absDeltaX > 0;
				const hasVerticalDelta = absDeltaY > 0;

				// Si Shift está presionado, convertir scroll vertical en horizontal
				if (event.shiftKey && hasVerticalDelta && !hasHorizontalDelta) {
					event.preventDefault();
					const targetX = scrollX.get() - event.deltaY * 2.7;
					animate(scrollX, targetX, {
						type: "tween",
						duration: 1.2,
						ease: cubicBezier(0.18, 0.71, 0.11, 1),
					});
					return;
				}

				// Manejar scroll horizontal (trackpad o diagonal)
				if (hasHorizontalDelta) {
					event.preventDefault();
					const targetX = scrollX.get() - event.deltaX * 2.7;
					animate(scrollX, targetX, {
						type: "tween",
						duration: 1.2,
						ease: cubicBezier(0.18, 0.71, 0.11, 1),
					});
				}

				// Manejar scroll vertical (puede ser simultáneo con horizontal para scroll diagonal)
				if (hasVerticalDelta) {
					const targetY = scrollY.get() - event.deltaY * 2.7;
					animate(scrollY, targetY, {
						type: "tween",
						duration: 1.2,
						ease: cubicBezier(0.18, 0.71, 0.11, 1),
					});
				}
			}
		};

		container.addEventListener("wheel", handleWheelScroll, { passive: false });
		return () => {
			container.removeEventListener("wheel", handleWheelScroll);
		};
	}, [scrollX, scrollY, isDragging]);

	return (
		<GridVariantContext.Provider value={variant}>
			<ScrollContext.Provider value={{ scrollX, scrollY }}>
				<div
					ref={containerRef}
					className={cn(
						"h-dvh w-full overflow-hidden relative cursor-grab active:cursor-grabbing touch-none select-none",
						className,
					)}
					onPointerDown={onPointerDown}
					onPointerMove={onPointerMove}
					onPointerUp={onPointerUp}
					onPointerCancel={onPointerUp}
					onPointerLeave={onPointerUp}
				>
					{/* Content layer */}
					<div className="absolute inset-0 pointer-events-none">{children}</div>
				</div>
			</ScrollContext.Provider>
		</GridVariantContext.Provider>
	);
};

export const GridItem = memo(
	({
		children,
		className,
		onPointerDown,
		onClick,
		onMouseOver,
	}: {
		children: ReactNode;
		className?: string;
		onPointerDown?: PointerEventHandler;
		onClick?: MouseEventHandler;
		onMouseOver?: MouseEventHandler;
	}) => {
		const variant = useContext(GridVariantContext);

		return (
			<div
				className={cn(gridItemStyles({ variant }), className)}
				onPointerDown={onPointerDown}
				onClick={onClick}
				onMouseOver={onMouseOver}
			>
				{children}
			</div>
		);
	},
);

GridItem.displayName = "GridItem";

// Component that uses useTransform for reactive positioning without re-renders
type VirtualGridItemWrapperProps = {
	scrollX: MotionValue<number>;
	scrollY: MotionValue<number>;
	baseX: number;
	baseY: number;
	width: number;
	height: number;
	children: ReactNode;
};

const VirtualGridItemWrapper = memo(
	({
		scrollX,
		scrollY,
		baseX,
		baseY,
		width,
		height,
		children,
	}: VirtualGridItemWrapperProps) => {
		// These transforms update reactively without causing React re-renders
		const x = useTransform(scrollX, (sx) => baseX + sx);
		const y = useTransform(scrollY, (sy) => baseY + sy);

		return (
			<motion.div
				className="pointer-events-auto"
				style={{
					position: "absolute",
					x,
					y,
					width,
					height,
					willChange: "transform",
				}}
			>
				{children}
			</motion.div>
		);
	},
);

VirtualGridItemWrapper.displayName = "VirtualGridItemWrapper";

type VirtualGridProps<T> = {
	items: T[];
	columns: number;
	cellWidth: number;
	cellHeight: number;
	gapX: number;
	gapY: number;
	renderItem: (item: T, index: number) => ReactNode;
	className?: string;
};

export const VirtualGrid = <T,>({
	items,
	columns,
	cellWidth,
	cellHeight,
	gapX,
	gapY,
	renderItem,
	className,
}: VirtualGridProps<T>) => {
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
				<VirtualGridItemWrapper
					key={key}
					scrollX={scrollContext.scrollX}
					scrollY={scrollContext.scrollY}
					baseX={baseX}
					baseY={baseY}
					width={cellWidth}
					height={cellHeight}
				>
					{renderItem(items[realIndex], realIndex)}
				</VirtualGridItemWrapper>
			))}
		</div>
	);
};

// Keep GridBody for backward compatibility
export const GridBody = memo(
	({ children, className }: { children: ReactNode; className?: string }) => {
		const variant = useContext(GridVariantContext);

		const gridBodyStyles = cva("grid grid-cols-[repeat(6,1fr)] h-fit w-fit", {
			variants: {
				variant: {
					default: "gap-14 p-7 md:gap-28 md:p-14",
					masonry: "gap-x-14 px-7 md:gap-x-28 md:px-14",
					polaroid: "gap-x-14 px-7 md:gap-x-28 md:px-14",
				},
			},
			defaultVariants: {
				variant: "default",
			},
		});

		return (
			<>
				{Array.from({ length: 4 }).map((_, index) => (
					<div
						key={`grid-body-${index.toString()}`}
						className={cn(gridBodyStyles({ variant, className }))}
					>
						{children}
					</div>
				))}
			</>
		);
	},
);

GridBody.displayName = "GridBody";
