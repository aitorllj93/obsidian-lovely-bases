import { memo, useMemo } from "react";

import {
	addDays,
	addMonths,
	eachDayOfInterval,
	endOfMonth,
	endOfWeek,
	FORMATS,
	format,
	startOfMonth,
	startOfWeek,
} from "@/lib/date";
import { cn } from "@/lib/utils";
import type { EntryClickEventHandler } from "@/types";

import type { Occurrence } from "../index";
import { getCellStyle } from "../utils";

const MAX_MONTHS = 120;

type Props = {
	occurrences: Occurrence[];
	startDate: Date;
	endDate: Date;
	classNames: string[];
	minValue?: number;
	maxValue?: number;
	overflowColor?: string;
	showDayLabels?: boolean;
	layout?: "horizontal" | "vertical";
	onEntryClick?: EntryClickEventHandler;
	rangeStartDate?: Date;
	rangeEndDate?: Date;
};

type MonthData = {
	monthStart: Date;
	weeks: Date[][];
};

type DayHeader = {
	short: string;
	full: string;
};

type DayCellProps = {
	day: Date;
	isCurrentMonth: boolean;
	occurrenceMap: Map<string, Occurrence>;
	classNames: string[];
	minValue: number;
	maxValue: number;
	overflowColor?: string;
	onEntryClick?: EntryClickEventHandler;
	rangeStartDate?: Date;
	rangeEndDate?: Date;
};

const DayCell = memo(
	({
		day,
		isCurrentMonth,
		occurrenceMap,
		classNames,
		minValue,
		maxValue,
		overflowColor,
		onEntryClick,
		rangeStartDate,
		rangeEndDate,
	}: DayCellProps) => {
		const isOutsideRange =
			(rangeStartDate && day < rangeStartDate) ||
			(rangeEndDate && day > rangeEndDate);

		if (isOutsideRange) {
			return <div className="w-3 h-3" />;
		}

		const dateKey = format(day, FORMATS.DATE_ISO);
		const occurrence = occurrenceMap.get(dateKey);
		const count = occurrence?.count ?? 0;
		const cellStyle = occurrence
			? getCellStyle(count, classNames, minValue, maxValue, overflowColor)
			: { className: classNames[0], isOverflow: false };

		return (
			<div
				className={cn(
					"w-3 h-3 rounded-[4px]",
					cellStyle.className,
					cellStyle.isOverflow && overflowColor && "ring-1 ring-destructive",
					!isCurrentMonth && "opacity-30",
					occurrence && onEntryClick && "cursor-pointer",
				)}
				style={cellStyle.style}
				title={`${format(day, FORMATS.DATE_LONG)}: ${count}${cellStyle.isOverflow ? " (overflow)" : ""}`}
				onClick={(evt) => occurrence && onEntryClick?.(occurrence.file.path, evt)}
			/>
		);
	},
	(prevProps, nextProps) => {
		const prevDateKey = format(prevProps.day, FORMATS.DATE_ISO);
		const nextDateKey = format(nextProps.day, FORMATS.DATE_ISO);
		const prevOccurrence = prevProps.occurrenceMap.get(prevDateKey);
		const nextOccurrence = nextProps.occurrenceMap.get(nextDateKey);

		return (
			prevDateKey === nextDateKey &&
			prevProps.isCurrentMonth === nextProps.isCurrentMonth &&
			prevOccurrence?.count === nextOccurrence?.count &&
			prevOccurrence?.file.path === nextOccurrence?.file.path &&
			prevProps.classNames === nextProps.classNames &&
			prevProps.minValue === nextProps.minValue &&
			prevProps.maxValue === nextProps.maxValue &&
			prevProps.overflowColor === nextProps.overflowColor &&
			prevProps.rangeStartDate?.getTime() === nextProps.rangeStartDate?.getTime() &&
			prevProps.rangeEndDate?.getTime() === nextProps.rangeEndDate?.getTime()
		);
	},
);

DayCell.displayName = "DayCell";

type MonthBlockProps = {
	monthStart: Date;
	weeks: Date[][];
	dayHeaders: DayHeader[];
	occurrenceMap: Map<string, Occurrence>;
	classNames: string[];
	minValue: number;
	maxValue: number;
	overflowColor?: string;
	showDayLabels: boolean;
	onEntryClick?: EntryClickEventHandler;
	rangeStartDate?: Date;
	rangeEndDate?: Date;
};

const MonthBlock = memo(
	({
		monthStart,
		weeks,
		dayHeaders,
		occurrenceMap,
		classNames,
		minValue,
		maxValue,
		overflowColor,
		showDayLabels,
		onEntryClick,
		rangeStartDate,
		rangeEndDate,
	}: MonthBlockProps) => {
		const currentMonth = monthStart.getMonth();

		return (
			<div>
				<div className="text-sm font-semibold mb-2 text-foreground">
					{format(monthStart, FORMATS.MONTH_LONG)} {monthStart.getFullYear()}
				</div>
				{showDayLabels && (
					<div className="flex gap-1 mb-1">
						{dayHeaders.map((header) => (
							<div
								key={header.full}
								className="w-3 text-xs text-muted-foreground text-center font-medium"
								title={header.full}
							>
								{header.short}
							</div>
						))}
					</div>
				)}
				<div className="flex flex-col gap-1">
					{weeks.map((week) => (
						<div key={week[0].getTime()} className="flex gap-1">
							{week.map((day) => (
								<DayCell
									key={day.getTime()}
									day={day}
									isCurrentMonth={day.getMonth() === currentMonth}
									occurrenceMap={occurrenceMap}
									classNames={classNames}
									minValue={minValue}
									maxValue={maxValue}
									overflowColor={overflowColor}
									onEntryClick={onEntryClick}
									rangeStartDate={rangeStartDate}
									rangeEndDate={rangeEndDate}
								/>
							))}
						</div>
					))}
				</div>
			</div>
		);
	},
);

MonthBlock.displayName = "MonthBlock";

const MonthGridViewComponent = ({
	occurrences,
	startDate,
	endDate,
	classNames,
	minValue = 0,
	maxValue = 10,
	overflowColor,
	showDayLabels = true,
	layout = "vertical",
	onEntryClick,
	rangeStartDate,
	rangeEndDate,
}: Props) => {
	const occurrenceMap = useMemo(() => {
		const map = new Map<string, Occurrence>();
		for (const occ of occurrences) {
			if (occ.date) {
				map.set(occ.date, occ);
			}
		}
		return map;
	}, [occurrences]);

	const dayHeaders = useMemo(() => {
		const firstDayOfWeek = startOfWeek(new Date());
		return Array.from({ length: 7 }, (_, i) => {
			const day = addDays(firstDayOfWeek, i);
			return {
				short: format(day, FORMATS.DAY_OF_WEEK_SHORT).charAt(0),
				full: format(day, FORMATS.DAY_OF_WEEK_SHORT),
			};
		});
	}, []);

	const monthsData = useMemo(() => {
		const result: MonthData[] = [];
		const effectiveStartDate = rangeStartDate ?? startDate;
		const effectiveEndDate = rangeEndDate ?? endDate;
		let currentMonthStart = startOfMonth(effectiveStartDate);

		while (currentMonthStart <= effectiveEndDate && result.length < MAX_MONTHS) {
			const monthEnd = endOfMonth(currentMonthStart);
			const firstDayOfGrid = startOfWeek(currentMonthStart);
			const lastDayOfGrid = endOfWeek(monthEnd);

			const allDays = eachDayOfInterval({
				start: firstDayOfGrid,
				end: lastDayOfGrid,
			});

			const weeks: Date[][] = [];
			for (let i = 0; i < allDays.length; i += 7) {
				weeks.push(allDays.slice(i, i + 7));
			}

			result.push({ monthStart: currentMonthStart, weeks });
			currentMonthStart = addMonths(currentMonthStart, 1);
		}

		return result;
	}, [startDate, endDate, rangeStartDate, rangeEndDate]);

	const isHorizontal = layout === "horizontal";
	const gridCols = isHorizontal ? "grid-cols-4" : "grid-cols-3";
	const containerClass = cn("grid gap-3", gridCols);

	return (
		<div className={containerClass}>
			{monthsData.map(({ monthStart, weeks }) => (
				<MonthBlock
					key={monthStart.getTime()}
					monthStart={monthStart}
					weeks={weeks}
					dayHeaders={dayHeaders}
					occurrenceMap={occurrenceMap}
					classNames={classNames}
					minValue={minValue}
					maxValue={maxValue}
					overflowColor={overflowColor}
					showDayLabels={showDayLabels}
					onEntryClick={onEntryClick}
					rangeStartDate={rangeStartDate}
					rangeEndDate={rangeEndDate}
				/>
			))}
		</div>
	);
};

export const MonthGridView = memo(MonthGridViewComponent);

MonthGridView.displayName = "MonthGridView";
