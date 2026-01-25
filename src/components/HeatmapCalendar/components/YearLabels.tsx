import {
	addDays,
	differenceInWeeks,
	startOfWeek,
	startOfYear,
} from "@/lib/date";

type Props = {
	startDate: Date;
	endDate: Date;
	layout?: "horizontal" | "vertical";
	weeks: number;
};

export const YearLabels = ({
	startDate,
	endDate,
	layout = "horizontal",
	weeks,
}: Props) => {
	const firstWeekStart = startOfWeek(startDate);
	const startYear = startDate.getFullYear();
	const endYear = endDate.getFullYear();

	if (layout === "vertical") {
		const slots: (string | null)[] = Array(weeks).fill(null);

		let currentWeekStart = firstWeekStart;
		let lastYearLabel = "";

		// Iterate through weeks to find where each year starts
		for (let weekIndex = 0; weekIndex < weeks; weekIndex++) {
			const yearOfWeek = currentWeekStart.getFullYear();
			const yearLabel = yearOfWeek.toString();

			// Mark the first week of each year
			if (yearLabel !== lastYearLabel) {
				slots[weekIndex] = yearLabel;
				lastYearLabel = yearLabel;
			}

			currentWeekStart = addDays(currentWeekStart, 7);
		}

		return (
			<div className="flex flex-col gap-1 w-10 mr-2">
				{slots.map((label) => (
					<div
						key={`year-slot-${label}`}
						className="h-3 text-xs text-muted-foreground font-semibold flex items-center"
					>
						{label || ""}
					</div>
				))}
			</div>
		);
	}

	const years = [];
	for (let year = startYear; year <= endYear; year++) {
		const yearStart = startOfYear(new Date(year, 0, 1));
		const weekIndex = differenceInWeeks(yearStart, firstWeekStart);
		const leftPosition = Math.max(0, weekIndex * 16);

		years.push(
			<span
				key={`yearlabel-${year}`}
				className="text-xs text-muted-foreground absolute font-semibold"
				style={{ left: `${leftPosition}px` }}
			>
				{year.toString()}
			</span>,
		);
	}

	return <div className="relative h-5 mb-2">{years}</div>;
};
