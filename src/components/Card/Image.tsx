
import { cn } from "@/lib/utils";

import type { CardItem } from "./types";

type Props = {
	layout: "horizontal" | "vertical";
	imageAspectRatio: number;
	item: CardItem;
	imageFit: "cover" | "contain";
  cardSize: number;
};

const Image = ({
	layout,
	imageAspectRatio,
	item,
	imageFit,
  cardSize,
}: Props) => {
	if (layout === "horizontal") {
		// En horizontal, usamos position absolute para que la imagen no afecte la altura
		// El contenido define la altura, la imagen se adapta
		return (
			<div
				className="relative shrink-0 bg-(--bases-cards-cover-background)"
				style={{
					// aspect ratio 2.5 = 100% del ancho, 0.25 = 10%
					width: `${(imageAspectRatio / 2.5) * 100}%`,
				}}
			>
				<div className="absolute inset-0">
					{item.image ? (
						<img
							src={item.image}
							alt={item.title}
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
			{item.image ? (
				<img
					src={item.image}
					alt={item.title}
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
