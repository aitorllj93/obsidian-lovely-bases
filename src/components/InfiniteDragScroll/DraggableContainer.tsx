import { animate, cubicBezier, useMotionValue } from "motion/react";
import { type PointerEvent, type ReactNode, useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { GridVariantContext, ScrollContext } from "./contexts";
import type { variants } from "./types";

type Props = {
	className?: string;
	children: ReactNode;
	variant?: variants;
};

export const DraggableContainer = ({ children, className, variant }: Props) => {
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

	// Refs to track active animations for cancellation
	const animationXRef = useRef<ReturnType<typeof animate> | null>(null);
	const animationYRef = useRef<ReturnType<typeof animate> | null>(null);

	const onPointerDown = useCallback(
		(e: PointerEvent) => {
			// Cancel any active momentum animations
			if (animationXRef.current) {
				animationXRef.current.stop();
				animationXRef.current = null;
			}
			if (animationYRef.current) {
				animationYRef.current.stop();
				animationYRef.current = null;
			}

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

			animationXRef.current = animate(scrollX, targetX, {
				type: "tween",
				duration,
				ease: cubicBezier(0.32, 0.72, 0, 1), // Custom ease similar to iOS momentum
			});
			animationYRef.current = animate(scrollY, targetY, {
				type: "tween",
				duration,
				ease: cubicBezier(0.32, 0.72, 0, 1),
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
					animationXRef.current = animate(scrollX, targetX, {
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
					animationXRef.current = animate(scrollX, targetX, {
						type: "tween",
						duration: 1.2,
						ease: cubicBezier(0.18, 0.71, 0.11, 1),
					});
				}

				// Manejar scroll vertical (puede ser simultáneo con horizontal para scroll diagonal)
				if (hasVerticalDelta) {
					event.preventDefault();
					const targetY = scrollY.get() - event.deltaY * 2.7;
					animationYRef.current = animate(scrollY, targetY, {
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
