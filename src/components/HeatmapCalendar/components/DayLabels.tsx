import { cva } from "class-variance-authority";
import { addDays, FORMATS, format, startOfWeek } from "@/lib/date";

const containerVariants = cva("", {
	variants: {
		layout: {
			horizontal: "flex flex-col justify-between mr-2",
			vertical: "flex gap-1 items-center ml-2",
		},
		showMonthLabels: {
			true: "",
			false: "",
		},
	},
	compoundVariants: [
		{
			layout: "horizontal",
			showMonthLabels: true,
			class: "mt-5.5",
		},
	],
	defaultVariants: {
		layout: "horizontal",
		showMonthLabels: true,
	},
});

const dayVariants = cva("text-xs text-muted-foreground", {
	variants: {
		layout: {
			horizontal: "h-3 w-full",
			vertical: "w-3 h-auto leading-normal text-center",
		},
	},
	defaultVariants: {
		layout: "horizontal",
	},
});

type Props = {
	layout?: "horizontal" | "vertical";
	showMonthLabels?: boolean;
};

export const DayLabels = ({
	layout = "horizontal",
	showMonthLabels = true,
}: Props) => {
	const firstDayOfWeek = startOfWeek(new Date());
	const dayLabels = Array.from({ length: 7 }, (_, i) =>
		format(addDays(firstDayOfWeek, i), FORMATS.DAY_OF_WEEK_SHORT),
	);

	return (
		<div
			className={containerVariants({
				layout,
				showMonthLabels,
			})}
		>
			{dayLabels.map((day) => (
				<span
					key={`daylabel-${day}`}
					className={dayVariants({ layout })}
				>
					{layout === "horizontal" ? day : day.charAt(0)}
				</span>
			))}
		</div>
	);
};
