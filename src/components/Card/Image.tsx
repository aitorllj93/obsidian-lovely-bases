
import type { BasesPropertyId } from "obsidian";

import { useConfigValue } from "@/hooks/use-config-value";
import { useEntryImage } from "@/hooks/use-image";
import { useEntryTitle } from "@/hooks/use-title";
import { cn } from "@/lib/utils";

type Props = {
	entryId: string;
};

const Image = ({ entryId }: Props) => {
	const imageProperty = useConfigValue<BasesPropertyId | undefined>(
		"imageProperty",
	);
	const cardSize = useConfigValue<number>("cardSize", 400);
	const layout = useConfigValue<"horizontal" | "vertical">(
		"layout",
		"vertical",
	);
	const imageAspectRatio = useConfigValue<number>("imageAspectRatio", 1.5);
	const imageFit = useConfigValue<"cover" | "contain">("imageFit", "cover");

	const image = useEntryImage(entryId, imageProperty);
	const title = useEntryTitle(entryId);

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
};

export default Image;
