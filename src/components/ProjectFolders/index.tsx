import { type ClassValue, clsx } from "clsx";
import type { TFile } from "obsidian";
import type React from "react";
import { forwardRef, type MouseEventHandler, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import Markdown from "@/components/Obsidian/Markdown";
import { desaturate, gradientColors, saturate } from "@/lib/colors";


import LucideIcon from "../LucideIcon";

// --- Utilities ---

/**
 * Combines multiple class names and merges Tailwind classes correctly.
 */
function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// --- Interfaces & Constants ---

export type File = {
	id: string;
	file: TFile;
	image: string;
	title: string;
	onClick?: MouseEventHandler<HTMLDivElement>;
};

// --- Internal Components ---

type FileCardProps = {
	image: string;
  file: TFile;
	title: string;
	delay: number;
	isVisible: boolean;
	index: number;
	totalCount: number;
	onClick: MouseEventHandler<HTMLDivElement>;
	backgroundColor?: string;
};

const FileCard = forwardRef<HTMLDivElement, FileCardProps>(
	(
		{
			image,
      file,
			title,
			delay,
			isVisible,
			index,
			totalCount,
			onClick,
			backgroundColor,
		},
		ref,
	) => {
		const middleIndex = (totalCount - 1) / 2;
		const factor = totalCount > 1 ? (index - middleIndex) / middleIndex : 0;

		const rotation = factor * 25;
		const translationX = factor * 85;
		const translationY = Math.abs(factor) * 12;

		return (
			<div
				ref={ref}
				className={cn("absolute w-20 h-28 cursor-pointer group/card hover:z-90")}
				style={{
					transform: isVisible
						? `translateY(calc(-100px + ${translationY}px)) translateX(${translationX}px) rotate(${rotation}deg) scale(1)`
						: "translateY(0px) translateX(0px) rotate(0deg) scale(0.4)",
					opacity: isVisible ? 1 : 0,
					transition: `all 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
					zIndex: 10 + index,
					left: "-40px",
					top: "-56px",
				}}
				onClick={onClick}
			>
				<div
					className={cn(
						"w-full h-full rounded overflow-hidden shadow-xl border border-border relative drop-shadow-lg",
						"transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
						"group-hover/card:-translate-y-6 group-hover/card:shadow-2xl group-hover/card:shadow-accent/40 group-hover/card:ring-2 group-hover/card:ring-accent group-hover/card:scale-150",
            !backgroundColor && "bg-background",
					)}
          style={{
            backgroundColor,
          }}
				>
					{image ? (
						<img
							src={image}
							alt={title}
							className="w-full h-full object-cover"
						/>
					) : (
						<div className={
              cn(
                "w-full h-full text-[8px] px-[3px]",
                backgroundColor ? "text-white" : "text-foreground",
              )
            }>
              <Markdown maxLength={100} file={file} />
            </div>
					)}
					<div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
					<p className={
            cn(
              "absolute bottom-0 m-0 px-[3px] text-xs truncate drop-shadow-md backdrop-blur-md",
              backgroundColor ? "text-white" : "text-foreground",
            )
          }>
						{title}
					</p>
				</div>
			</div>
		);
	},
);
FileCard.displayName = "FileCard";

interface AnimatedFolderProps {
  colorizeFiles: boolean;
	title: string;
  icon: string | null;
	files: File[];
	className?: string;
	gradient?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const AnimatedFolder: React.FC<AnimatedFolderProps> = ({
  colorizeFiles,
	title,
  icon,
	files,
	className,
	gradient,
  onClick,
}) => {
	const [isHovered, setIsHovered] = useState(false);
	const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

	const previewFiles = files.slice(0, 5);

	const backBg =
		gradient ||
		"linear-gradient(135deg, var(--folder-back) 0%, var(--folder-tab) 100%)";
	const tabBg = gradient || "var(--folder-tab)";
	const frontBg =
		gradient ||
		"linear-gradient(135deg, var(--folder-front) 0%, var(--folder-back) 100%)";

	const colors = gradientColors(gradient);
  const fileColor = saturate(colors[1], 0.2);
  const iconColor = desaturate(colors[0], 0.2);

	return (
		<div
			className={cn(
				"relative flex flex-col items-center justify-center p-8 rounded cursor-pointer bg-card border border-border transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-2xl hover:shadow-accent/20 hover:border-accent/40 group",
				className,
			)}
			style={{
				minWidth: "280px",
				minHeight: "320px",
				perspective: "1200px",
				transform: isHovered
					? "scale(1.04) rotate(-1.5deg)"
					: "scale(1) rotate(0deg)",
			}}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
		>
			<div
				className="absolute inset-0 rounded-2xl transition-opacity duration-700"
				style={{
					background: gradient
						? `radial-gradient(circle at 50% 70%, ${colors?.[0] || "var(--accent)"} 0%, transparent 70%)`
						: "radial-gradient(circle at 50% 70%, var(--accent) 0%, transparent 70%)",
					opacity: isHovered ? 0.12 : 0,
				}}
			/>
			<div
				className="relative flex items-center justify-center mb-4"
				style={{ height: "160px", width: "200px" }}
			>
				<div
					className="absolute w-32 h-24 rounded-lg shadow-md border border-white/10"
					style={{
						background: backBg,
						filter: gradient ? "brightness(0.9)" : "none",
						transformOrigin: "bottom center",
						transform: isHovered
							? "rotateX(-20deg) scaleY(1.05)"
							: "rotateX(0deg) scaleY(1)",
						transition: "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
						zIndex: 10,
					}}
				/>
				<div
					className="absolute w-12 h-4 rounded-t-md border-t border-x border-white/10"
					style={{
						background: tabBg,
						filter: gradient ? "brightness(0.85)" : "none",
						top: "calc(50% - 48px - 12px)",
						left: "calc(50% - 64px + 16px)",
						transformOrigin: "bottom center",
						transform: isHovered
							? "rotateX(-30deg) translateY(-3px)"
							: "rotateX(0deg) translateY(0)",
						transition: "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
						zIndex: 10,
					}}
				/>
				<div
					className="absolute"
					style={{
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						zIndex: 20,
					}}
				>
					{previewFiles.map((file, index) => (
						<FileCard
							backgroundColor={colorizeFiles ? fileColor : undefined}
							key={file.id}
							ref={(el) => {
								cardRefs.current[index] = el;
							}}
              file={file.file}
							image={file.image}
							title={file.title}
							delay={index * 50}
							isVisible={isHovered}
							index={index}
							totalCount={previewFiles.length}
							onClick={file.onClick}
						/>
					))}
				</div>
				<div
					className="absolute w-32 h-24 rounded-lg shadow-lg border border-white/20 flex items-center justify-center"
					style={{
						background: frontBg,
						top: "calc(50% - 48px + 4px)",
						transformOrigin: "bottom center",
						transform: isHovered
							? "rotateX(35deg) translateY(12px)"
							: "rotateX(0deg) translateY(0)",
						transition: "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
						zIndex: 30,
					}}
				>
          {icon && <LucideIcon className="size-1/2" style={{
            color: iconColor,
          }} name={icon} size={24} />}
        </div>
				<div
					className="absolute w-32 h-24 rounded-lg overflow-hidden pointer-events-none"
					style={{
						top: "calc(50% - 48px + 4px)",
						background:
							"linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 60%)",
						transformOrigin: "bottom center",
						transform: isHovered
							? "rotateX(35deg) translateY(12px)"
							: "rotateX(0deg) translateY(0)",
						transition: "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
						zIndex: 31,
					}}
				/>
			</div>
			<div className="text-center">
				<h3
					className="text-base font-semibold text-foreground mt-4 transition-all duration-500 line-clamp-1"
					style={{
						transform: isHovered ? "translateY(2px)" : "translateY(0)",
						letterSpacing: isHovered ? "-0.01em" : "0",
					}}
				>
					{title}
				</h3>
				<p
					className="text-xs font-medium text-muted-foreground transition-all duration-500"
					style={{ opacity: isHovered ? 0.8 : 1 }}
				>
					{files.length} {files.length === 1 ? "note" : "notes"}
				</p>
			</div>
		</div>
	);
};

export type Folder = {
	title: string;
  icon: string | null;
	gradient: string;
	files: File[];
	onClick?: MouseEventHandler<HTMLDivElement>;
};

type Props = {
  colorizeFiles: boolean;
	folders: Folder[];
};

function ProjectFolders({ folders, colorizeFiles }: Props) {
	return (
		<section className="max-w-7xl mx-auto px-6 pt-16 pb-32">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 justify-items-center">
				{folders.map((folder, index) => (
					<div
						key={folder.title}
						className="w-full animate-in fade-in slide-in-from-bottom-8 duration-700"
						style={{ animationDelay: `${200 + index * 100}ms` }}
					>
						<AnimatedFolder
              colorizeFiles={colorizeFiles}
							onClick={folder.onClick}
							title={folder.title}
              icon={folder.icon}
							files={folder.files}
							gradient={folder.gradient}
							className="w-full"
						/>
					</div>
				))}
			</div>
		</section>
	);
}

export default ProjectFolders;
