import type { BasesEntry } from "obsidian";
import { memo } from "react";

import { useEntryImage } from "@/hooks/use-image";
import { useEntryTitle } from "@/hooks/use-title";
import { cn } from "@/lib/utils";

import type { CardConfig } from "./types";

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
					<div className="h-full w-full" />
				)}
			</div>
		);
	}

	if (layout === "horizontal") {
		return (
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
						<div className="h-full w-full" />
					)}
				</div>
			</div>
		);
	}

	const isPolaroid = layout === "polaroid";

	return (
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
				<div className="h-full w-full" />
			)}
		</div>
	);
});

Image.displayName = "Image";

export default Image;
