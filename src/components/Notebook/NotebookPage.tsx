import type { BasesEntry, BasesViewConfig } from "obsidian";
import { forwardRef, type MouseEventHandler, useMemo } from "react";

import Card from "@/components/Card";
import type { FacetsConfig } from "@/components/Facets/config";

import { getPageDimensions } from "./helpers/get-page-dimensions";
import { getPageEffects } from "./helpers/get-page-effects";
import { getPagePattern } from "./helpers/get-page-pattern";

import type { NotebookColors, PageStyle } from "./types";

type Props = {
	entry: BasesEntry;
	config: BasesViewConfig;
	facetsConfig: FacetsConfig;
	delay: number;
	isVisible: boolean;
	index: number;
	onClick?: MouseEventHandler<HTMLDivElement>;
	backgroundColor?: string;
	scaleFactor?: number;
  padContent?: boolean;
	pageStyle: PageStyle;
	notebookWidth: number;
	notebookHeight: number;
	isPageHovered: boolean;
	colors: NotebookColors;
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
};

const NotebookPage = forwardRef<HTMLDivElement, Props>(
	(
		{
			entry,
			config,
			facetsConfig,
			delay,
			isVisible,
			index,
			scaleFactor = 1,
      padContent = true,
			pageStyle,
			notebookWidth,
			notebookHeight,
			isPageHovered,
			colors,
			onMouseEnter,
			onMouseLeave,
		},
		ref,
	) => {
    const dimensions = useMemo(() => getPageDimensions(notebookWidth, notebookHeight, scaleFactor, padContent), [notebookWidth, notebookHeight, scaleFactor, padContent]);
    const pageEffects = useMemo(() => getPageEffects({ isPadded: padContent, notebookHeight, delay, isVisible, isHovered: isPageHovered }), [padContent, notebookHeight, delay, isVisible, isPageHovered]);
    const pagePattern = useMemo(() => padContent ? getPagePattern({ pageStyle, backgroundColor: colors.pageBg, patternColor: colors.pagePattern }) : undefined, [padContent, pageStyle, colors.pageBg, colors.pagePattern]);

		return (
			<div
				ref={ref}
				className="absolute cursor-pointer left-0 transform-3d backface-hidden"
				style={{
					width: dimensions.width,
					height: dimensions.height,
					top: (notebookHeight - dimensions.height) / 2,
					transformOrigin: "center bottom",
					opacity: isPageHovered ? 1 : 0,
					zIndex: isPageHovered ? 50 + index : 10 + index,
					border: padContent ? `1px solid var(--border)` : undefined,
          borderRadius: padContent ? `${2 * scaleFactor}px ${12 * scaleFactor}px ${12 * scaleFactor}px ${2 * scaleFactor}px` : undefined,
					pointerEvents: isPageHovered ? "auto" : "none",
          ...pageEffects,
          ...pagePattern,
				}}
				onClick={(event) => {
          event.stopPropagation();
        }}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
			>
				{/* Page content - fades in as page flips up */}
				<div
					className="absolute inset-0 flex items-center justify-center"
					style={{
						opacity: isPageHovered ? 1 : 0,
						transform: isPageHovered ? "scale(1)" : "scale(0.95)",
						transition: isPageHovered
							? `opacity 250ms ease-out ${delay + 150}ms, transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1) ${delay + 100}ms`
							: `opacity 150ms ease-in, transform 200ms ease-in`,
            padding: dimensions.padding,
          }}
				>
					<Card
						entry={entry}
						config={config}
            {...facetsConfig}
						layoutItemSize={Math.min(dimensions.width, dimensions.height) - dimensions.padding * 2}
						cardAdaptToSize
            titlePosition="inside"
            className="h-auto"
					/>
				</div>
			</div>
		);
	},
);

NotebookPage.displayName = "NotebookPage";

export default NotebookPage;
