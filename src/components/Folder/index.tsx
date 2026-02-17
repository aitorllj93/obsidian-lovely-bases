import { motion } from "motion/react";
import type { BasesEntry, BasesViewConfig } from "obsidian";
import { forwardRef, type MouseEventHandler, useRef, useState } from "react";

import type { FacetsConfig } from "@/components/Facets/config";
import LucideIcon from "@/components/Obsidian/LucideIcon";
import { useTranslation } from "@/lib/i18n";

import FolderCard from "./FolderCard";
import { useFolderColors } from "./hooks/use-folder-colors";

const BASE_WIDTH = 128;
const ASPECT_RATIO = 4 / 3;

type Props = {
	width?: number;
  color?: string;
	colors?: ReturnType<typeof useFolderColors>;
	icon?: string;
	files: BasesEntry[];
	gradient?: string;
	onClick?: MouseEventHandler<HTMLDivElement>;
  showCounter?: boolean;
  title?: string;
  titleFont?: string;
	facetsConfig: FacetsConfig;
	config: BasesViewConfig;
  counterLayoutId?: string;
	iconLayoutId?: string;
	titleLayoutId?: string;
};

const Folder = forwardRef<HTMLDivElement, Props>(({
	width = BASE_WIDTH,
  color,
	colors,
	icon,
	files,
	onClick,
  showCounter = false,
  title,
  titleFont,
	facetsConfig,
	config,
  counterLayoutId,
	iconLayoutId,
	titleLayoutId,
}, ref) => {
  const { t } = useTranslation('common');
	const [isHovered, setIsHovered] = useState(false);
	const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

	const scaleFactor = width / BASE_WIDTH;
	const height = width / ASPECT_RATIO;

	const { backBg, labelBg, tabBg, frontBg, foreground } = useFolderColors(color, colors);

	const previewFiles = files.slice(0, 5);

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
			}}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onClick={onClick}
		>
			<div
				className="absolute rounded-lg shadow-md border border-white/10"
				style={{
					width,
					height,
					background: backBg,
					filter: "brightness(0.9)",
					transformOrigin: "bottom center",
					transform: isHovered
						? "rotateX(-20deg) scaleY(1.05)"
						: "rotateX(0deg) scaleY(1)",
					transition: "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
					zIndex: 10,
				}}
			/>
			<div
				className="absolute rounded-t-md border-t border-x border-white/10 flex justify-end before:absolute before:inset-0 before:bg-black/15 before:content-['']"
				style={{
					width: 48 * scaleFactor,
					height: 16 * scaleFactor,
          paddingInline: 3 * scaleFactor,
          paddingBlock: 1 * scaleFactor,
					background: tabBg,
					top: `calc(50% - ${48 * scaleFactor}px - ${12 * scaleFactor}px)`,
					left: `calc(50% - ${64 * scaleFactor}px + ${16 * scaleFactor}px)`,
					transformOrigin: "bottom center",
					transform: isHovered
						? `rotateX(-30deg) translateY(${-3 * scaleFactor}px)`
						: "rotateX(0deg) translateY(0)",
					transition: "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
					zIndex: 10,
				}}
			>
      {showCounter && (
        <motion.span
          className="absolute font-semibold tracking-tight tabular-nums -rotate-1 justify-end rounded-xs flex"
          layoutId={counterLayoutId}
          style={{
            backgroundColor: labelBg,
            color: foreground,
            textShadow: `0 0.6px 0 var(--color-muted)`,
            paddingInline: 8 * scaleFactor,
            paddingBlock: 1 * scaleFactor,
            fontFamily: titleFont ?? 'var(--font-mono)',
            fontSize: 8 * scaleFactor,
          }}
        >
          {files.length}
        </motion.span>
      )}
      </div>
			<div
				className="absolute"
				style={{
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					zIndex: 20,
				}}
			>
				{previewFiles.map((entry, index) => (
					<FolderCard
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
						totalCount={previewFiles.length}
						scaleFactor={scaleFactor}
					/>
				))}
			</div>
			<div
				className="absolute rounded-lg shadow-lg border border-white/20 flex flex-col items-center justify-center"
				style={{
					width,
					height,
					background: frontBg,
          gap: `${4 * scaleFactor}px`,
					top: `calc(50% - ${48 * scaleFactor}px + ${4 * scaleFactor}px)`,
					transformOrigin: "bottom center",
					transform: isHovered
						? `rotateX(35deg) translateY(${12 * scaleFactor}px)`
						: "rotateX(0deg) translateY(0)",
					transition: "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
					zIndex: 30,
				}}
			>
				{icon && (
					<motion.div layoutId={iconLayoutId} className="size-1/2">
						<LucideIcon
							className="size-full"
							style={{
								color: foreground,
							}}
							name={icon}
						/>
					</motion.div>
				)}
        {typeof title === "string" && (
          <motion.div
            className="rounded-sm shadow-sm border border-border flex items-center justify-center transition-all duration-500"
            style={{
              backgroundColor: labelBg,
              maxWidth: `${80 * scaleFactor}px`,
              padding: `${2 * scaleFactor}px ${12 * scaleFactor}px`,
            }}
            layoutId={titleLayoutId}
            layout="position"
          >
            <motion.span
              className="font-medium line-clamp-1 text-center"
              style={{
                color: foreground,
                fontFamily: titleFont,
                fontSize: `${10 * scaleFactor}px`,
                letterSpacing: "0.01em",
              }}
            >
              {title === "" ? t('ungrouped') : title}
            </motion.span>
          </motion.div>
        )}
			</div>
			<div
				className="absolute rounded-lg overflow-hidden pointer-events-none"
				style={{
					width,
					height,
					top: `calc(50% - ${48 * scaleFactor}px + ${4 * scaleFactor}px)`,
					background:
						"linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 60%)",
					transformOrigin: "bottom center",
					transform: isHovered
						? `rotateX(35deg) translateY(${12 * scaleFactor}px)`
						: "rotateX(0deg) translateY(0)",
					transition: "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
					zIndex: 31,
				}}
			/>
		</div>
	);
});

export default Folder;
