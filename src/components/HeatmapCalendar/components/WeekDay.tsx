import { type MouseEventHandler, memo } from "react";

import { FORMATS, format } from "@/lib/date";
import type { EntryClickEventHandler } from "@/types";

import type { CellShape } from "../config";
import type { Occurrence } from "../index";
import Cell from "./Cell";

type Props = {
  day: Date;
  occurrenceMap: Map<string, Occurrence>;
  classNames: string[];
  contents?: string[];
  minValue: number;
  maxValue: number;
  overflowColor?: string;
  onEntryClick?: EntryClickEventHandler;
  rangeStartDate?: Date;
  rangeEndDate?: Date;
  shape?: CellShape;
};

const PureWeekDay = ({
  day,
  occurrenceMap,
  classNames,
  contents,
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
    return <div className="size-3" />;
  }

  const dateKey = format(day, FORMATS.DATE_ISO);
  const occurrence = occurrenceMap.get(dateKey);
  const value = occurrence?.count ?? undefined;

  const handleClick: MouseEventHandler | undefined =
    occurrence && onEntryClick ?
      (evt) => onEntryClick?.(occurrence.file.path, evt) :
      undefined;

  return (
    <Cell
      colors={classNames}
      contents={contents}
      day={day}
      maxValue={maxValue}
      minValue={minValue}
      onClick={handleClick}
      overflowColor={overflowColor}
      shape={shape}
      value={value}
    />
  );
};

export const WeekDay = memo(PureWeekDay, (prevProps, nextProps) => {
  return (
    prevProps.day.getTime() === nextProps.day.getTime() &&
    prevProps.occurrenceMap.size === nextProps.occurrenceMap.size &&
    prevProps.classNames.join(",") === nextProps.classNames.join(",") &&
    prevProps.contents === nextProps.contents &&
    prevProps.minValue === nextProps.minValue &&
    prevProps.maxValue === nextProps.maxValue &&
    prevProps.overflowColor === nextProps.overflowColor &&
    prevProps.rangeStartDate?.getTime() === nextProps.rangeStartDate?.getTime() &&
    prevProps.rangeEndDate?.getTime() === nextProps.rangeEndDate?.getTime() &&
    prevProps.shape === nextProps.shape
  );
});
