import type { BasesEntry } from "obsidian";
import { memo } from "react";

import { useEntryTitle } from "@/hooks/use-title";
import { cn } from "@/lib/utils";

import type { CardConfig } from "./types";

type Props = {
	entry: BasesEntry;
	cardConfig: CardConfig;
	isOverlayMode?: boolean;
};

const Title = memo(({ entry, cardConfig }: Props) => {
	const title = useEntryTitle(entry);
	const { cardSize, titleFont, showTitle } = cardConfig;
	const textSize =
		cardSize < 300 ? "text-base" : cardSize < 400 ? "text-lg" : "text-xl";

	if (!showTitle) return null;

	return (
		<h3
			className={cn(
				"font-semibold mt-2 mb-0 line-clamp-1 p-(--input-padding) shrink-0",
				textSize,
			)}
			style={{
				fontFamily: titleFont,
			}}
		>
			{title}
		</h3>
	);
});

Title.displayName = "Title";

export default Title;
