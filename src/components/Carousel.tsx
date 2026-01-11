import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useAnimation } from "motion/react";
import type { BasesEntry } from "obsidian";
import { type ComponentType, forwardRef, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type Props = {
	title?: string;
	subtitle?: string;
	items: BasesEntry[];
	component: ComponentType<{
		className?: string;
		entryId: string;
	}>;
	minItemWidth?: number;
	minItemHeight?: number;
};

const Carousel = forwardRef<HTMLDivElement, Props>(
	({
    minItemWidth = 240,
    minItemHeight = 320,
    component: Component,
    title,
    subtitle,
    items
  }, ref) => {
		const controls = useAnimation();
		const carouselRef = useRef<HTMLDivElement>(null);
		const [isAtStart, setIsAtStart] = useState(true);
		const [isAtEnd, setIsAtEnd] = useState(false);

		// Function to scroll the carousel
		const scroll = (direction: "left" | "right") => {
			if (carouselRef.current) {
				const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
				const scrollAmount = clientWidth * 0.8; // Scroll by 80% of the visible width
				const newScrollLeft =
					direction === "left"
						? scrollLeft - scrollAmount
						: scrollLeft + scrollAmount;

				carouselRef.current.scrollTo({
					left: newScrollLeft,
					behavior: "smooth",
				});
			}
		};

		// Effect to check scroll position and update button states
		useEffect(() => {
			const checkScrollPosition = () => {
				if (carouselRef.current) {
					const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
					setIsAtStart(scrollLeft < 10);
					setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 10);
				}
			};

			const currentRef = carouselRef.current;
			if (currentRef) {
				// Initial check
				checkScrollPosition();
				currentRef.addEventListener("scroll", checkScrollPosition);
			}

			// Check again on window resize
			window.addEventListener("resize", checkScrollPosition);

			return () => {
				if (currentRef) {
					currentRef.removeEventListener("scroll", checkScrollPosition);
				}
				window.removeEventListener("resize", checkScrollPosition);
			};
		}, []);

		return (
			<section
				ref={ref}
				className="w-full py-8"
				aria-labelledby="carousel-title"
			>
				<div className="container mx-auto px-4 md:px-6">
					{/* Header Section */}
					<div className="mb-6 flex items-center justify-between">
						<div>
							{title && (
								<h2
									id="carousel-title"
									className="text-2xl md:text-3xl font-bold tracking-tight text-card-foreground"
								>
									{title}
								</h2>
							)}
							{subtitle && (
								<p className="mt-1 text-muted-foreground">{subtitle}</p>
							)}
						</div>
					</div>

					{/* Carousel Section */}
					<div className="relative">
						<div
							ref={carouselRef}
							className="flex w-full space-x-4 overflow-x-auto pb-4 scrollbar-hide"
						>
							{items.map((item, index) => (
							<motion.div
								key={item.file.path}
								className="shrink-0"
								style={{ width: minItemWidth, height: minItemHeight }}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
							>
                <Component
                  key={item.file.path}
                  entryId={item.file.path}
                  className="mb-3"
                />
							</motion.div>
							))}
						</div>

						{/* Navigation Buttons */}
						{!isAtStart && (
							<button
								type="button"
								onClick={() => scroll("left")}
								className={cn(
									"h-10 w-10 absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/60 backdrop-blur-sm border border-border text-foreground shadow-md transition-opacity hover:bg-background/80 disabled:opacity-0",
								)}
								aria-label="Scroll left"
							>
								<ChevronLeft className="h-6 w-6" />
							</button>
						)}
						{!isAtEnd && (
							<button
								type="button"
								onClick={() => scroll("right")}
								className={cn(
									"h-10 w-10 absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/60 backdrop-blur-sm border border-border text-foreground shadow-md transition-opacity hover:bg-background/80 disabled:opacity-0",
								)}
								aria-label="Scroll right"
							>
								<ChevronRight className="h-6 w-6" />
							</button>
						)}
					</div>
				</div>
			</section>
		);
	},
);

Carousel.displayName = "Carousel";

export default Carousel;
