import {
  addMonths,
  differenceInWeeks,
  FORMATS,
  format,
  startOfMonth,
  startOfWeek,
} from "@/lib/date";

type Props = {
	startDate: Date;
	weeks: number;
	endDate?: Date;
	layout?: "horizontal" | "vertical";
};

export const MonthLabels = ({ startDate, weeks, endDate, layout = "horizontal" }: Props) => {
	const firstWeekStart = startOfWeek(startDate);

	const calculatedEndDate = endDate || addMonths(startDate, Math.ceil(weeks / 4.33) + 1);

	if (layout === "vertical") {
		const slots: (string | null)[] = Array(weeks).fill(null);

		let currentMonth = startOfMonth(startDate);

		while (currentMonth <= calculatedEndDate) {
			const monthStart = currentMonth;
			const monthLabel = format(monthStart, FORMATS.MONTH_SHORT);

			const weekStartOfMonth = startOfWeek(monthStart);

			let weekIndex = differenceInWeeks(weekStartOfMonth, firstWeekStart);

			if (weekIndex < 0) {
				weekIndex = 0;
			}

			if (weekIndex >= 0 && weekIndex < weeks) {
				slots[weekIndex] = monthLabel;
			}

			currentMonth = addMonths(currentMonth, 1);
		}

		return (
			<div className="flex flex-col gap-1 w-5 mr-2">
				{slots.map((label, index) => (
					<div
						key={`month-slot-${index.toString()}`}
						className="h-3 text-xs text-muted-foreground flex items-center"
					>
						{label || ""}
					</div>
				))}
			</div>
		);
	}

	const months = [];
	let currentMonth = startOfMonth(startDate);
	let monthIndex = 0;

	while (currentMonth <= calculatedEndDate) {
		const monthStart = currentMonth;
		const weekIndex = differenceInWeeks(monthStart, firstWeekStart);

		if (weekIndex >= 0 && weekIndex < weeks) {
			const leftPosition = weekIndex * 16;
			months.push(
				<span
					key={`monthlabel-${monthIndex}`}
					className="text-xs text-muted-foreground absolute"
					style={{ left: `${leftPosition}px` }}
				>
					{format(monthStart, FORMATS.MONTH_SHORT)}
				</span>,
			);
		}

		currentMonth = addMonths(currentMonth, 1);
		monthIndex++;
	}

	return <div className="relative h-5 mb-2">{months}</div>;
};
