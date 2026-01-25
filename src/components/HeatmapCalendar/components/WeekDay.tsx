
import { cva } from "class-variance-authority";
import { memo } from "react";

import { FORMATS, format } from "@/lib/date";
import { cn } from "@/lib/utils";
import type { EntryClickEventHandler } from "@/types";

import type { Occurrence } from "../index";
import { getCellStyle } from "../utils";

const classVariants = cva(
	"w-3 h-3",
	{
		variants: {
			shape: {
				circle: "rounded-full",
        rounded: 'rounded-[4px]',
        square: ''
			},
		},
	},
);

type Props = {
  day: Date;
  occurrenceMap: Map<string, Occurrence>;
  classNames: string[];
  minValue: number;
  maxValue: number;
  overflowColor?: string;
  onEntryClick?: EntryClickEventHandler;
  rangeStartDate?: Date;
  rangeEndDate?: Date;
  shape?: "circle" | "square" | "rounded";
};

const PureWeekDay = ({
  day,
  occurrenceMap,
  classNames,
  minValue,
  maxValue,
  overflowColor,
  onEntryClick,
  rangeStartDate,
  rangeEndDate,
  shape = "rounded",
}: Props) => {
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
        classVariants({ shape }),
        cellStyle.className,
        cellStyle.isOverflow && overflowColor && "ring-1 ring-destructive",
        occurrence && onEntryClick && "cursor-pointer",
      )}
      style={cellStyle.style}
      title={`${format(day, FORMATS.DATE_LONG)}: ${count}${cellStyle.isOverflow ? " (overflow)" : ""}`}
      onClick={(evt) => occurrence && onEntryClick?.(occurrence.file.path, evt)}
    />
  );
};

export const WeekDay = memo(PureWeekDay, (prevProps, nextProps) => {
  return (
    prevProps.day.getTime() === nextProps.day.getTime() &&
    prevProps.occurrenceMap.size === nextProps.occurrenceMap.size &&
    prevProps.classNames.join(",") === nextProps.classNames.join(",") &&
    prevProps.minValue === nextProps.minValue &&
    prevProps.maxValue === nextProps.maxValue &&
    prevProps.overflowColor === nextProps.overflowColor &&
    prevProps.rangeStartDate?.getTime() === nextProps.rangeStartDate?.getTime() &&
    prevProps.rangeEndDate?.getTime() === nextProps.rangeEndDate?.getTime() &&
    prevProps.shape === nextProps.shape
  );
});
