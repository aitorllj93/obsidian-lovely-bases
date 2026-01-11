import type { BasesEntry } from "obsidian";
import { memo } from "react";

import { useEntryImage } from "@/hooks/use-image";
import { useEntryTitle } from "@/hooks/use-title";
import { cn } from "@/lib/utils";

import type { CardConfig } from "./types";

type Props = {
	entry: BasesEntry;
	cardConfig: CardConfig;
};

const Image = memo(({ entry, cardConfig }: Props) => {
	const { imageProperty, cardSize, layout, imageAspectRatio, imageFit } = cardConfig;

	const image = useEntryImage(entry, imageProperty);
	const title = useEntryTitle(entry);

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

	// En vertical, aspect-ratio define la altura, flex-none evita que crezca o encoja
	return (
		<div
			className="relative w-full flex-none bg-(--bases-cards-cover-background)"
			style={{
				aspectRatio: 1 / imageAspectRatio,
				height: cardSize * imageAspectRatio,
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
				/>
			) : (
				<div className="h-full w-full" />
			)}
		</div>
	);
});

Image.displayName = "Image";

export default Image;
