import {
  addMonths,
  differenceInWeeks,
  format,
  startOfMonth,
  startOfWeek,
} from "date-fns";

type Props = {
  startDate: Date;
  weeks: number;
};

export const MonthLabels = ({ startDate, weeks }: Props) => {
  const firstWeekStart = startOfWeek(startDate, { weekStartsOn: 0 });
  const months = [];

  for (let i = 0; i < 12; i++) {
    const monthStart = startOfMonth(addMonths(startDate, i));
    // Calculate which week column this month starts in
    const weekIndex = differenceInWeeks(monthStart, firstWeekStart);

    // Only show if it's within our weeks range
    if (weekIndex >= 0 && weekIndex < weeks) {
      // Position: each week column is 12px (w-3) + 4px gap = 16px
      const leftPosition = weekIndex * 16;
      months.push(
        <span
          key={`monthlabel-${i}`}
          className="text-xs text-gray-500 absolute"
          style={{ left: `${leftPosition}px` }}
        >
          {format(monthStart, "MMM")}
        </span>,
      );
    }
  }

  return <div className="relative h-5 mb-2">{months}</div>;
};
