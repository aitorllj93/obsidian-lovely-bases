import { type MouseEventHandler, useRef, useState } from "react";

import LucideIcon from "@/components/Obsidian/LucideIcon";
import { desaturate, gradientColors, saturate } from "@/lib/colors";
import { cn } from "@/lib/utils";

import FileCard from "./FileCard";
import type { File } from "./types";

type Props = {
	colorizeFiles: boolean;
	title: string;
	icon: string | null;
	files: File[];
	className?: string;
	gradient?: string;
	onClick?: MouseEventHandler<HTMLDivElement>;
};

const AnimatedFolder: React.FC<Props> = ({
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

	// Reset cardRefs array when files change to prevent memory leaks
	if (cardRefs.current.length !== previewFiles.length) {
		cardRefs.current = new Array(previewFiles.length).fill(null);
	}

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
					{icon && (
						<LucideIcon
							className="size-1/2"
							style={{
								color: iconColor,
							}}
							name={icon}
						/>
					)}
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

export default AnimatedFolder;
