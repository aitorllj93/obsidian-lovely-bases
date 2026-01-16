import { isHexColor } from "@/lib/colors";
import { cn } from "@/lib/utils";

type Props = {
	classNames: string[];
	overflowColor?: string;
};

export const Legend = ({ classNames, overflowColor }: Props) => {
	return (
		<div className="mt-4 justify-center flex gap-2 text-xs items-center">
			<span>Less</span>
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
			<span>More</span>
			{overflowColor && (
				<>
					<span className="ml-2">|</span>
					<div
						className="w-3 h-3 rounded-[4px] ring-1 ring-destructive"
						style={{ backgroundColor: overflowColor }}
					/>
					<span>Overflow</span>
				</>
			)}
		</div>
	);
};
