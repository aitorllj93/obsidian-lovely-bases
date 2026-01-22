import type { BasesEntry } from "obsidian";
import { memo } from "react";

import LucideIcon from "@/components/Obsidian/LucideIcon";
import { useEntryImage } from "@/hooks/use-image";
import { useEntryTitle } from "@/hooks/use-title";
import { cn } from "@/lib/utils";

import type { CardConfig } from "./types";

const ICON_BY_EXTENSION = {
  'md': 'text-align-start',
  'pdf': 'file-text',
  'epub': 'book',
  'base': 'database',
  'canvas': 'layout-dashboard',
  'unknown': 'file-question-mark',
} as const;

type NonImageFallbackProps = {
  entry: BasesEntry;
};

const NonImageFallback = ({ entry }: NonImageFallbackProps) => {

  const icon = ICON_BY_EXTENSION[entry.file.extension as keyof typeof ICON_BY_EXTENSION] || ICON_BY_EXTENSION.unknown;

	return <div className="h-full w-full flex items-center justify-center">
    <LucideIcon className="w-[80%] aspect-square block text-muted" name={icon} />
  </div>;
};

type Props = {
	entry: BasesEntry;
	cardConfig: CardConfig;
	isOverlayMode?: boolean;
};

const Image = memo(({ entry, cardConfig, isOverlayMode }: Props) => {
	const { imageProperty, cardSize, layout, imageAspectRatio, imageFit } = cardConfig;

	const image = useEntryImage(entry, imageProperty);
	const title = useEntryTitle(entry);

	if (isOverlayMode) {
		return (
			<div className="absolute inset-0 bg-(--bases-cards-cover-background)">
				{image ? (
					<img
						src={image}
						alt={title}
						draggable={false}
						loading="lazy"
						className={cn(
							"pointer-events-none h-full w-full",
							imageFit === "cover" ? "object-cover" : "object-contain",
						)}
					/>
				) : (
					<NonImageFallback entry={entry} />
				)}
			</div>
		);
	}

	if (layout === "horizontal") {
		return imageProperty ? (
			<div
				className="relative shrink-0 bg-(--bases-cards-cover-background)"
				style={{
					// aspect ratio 2.5 = 100% del ancho, 0.25 = 10%
					width: `${(imageAspectRatio / 2.5) * 100}%`,
				}}
			>
				<div className="absolute inset-0">
					{image ? (
						<img
							src={image}
							alt={title}
							draggable={false}
							loading="lazy"
							className={cn(
								"pointer-events-none h-full w-full",
								imageFit === "cover" ? "object-cover" : "object-contain",
							)}
						/>
					) : (
						<NonImageFallback entry={entry} />
					)}
				</div>
			</div>
		) : null;
	}

	const isPolaroid = layout === "polaroid";

	return imageProperty ? (
		<div
			className="mx-auto relative w-full flex-none bg-(--bases-cards-cover-background)"
			style={{
				aspectRatio: 1 / imageAspectRatio,
				...(!isPolaroid && { height: cardSize * imageAspectRatio }),
			}}
		>
			{image ? (
				<img
					src={image}
					alt={title}
					draggable={false}
					loading="lazy"
					className={cn(
						"pointer-events-none h-full w-full",
						imageFit === "cover" ? "object-cover" : "object-contain",
					)}
					style={{
						aspectRatio: 1 / imageAspectRatio,
						...(!isPolaroid && { height: cardSize * imageAspectRatio }),
					}}
				/>
			) : (
				<NonImageFallback entry={entry} />
			)}
		</div>
	) : null;
});

Image.displayName = "Image";

export default Image;
