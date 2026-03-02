
import { motion } from "motion/react";
import type { BasesEntry, BasesViewConfig } from "obsidian";
import { forwardRef, type MouseEventHandler, useMemo, useRef, useState } from "react";

import type { FacetsConfig } from "@/components/Facets/config";

import { DEFAULTS } from "./constants";
import { getNotebookColors } from "./helpers/get-notebook-colors";
import NotebookCover from "./NotebookCover";
import NotebookFirstPage from "./NotebookFirstPage";
import NotebookPage from "./NotebookPage";
import PageMarker from "./PageMarker";
import type { NotebookColors, PageStyle } from "./types";

type Props = {
	width?: number;
  color?: string;
	colors?: NotebookColors;
	icon?: string;
	title?: string;
	files: BasesEntry[];
	onClick?: MouseEventHandler<HTMLDivElement>;
  facetsConfig: FacetsConfig;
	config: BasesViewConfig;
	padContent?: boolean;
	pageStyle?: PageStyle;
  counterLayoutId?: string;
	iconLayoutId?: string;
	titleLayoutId?: string;
	/** Show a stationery-style sticker with the file count */
	showCounter?: boolean;
  previewFilesAmount?: number;
};

const Notebook = forwardRef<HTMLDivElement, Props>(({
	width = DEFAULTS.width,
  color,
	colors,
	icon,
	files,
	onClick,
	facetsConfig,
	config,
	padContent = DEFAULTS.padContent,
	pageStyle = DEFAULTS.pageStyle,
	title,
  showCounter = DEFAULTS.showCounter,
  counterLayoutId,
	iconLayoutId,
	titleLayoutId,
  previewFilesAmount = DEFAULTS.previewFilesAmount,
}, ref) => {
	const [isHovered, setIsHovered] = useState(false);
	const [hoveredPageIndex, setHoveredPageIndex] = useState<number | null>(null);
	const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

	const scaleFactor = width / DEFAULTS.width;
	const height = width / DEFAULTS.aspectRatio;

	const notebookColors = useMemo(() => {
		if (colors) {
			return colors;
		}

		return getNotebookColors(color);
	}, [color, colors]);


  const titleFont = facetsConfig.groupTitleFont ?? facetsConfig.titleFont ?? 'var(--font-serif)';

	const previewFiles = files.slice(0, previewFilesAmount);

	// Reset cardRefs array when files change to prevent memory leaks
	if (cardRefs.current.length !== previewFiles.length) {
		cardRefs.current = new Array(previewFiles.length).fill(null);
	}

	return (
		<div
      ref={ref}
			className="cursor-pointer relative flex items-center justify-center"
			style={{
				width,
				height,
				perspective: 800,
			}}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onClick={onClick}
		>
			{/* Notebook container with tilt animation */}
			<motion.div
				className="relative"
				style={{
					width,
					height,
					transformOrigin: "left center",
				}}
        animate={{
          rotateZ: isHovered ? -10 : 0,
        }}
        transition={{
          rotateZ: {
            duration: isHovered ? 0.5 : 0.4,
            ease: isHovered
              ? [0.34, 1.56, 0.64, 1]  // con overshoot
              : [0.25, 0.46, 0.45, 0.94],
          },
        }}
			>
				{/* Notebook page (behind cover) */}
        <NotebookFirstPage
          pageStyle={pageStyle}
          backgroundColor={notebookColors.pageBg}
          patternColor={notebookColors.pagePattern}
          notebookWidth={width}
          notebookHeight={height}
          scaleFactor={scaleFactor}
        />

				{/* Pages container (visible when cover opens) */}
				<div
					className="absolute overflow-visible"
					style={{
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						zIndex: 5,
						clipPath: "inset(-100% -100% -100% 0)",
						pointerEvents: "none",
					}}
				>
					{previewFiles.map((entry, index) => (
						<NotebookPage
							key={entry.file.path}
							ref={(el) => {
								cardRefs.current[index] = el;
							}}
							entry={entry}
							config={config}
							facetsConfig={facetsConfig}
							delay={index * 50}
							isVisible={isHovered}
							index={index}
							scaleFactor={scaleFactor}
							padContent={padContent}
							pageStyle={pageStyle}
							notebookWidth={width}
							notebookHeight={height}
							isPageHovered={hoveredPageIndex === index}
							colors={notebookColors}
							onMouseEnter={() => setHoveredPageIndex(index)}
							onMouseLeave={() => setHoveredPageIndex(null)}
						/>
					))}
				</div>

				{/* Tabs - attached to the right edge of the notebook pages (bottom section) */}
				{previewFiles.map((entry, index) => (
          <PageMarker
            key={entry.file.path}
            entry={entry}
            width={width}
            height={height}
            scaleFactor={scaleFactor}
            index={index}
            notebookColors={notebookColors}
            hoveredPageIndex={hoveredPageIndex}
            isHovered={isHovered}
            setHovered={setHoveredPageIndex}
            totalFiles={previewFiles.length}
          />
        ))}

				{/* Notebook cover (opens on hover) */}
				<NotebookCover
          width={width}
          height={height}
          scaleFactor={scaleFactor}
          notebookColors={notebookColors}
          isHovered={isHovered}
          showCounter={showCounter}
          counterLayoutId={counterLayoutId}
          icon={icon}
          iconLayoutId={iconLayoutId}
          title={title}
          titleLayoutId={titleLayoutId}
          titleFont={titleFont}
          files={files}
        />
			</motion.div>
		</div>
	);
});

Notebook.displayName = "Notebook";

export default Notebook;
