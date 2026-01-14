import type { TFile } from "obsidian";
import { forwardRef, type MouseEventHandler } from "react";

import Markdown from "@/components/Obsidian/Markdown";
import { cn } from "@/lib/utils";

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
				className={cn(
					"absolute w-20 h-28 cursor-pointer group/card hover:z-90",
				)}
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
							loading="lazy"
						/>
					) : (
						<div
							className={cn(
								"w-full h-full text-[8px] px-[3px]",
								backgroundColor ? "text-white" : "text-foreground",
							)}
						>
							<Markdown maxLength={100} file={file} />
						</div>
					)}
					<div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
					<p
						className={cn(
							"absolute bottom-0 m-0 px-[3px] text-xs truncate drop-shadow-md shadow-white backdrop-blur-md",
							backgroundColor ? "text-white" : "text-foreground",
						)}
					>
						{title}
					</p>
				</div>
			</div>
		);
	},
);
FileCard.displayName = "FileCard";

export default FileCard;
