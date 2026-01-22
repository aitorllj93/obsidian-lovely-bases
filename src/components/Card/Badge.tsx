import type { BasesEntry, BasesViewConfig } from "obsidian";
import { memo, useMemo } from "react";

import LucideIcon from "@/components/Obsidian/LucideIcon";
import { useEntryProperty } from "@/hooks/use-property";
import { contrastColor, darken, isHexColor, lighten, luminance } from "@/lib/colors";

import type { CardConfig } from "./types";

type Props = {
	entry: BasesEntry;
	cardConfig: CardConfig;
	config: BasesViewConfig;
};

const getBadgeStyles = (color: string | undefined): React.CSSProperties => {
	if (!color || !isHexColor(color)) {
		return {
			backgroundColor: "rgba(0, 0, 0, 0.3)",
			color: "var(--color-white)",
			borderColor: "transparent",
		};
	}

	const l = luminance(color);
	const borderColor = l > 0.5 ? darken(color, 0.2) : lighten(color, 0.2);

	return {
		backgroundColor: color,
		color: contrastColor(color),
		borderColor: borderColor,
	};
};

const Badge = memo(
	({ entry, cardConfig, config }: Props) => {
		const { badgeProperty, badgeIcon, badgeColor } = cardConfig;

		const property = useEntryProperty(entry, config, badgeProperty);

		const badgeValue = useMemo(() => {
			if (!property || property.isEmpty) return null;
			return property.value.toString();
		}, [property]);

		if (!badgeValue) return null;

		const badgeStyles = getBadgeStyles(badgeColor);

		return (
			<div
				className="absolute top-2 right-2 z-10 flex items-center gap-1 px-2 py-0.5 rounded-full text-sm font-medium shadow-md backdrop-blur-sm border"
				style={badgeStyles}
			>
				{badgeIcon && (
					<LucideIcon name={badgeIcon} className="shrink-0 size-3" />
				)}
				<span className="truncate max-w-[120px]">{badgeValue}</span>
			</div>
		);
	},
	(prevProps, nextProps) => {
		return (
			prevProps.entry === nextProps.entry &&
			prevProps.cardConfig.badgeProperty === nextProps.cardConfig.badgeProperty &&
			prevProps.cardConfig.badgeIcon === nextProps.cardConfig.badgeIcon &&
			prevProps.cardConfig.badgeColor === nextProps.cardConfig.badgeColor
		);
	},
);

Badge.displayName = "Badge";

export default Badge;
