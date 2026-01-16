import { isHexColor } from "@/lib/colors";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Props = {
	classNames: string[];
	overflowColor?: string;
};

export const Legend = ({ classNames, overflowColor }: Props) => {
	const { t } = useTranslation("heatmapCalendar");
	const isBinary = classNames.length === 2;
	const lessText = isBinary ? t("legend.no") : t("legend.less");
	const moreText = isBinary ? t("legend.yes") : t("legend.more");

	return (
		<div className="mt-4 justify-center flex gap-2 text-muted-foreground text-xs items-center">
			<span>{lessText}</span>
			{classNames.map((className, index) => {
				const isHex = isHexColor(className);
				return (
					<div
						key={`color-${index.toString()}`}
						className={cn("w-3 h-3 rounded-[4px]", !isHex && className)}
						style={isHex ? { backgroundColor: className } : undefined}
					/>
				);
			})}
			<span>{moreText}</span>
			{overflowColor && (
				<>
					<span className="ml-2">|</span>
					<div
						className="w-3 h-3 rounded-[4px] ring-1 ring-destructive"
						style={{ backgroundColor: overflowColor }}
					/>
					<span>{t("legend.overflow")}</span>
				</>
			)}
		</div>
	);
};
